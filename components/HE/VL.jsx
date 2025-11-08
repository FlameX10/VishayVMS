import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const CreateMeeting = () => {
  const [formData, setFormData] = useState({
    visitor_email: "",
    scheduled_date: "",
    scheduled_time: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.visitor_email || !formData.scheduled_date || !formData.purpose) {
      setSnackbar({ open: true, message: "Please fill required fields", severity: "warning" });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("authToken"); // assuming you stored token here

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/he/create-meeting`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbar({
        open: true,
        message: response.data.message || "Meeting created successfully!",
        severity: "success",
      });

      // Clear form after success
      setFormData({
        visitor_email: "",
        scheduled_date: "",
        scheduled_time: "",
        purpose: "",
      });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 450,
        margin: "50px auto",
        padding: "30px",
        borderRadius: "16px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Create Meeting
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Visitor Email"
          name="visitor_email"
          type="email"
          value={formData.visitor_email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Scheduled Date"
          name="scheduled_date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.scheduled_date}
          onChange={handleChange}
          required
        />
        <TextField
          label="Scheduled Time"
          name="scheduled_time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formData.scheduled_time}
          onChange={handleChange}
        />
        <TextField
          label="Purpose"
          name="purpose"
          multiline
          minRows={2}
          value={formData.purpose}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ borderRadius: "10px", py: 1.2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Create Meeting"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateMeeting;
