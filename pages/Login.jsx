import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  InputAdornment,
} from "@mui/material";

import MailOutline from "@mui/icons-material/MailOutline";
import LockOutlined from "@mui/icons-material/LockOutlined";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  // 🔹 STEP 1: CHECK USER
  const handleCheckUser = async () => {
    if (!email) {
      return setAlert({ type: "error", message: "Email is required!" });
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/checkUser`,
        { email }
      );

      if (res.data.status === "approved") {
        setStep("password");
        setAlert({ type: "success", message: "User found. Enter password." });
      } else {
        setAlert({ type: "error", message: res.data.message });
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STEP 2: VERIFY PASSWORD + ROLE BASED REDIRECT
  const handleVerifyPassword = async () => {
    if (!password) {
      return setAlert({ type: "error", message: "Password is required!" });
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/verifyPassword`,
        { email, password }
      );

      const { token, user } = res.data;

      // Save auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setAlert({ type: "success", message: "Login successful!" });

      // 🔥 ROLE → ROUTE MAP
      const roleRouteMap = {
        process_admin: "/pad",
        he: "/hed",
        sm: "/smd",
        sg: "/sgd",
      };

      const redirectPath = roleRouteMap[user.role] || "/";
      navigate(redirectPath);

    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
      }}
    >
      <Paper elevation={10} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Box textAlign="center" mb={3}>
          <VpnKeyOutlined sx={{ fontSize: 48 }} />
          <Typography variant="h5" fontWeight="bold">
            Login
          </Typography>
        </Box>

        {alert && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        {step === "email" ? (
          <>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              sx={{ mt: 3 }}
              variant="contained"
              onClick={handleCheckUser}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Continue"}
            </Button>
          </>
        ) : (
          <>
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                background: "#e0f2fe",
                borderRadius: 2,
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <CheckCircleOutline />
              <Typography>{email}</Typography>
            </Box>

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              sx={{ mt: 3 }}
              variant="contained"
              onClick={handleVerifyPassword}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Login"}
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
