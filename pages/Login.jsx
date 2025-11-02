import React, { useState } from "react";
import axios from "axios";
import { 
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment
} from "@mui/material";

// Import Icons for better visual presentation
import MailOutline from '@mui/icons-material/MailOutline';
import LockOutlined from '@mui/icons-material/LockOutlined';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined'; // Main icon
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("email"); // "email" or "password"
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleCheckUser = async () => {
    if (!email) return setAlert({ type: "error", message: "Email is required!" });

    setLoading(true);
    setAlert(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/checkUser`, { email });

      if (res.data.status === "pending") {
        setAlert({ type: "info", message: res.data.message });
      } else if (res.data.status === "approved") {
        setStep("password");
        setAlert({ type: "success", message: "User found, please enter password" });
      } else {
        setAlert({ type: "error", message: res.data.message });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: err.response?.data?.error || "Server error" });
    }
    setLoading(false);
  };

  const handleVerifyPassword = async () => {
    if (!password) return setAlert({ type: "error", message: "Password is required!" });

    setLoading(true);
    setAlert(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/verifyPassword`, { email, password });
      setAlert({ type: "success", message: "Login successful!" });

      console.log("Logged in user:", res.data.user);

      // Store token in localStorage
      localStorage.setItem("authToken", res.data.token);

      // Optionally store user data
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Save user data to localStorage or navigate

      //window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: err.response?.data?.message || "Login failed" });
    }
    setLoading(false);
  };

  return (
    <Container 
        maxWidth="sm" 
        sx={{ 
            // Set up container for centering the form beautifully
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 4,
            backgroundColor: '#f8fafc', // Very light background
            fontFamily: 'Inter, sans-serif'
        }}
    >
      <Paper 
        elevation={10} 
        sx={{ 
          // Card styling for a modern look
          p: { xs: 3, md: 6 }, 
          mt: { xs: 0, md: 0 }, 
          borderRadius: 4, // More rounded corners
          width: '100%',
          maxWidth: 500,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)', // Stronger but softer shadow
          backgroundColor: '#ffffff',
        }}
      >
        <Box textAlign="center" mb={4}>
            {/* Main Icon */}
            <VpnKeyOutlined sx={{ fontSize: 48, color: '#1f2937', mb: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
                Login Page
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Verify your identity to proceed.
            </Typography>
        </Box>

        {alert && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 3, borderRadius: 2 }}
          >
            {alert.message}
          </Alert>
        )}

        {step === "email" ? (
          <Box>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                // Add start adornment (icon) for email field
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline color="action" />
                  </InputAdornment>
                ),
                sx: { 
                    borderRadius: 2, 
                    backgroundColor: '#f9f9f9' // Light gray input background
                }
              }}
              // Ensure the whole input box is rounded
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ 
                mt: 3, 
                py: 1.5, 
                borderRadius: 2, 
                fontWeight: 'bold', 
                fontSize: '1rem',
                // Custom dark color for high contrast CTA, matching the reference's aesthetic
                backgroundColor: '#1f2937', 
                '&:hover': {
                    backgroundColor: '#374151',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }
              }}
              onClick={handleCheckUser}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Submit"}
            </Button>
          </Box>
        ) : (
          <Box>
            {/* Displaying the email clearly in the second step */}
            <Box 
                sx={{ 
                    mb: 3, 
                    p: 2, 
                    borderRadius: 2, 
                    backgroundColor: '#eff6ff', // Light blue background for info
                    border: '1px solid #dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#1e40af'
                }}
            >
                <CheckCircleOutline sx={{ color: '#2563eb' }} />
                <Typography variant="body1" fontWeight="medium">
                    Account Found: <span style={{ fontWeight: 'normal' }}>{email}</span>
                </Typography>
            </Box>
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                // Add start adornment (icon) for password field
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, backgroundColor: '#f9f9f9' }
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ 
                mt: 3, 
                py: 1.5, 
                borderRadius: 2, 
                fontWeight: 'bold',
                fontSize: '1rem',
                backgroundColor: '#1f2937',
                '&:hover': {
                    backgroundColor: '#374151',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }
              }}
              onClick={handleVerifyPassword}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Login Now"}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Login;