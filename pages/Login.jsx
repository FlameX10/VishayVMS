import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChevronDown, ArrowLeft } from 'lucide-react';

const Login = () => {
  // Main view state
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgotPassword'
  
  // Users database (in-memory)
  const [users, setUsers] = useState([]);

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Signup states
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Forgot Password states
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const roles = ['Process Admin', 'Host Employee', 'Security Manager', 'Security Guard'];

  // Email sending functions
  const sendWelcomeEmail = (userData, password) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 SENDING WELCOME EMAIL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`To: ${userData.email}`);
    console.log('Subject: Welcome to Our Platform - Your Account Details');
    console.log('');
    console.log('Hi there,');
    console.log('');
    console.log('Thank you for registering! Your account has been created successfully.');
    console.log('');
    console.log('Here are your login credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${userData.email}`);
    console.log(`🔐 Password: ${password}`);
    console.log(`👤 Role: ${userData.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Please keep this information secure and do not share it with anyone.');
    console.log('You can now log in using these credentials.');
    console.log('');
    console.log('Best regards,');
    console.log('The Team');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  };

  const sendVerificationEmail = (userEmail, code) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 SENDING VERIFICATION EMAIL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`To: ${userEmail}`);
    console.log('Subject: Password Reset Verification Code');
    console.log('');
    console.log('Hi,');
    console.log('');
    console.log('You requested to reset your password.');
    console.log('Please use the verification code below:');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🔐 Verification Code: ${code}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('This code will expire in 10 minutes.');
    console.log('If you did not request this, please ignore this email.');
    console.log('');
    console.log('Best regards,');
    console.log('The Team');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  };

  const sendPasswordResetConfirmation = (userEmail) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 SENDING PASSWORD RESET CONFIRMATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`To: ${userEmail}`);
    console.log('Subject: Password Successfully Reset');
    console.log('');
    console.log('Hi,');
    console.log('');
    console.log('✅ Your password has been successfully reset.');
    console.log('You can now log in with your new password.');
    console.log('');
    console.log('If you did not make this change, please contact support immediately.');
    console.log('');
    console.log('Best regards,');
    console.log('The Team');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  };

  // Password generation
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Login handlers
  const handleSignIn = () => {
    setLoginError('');

    if (!loginRole) {
      setLoginError('Please select a role');
      return;
    }

    const user = users.find(u => u.email === loginEmail && u.password === loginPassword && u.role === loginRole);
    
    if (user) {
      alert(`Welcome back! Signing in as ${loginRole}`);
    } else {
      const userExists = users.find(u => u.email === loginEmail);
      if (userExists) {
        if (userExists.role !== loginRole) {
          setLoginError(`This email is registered as ${userExists.role}, not ${loginRole}`);
        } else {
          setLoginError('Invalid password');
        }
      } else {
        setLoginError('No account found with this email');
      }
    }
  };

  // Signup handlers
  const handleRegister = (userData) => {
    const userExists = users.find(u => u.email === userData.email);
    if (userExists) {
      return { success: false, message: 'An account with this email already exists' };
    }
    
    setUsers([...users, userData]);
    return { success: true };
  };

  const handleSignUp = () => {
    setSignupError('');

    if (!signupEmail) {
      setSignupError('Please enter your email address');
      return;
    }

    if (!signupRole) {
      setSignupError('Please select a role');
      return;
    }

    const password = generatePassword();
    
    const userData = {
      email: signupEmail,
      password: password,
      role: signupRole
    };

    const result = handleRegister(userData);
    
    if (!result.success) {
      setSignupError(result.message);
      return;
    }

    setGeneratedPassword(password);
    sendWelcomeEmail(userData, password);
    setSignupSuccess(true);

    setTimeout(() => {
      setView('login');
      setSignupSuccess(false);
      setSignupEmail('');
      setSignupRole('');
    }, 5000);
  };

  // Forgot Password handlers
  const handlePasswordReset = (email, password) => {
    setUsers(users.map(u => u.email === email ? { ...u, password } : u));
  };

  const handleSendCode = () => {
    setForgotError('');
    
    const userExists = users.find(u => u.email === forgotEmail);
    
    if (!userExists) {
      setForgotError('No account found with this email address');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    sendVerificationEmail(forgotEmail, code);
    setForgotStep(2);
  };

  const handleVerifyCode = () => {
    setForgotError('');
    
    if (verificationCode !== generatedCode) {
      setForgotError('Invalid verification code. Please try again.');
      return;
    }
    
    setForgotStep(3);
  };

  const handleResetPassword = () => {
    setForgotError('');
    
    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setForgotError('Password must be at least 6 characters long');
      return;
    }

    handlePasswordReset(forgotEmail, newPassword);
    sendPasswordResetConfirmation(forgotEmail);
    setForgotStep(4);
  };

  const handleBackToLogin = () => {
    setView('login');
    setForgotStep(1);
    setForgotEmail('');
    setVerificationCode('');
    setGeneratedCode('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError('');
  };

  // Render Forgot Password Success
  if (view === 'forgotPassword' && forgotStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <button
            onClick={handleBackToLogin}
            className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Render Signup Success
  if (view === 'signup' && signupSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully.
          </p>
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Your password has been sent to:</strong>
            </p>
            <p className="text-blue-900 font-semibold">{signupEmail}</p>
            <p className="text-xs text-blue-700 mt-2">
              Check the browser console to see your credentials
            </p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  // Render Login Page
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-500 mb-8">Access your enterprise dashboard</p>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <div>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="user@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-900 font-medium">Password</label>
                <button 
                  type="button" 
                  onClick={() => setView('forgotPassword')}
                  className="text-gray-500 text-sm hover:text-gray-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3">Role</label>
              <div className="relative">
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="" disabled>Select your role</option>
                  {roles.map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Keep me signed in</span>
              </label>
            </div>

            <button
              onClick={handleSignIn}
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-6"
            >
              Sign In
            </button>

            <p className="text-center text-gray-600">
              Need access?{' '}
              <button
                type="button"
                onClick={() => setView('signup')}
                className="text-gray-900 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Signup Page
  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-500 mb-8">Create your enterprise account</p>

          {signupError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {signupError}
            </div>
          )}

          <div>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="user@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-900 font-medium mb-3">Role</label>
              <div className="relative">
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="" disabled>Select your role</option>
                  {roles.map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> A secure password will be automatically generated and sent to your email address.
              </p>
            </div>

            <button
              onClick={handleSignUp}
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-6"
            >
              Sign Up
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setView('login')}
                className="text-gray-900 font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Forgot Password Page
  if (view === 'forgotPassword') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-12">
          <button
            onClick={handleBackToLogin}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-500 mb-8">
            {forgotStep === 1 && "Enter your email to receive a verification code"}
            {forgotStep === 2 && "Enter the verification code sent to your email"}
            {forgotStep === 3 && "Create your new password"}
          </p>

          {forgotError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {forgotError}
            </div>
          )}

          {forgotStep === 1 && (
            <div>
              <div className="mb-6">
                <label className="block text-gray-900 font-medium mb-3">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="user@company.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSendCode}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Verification Code
              </button>
            </div>
          )}

          {forgotStep === 2 && (
            <div>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  A verification code has been sent to <strong>{forgotEmail}</strong>. 
                  Check the browser console to see the code.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-900 font-medium mb-3">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest font-semibold"
                />
              </div>

              <button
                onClick={handleVerifyCode}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4"
              >
                Verify Code
              </button>

              <button
                onClick={handleSendCode}
                className="w-full text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Resend Code
              </button>
            </div>
          )}

          {forgotStep === 3 && (
            <div>
              <div className="mb-6">
                <label className="block text-gray-900 font-medium mb-3">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-900 font-medium mb-3">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Login;