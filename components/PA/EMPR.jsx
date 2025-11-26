import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Stack,
  Chip,
  Divider,
  Paper,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const VisitorsApproval = ({ apiBase = import.meta.env.VITE_BACKEND_API_URL }) => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const token = () => localStorage.getItem("authToken");

  const fetchPending = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiBase}/visitors/pending`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      // support both { data: [...] } and { pendingUsers: [...] } shapes
      const data = res.data?.data ?? res.data?.pendingUsers ?? res.data;
      setVisitors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch pending visitors error:", err);
      setError(err.response?.data?.message || "Failed to fetch pending visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (visitor, idx) => {
    // optimistic UI: mark processing
    const original = [...visitors];
    setVisitors((s) => s.map((v, i) => (i === idx ? { ...v, processing: true } : v)));

    try {
      const payload = {
        name: visitor.name,
        // include any fields your backend expects; here we send name and maybe company_name
        company_name: visitor.company_name,
      };

      await axios.put(`${apiBase}/visitors/${visitor.visitor_id}/approve`, payload, {
        headers: { Authorization: `Bearer ${token()}` },
      });

      setSnack({ open: true, message: "Visitor approved", severity: "success" });
      // remove from pending list
      setVisitors((s) => s.filter((v) => v.visitor_id !== visitor.visitor_id));
    } catch (err) {
      console.error("Approve error:", err);
      setSnack({ open: true, message: "Failed to approve visitor", severity: "error" });
      setVisitors(original);
    }
  };

  const handleReject = async (visitor_id, idx) => {
    const original = [...visitors];
    setVisitors((s) => s.map((v, i) => (i === idx ? { ...v, processing: true } : v)));

    try {
      await axios.put(`${apiBase}/visitors/${visitor_id}/reject`, null, {
        headers: { Authorization: `Bearer ${token()}` },
      });

      setSnack({ open: true, message: "Visitor rejected", severity: "success" });
      setVisitors((s) => s.filter((v) => v.visitor_id !== visitor_id));
    } catch (err) {
      console.error("Reject error:", err);
      setSnack({ open: true, message: "Failed to reject visitor", severity: "error" });
      setVisitors(original);
    }
  };

  const visitorTypeLabel = (t) => {
    // adjust mapping if you use different visitor_type values
    const map = {
      student: "Student",
      guest: "Guest",
      faculty: "Faculty",
      vendor: "Vendor",
    };
    return map[t] ?? t ?? "Unknown";
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" sx={{ backgroundColor: "#f9fafb" }}>
        <CircularProgress size={60} thickness={4} sx={{ color: "#14b8a6" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, backgroundColor: "#f9fafb", minHeight: "60vh" }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9fafb", minHeight: "60vh" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827", mb: 1 }}>
          Pending Visitors
        </Typography>
        <Typography variant="body1" sx={{ color: "#6b7280", fontSize: "0.95rem" }}>
          Review and approve visitor check-ins
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, background: "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)", color: "#fff" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ width: 50, height: 50, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PersonIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h3" fontWeight={700}>
              {visitors.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Pending Requests
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {visitors.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: "center", borderRadius: 2, border: "2px dashed #d1d5db", backgroundColor: "#fff" }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: "#14b8a6", mb: 2 }} />
          <Typography variant="h6" fontWeight={600} color="#111827" gutterBottom>
            All Caught Up!
          </Typography>
          <Typography variant="body2" color="#6b7280">
            No pending visitors at the moment.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {visitors.map((v, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={v.visitor_id}>
              <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #e5e7eb", backgroundColor: "#fff", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 24px -8px rgba(20,184,166,0.25)", borderColor: "#14b8a6" } }}>
                <Box sx={{ height: 4, background: "linear-gradient(90deg, #14b8a6 0%, #0891b2 100%)", borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
                    <Avatar sx={{ bgcolor: "#14b8a6", width: 56, height: 56 }}>
                      <PersonIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={700} sx={{ color: "#111827", mb: 0.5 }}>
                        {v.name || "Visitor"}
                      </Typography>
                      <Chip label={visitorTypeLabel(v.visitor_type)} size="small" sx={{ bgcolor: "#f3f4f6", fontWeight: 600 }} />
                    </Box>
                  </Stack>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, p: 2, backgroundColor: "#f9fafb", borderRadius: 1, border: "1px solid #f3f4f6" }}>
                    <EmailIcon sx={{ color: "#14b8a6", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.875rem", wordBreak: "break-all" }}>
                      {v.email ?? "-"}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={v.name || ""}
                    onChange={(e) => {
                      const copy = [...visitors];
                      copy[idx] = { ...copy[idx], name: e.target.value };
                      setVisitors(copy);
                    }}
                    InputProps={{ startAdornment: <BadgeIcon sx={{ color: "#9ca3af", mr: 1, fontSize: 20 }} /> }}
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Visitor Type</InputLabel>
                    <Select
                      value={v.visitor_type ?? ""}
                      label="Visitor Type"
                      onChange={(e) => {
                        const copy = [...visitors];
                        copy[idx] = { ...copy[idx], visitor_type: e.target.value };
                        setVisitors(copy);
                      }}
                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="guest">Guest</MenuItem>
                      <MenuItem value="faculty">Faculty</MenuItem>
                      <MenuItem value="vendor">Vendor</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Company"
                    variant="outlined"
                    size="small"
                    value={v.company_name ?? ""}
                    onChange={(e) => {
                      const copy = [...visitors];
                      copy[idx] = { ...copy[idx], company_name: e.target.value };
                      setVisitors(copy);
                    }}
                    sx={{ mb: 2 }}
                  />

                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="contained"
                      onClick={() => handleApprove(v, idx)}
                      fullWidth
                      startIcon={<CheckCircleIcon />}
                      disabled={v.processing}
                      sx={{ backgroundColor: "#14b8a6", textTransform: "none", fontWeight: 600 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleReject(v.visitor_id, idx)}
                      fullWidth
                      startIcon={<CancelIcon />}
                      disabled={v.processing}
                      sx={{ borderColor: "#ef4444", color: "#ef4444", textTransform: "none", fontWeight: 600 }}
                    >
                      Reject
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={snack.open} autoHideDuration={3500} onClose={() => setSnack((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <MuiAlert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default VisitorsApproval;
