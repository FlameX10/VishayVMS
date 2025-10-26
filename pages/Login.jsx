import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ChevronDown } from 'lucide-react';

const Login = ({ onSwitchToSignup, onForgotPassword, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');

  const roles = ['Process Admin', 'Host Employee', 'Security Manager', 'Security Guard'];

  const handleSignIn = () => {
    setError('');

    if (!role) {
      setError('Please select a role');
      return;
    }

    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
      alert(`Welcome back! Signing in as ${role}`);
    } else {
      const userExists = users.find(u => u.email === email);
      if (userExists) {
        if (userExists.role !== role) {
          setError(`This email is registered as ${userExists.role}, not ${role}`);
        } else {
          setError('Invalid password');
        }
      } else {
        setError('No account found with this email');
      }
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
      <p className="text-gray-500 mb-8">Access your enterprise dashboard</p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-3">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={onForgotPassword}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-900 font-medium mb-3">Role</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            onClick={onSwitchToSignup}
            className="text-gray-900 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
