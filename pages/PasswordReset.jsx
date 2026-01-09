import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

const steps = ["Enter Email", "Verify OTP", "Reset Password"];

const PasswordReset = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRequestOtp = async () => {
    if (!email) return setAlert({ type: "error", message: "Email is required" });

    setLoading(true);
    setAlert(null);

    try {
      await axios.post(`${API_URL}/request-password-reset`, { email });
      setStep(1);
      setAlert({ type: "success", message: "OTP sent to your email" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setAlert({ type: "error", message: "OTP is required" });

    setLoading(true);
    setAlert(null);

    try {
      await axios.post(`${API_URL}/verify-otp`, { email, otp });
      setStep(2);
      setAlert({ type: "success", message: "OTP verified" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Invalid OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return setAlert({ type: "error", message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return setAlert({ type: "error", message: "Passwords do not match" });
    }

    setLoading(true);
    setAlert(null);

    try {
      await axios.post(`${API_URL}/reset-password`, {
        email,
        newPassword,
      });

      setAlert({ type: "success", message: "Password reset successful" });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Password reset failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Reset Password
        </Typography>

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {alert && <Alert severity={alert.type} sx={{ mb: 2 }}>{alert.message}</Alert>}

        {/* STEP 1 */}
        {step === 0 && (
          <Box>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleRequestOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </Box>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <Box>
            <TextField
              label="OTP"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
          </Box>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <Box>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PasswordReset;
