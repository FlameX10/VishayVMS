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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const EMPR = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingUsers = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/pa/pending/emp/requests`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.pendingUsers || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (user) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_API_URL}/pa/approve-user/${user.user_id}`,
        {
          full_name: user.full_name,
          role: user.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User approved successfully");
      fetchPendingUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (userId) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/pa/reject-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User rejected successfully");
      fetchPendingUsers();
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  const getRoleLabel = (role) => {
    const roles = {
      he: "Host Employee",
      sg: "Security Guard",
      sm: "Security Manager",
    };
    return roles[role] || "Select Role";
  };

  const getRoleColor = (role) => {
    const colors = {
      he: "#14b8a6",
      sg: "#0891b2",
      sm: "#8b5cf6",
    };
    return colors[role] || "#6b7280";
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: "#f9fafb" }}
      >
        <CircularProgress 
          size={60}
          thickness={4}
          sx={{ color: "#14b8a6" }} 
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <Alert 
          severity="error"
          sx={{
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        p: 4, 
        backgroundColor: "#f9fafb", 
        minHeight: "100vh" 
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: "700",
            color: "#111827",
            mb: 1
          }}
        >
          Pending User Approval Requests
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#6b7280",
            fontSize: "0.95rem"
          }}
        >
          Review and approve employee registration requests
        </Typography>
      </Box>

      {/* Stats Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 6px -1px rgba(20, 184, 166, 0.3)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h3" fontWeight="700">
              {users.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Pending Requests
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {users.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "12px",
            border: "2px dashed #d1d5db",
            backgroundColor: "#ffffff",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 64, color: "#14b8a6", mb: 2 }} />
          <Typography variant="h6" fontWeight="600" color="#111827" gutterBottom>
            All Caught Up!
          </Typography>
          <Typography variant="body2" color="#6b7280">
            No pending user requests at the moment.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {users.map((user, index) => (
            <Grid item xs={12} sm={6} lg={4} key={user.user_id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: "12px", 
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "visible",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px -8px rgba(20, 184, 166, 0.25)",
                    borderColor: "#14b8a6",
                  }
                }}
              >
                {/* Top Color Bar */}
                <Box
                  sx={{
                    height: "4px",
                    background: "linear-gradient(90deg, #14b8a6 0%, #0891b2 100%)",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                <CardContent sx={{ p: 3 }}>
                  {/* User Header */}
                  <Stack direction="row" spacing={2} alignItems="flex-start" mb={3}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "#14b8a6",
                        width: 56,
                        height: 56,
                        boxShadow: "0 4px 6px -1px rgba(20, 184, 166, 0.3)",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        fontWeight="700"
                        sx={{ 
                          color: "#111827",
                          mb: 0.5,
                          fontSize: "1.1rem"
                        }}
                      >
                        {user.full_name || "New User"}
                      </Typography>
                      {user.role && (
                        <Chip
                          label={getRoleLabel(user.role)}
                          size="small"
                          sx={{
                            backgroundColor: `${getRoleColor(user.role)}15`,
                            color: getRoleColor(user.role),
                            fontWeight: "600",
                            fontSize: "0.75rem",
                            height: "24px",
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    </Box>
                  </Stack>

                  {/* Email Info */}
                  <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 1.5,
                      mb: 3,
                      p: 2,
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      border: "1px solid #f3f4f6"
                    }}
                  >
                    <EmailIcon sx={{ color: "#14b8a6", fontSize: 20 }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#374151",
                        fontSize: "0.875rem",
                        wordBreak: "break-all"
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Form Fields */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    value={user.full_name || ""}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index].full_name = e.target.value;
                      setUsers(updatedUsers);
                    }}
                    InputProps={{
                      startAdornment: <BadgeIcon sx={{ color: "#9ca3af", mr: 1, fontSize: 20 }} />,
                    }}
                    sx={{ 
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#14b8a6",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#14b8a6",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#ffffff",
                        }
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#14b8a6",
                        fontWeight: "600",
                      },
                    }}
                  />

                  <FormControl 
                    fullWidth 
                    size="small"
                    sx={{ 
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#14b8a6",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#14b8a6",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#ffffff",
                        }
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#14b8a6",
                        fontWeight: "600",
                      },
                    }}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={user.role || ""}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].role = e.target.value;
                        setUsers(updatedUsers);
                      }}
                      label="Role"
                    >
                      <MenuItem value="he">Host Employee</MenuItem>
                      <MenuItem value="sg">Security Guard</MenuItem>
                      <MenuItem value="sm">Security Manager</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="contained"
                      onClick={() => handleApprove(user)}
                      fullWidth
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        backgroundColor: "#14b8a6",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: "600",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(20, 184, 166, 0.3)",
                        "&:hover": {
                          backgroundColor: "#0d9488",
                          boxShadow: "0 4px 8px rgba(20, 184, 166, 0.4)",
                        },
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleReject(user.user_id)}
                      fullWidth
                      startIcon={<CancelIcon />}
                      sx={{
                        borderColor: "#ef4444",
                        borderWidth: "2px",
                        color: "#ef4444",
                        textTransform: "none",
                        fontWeight: "600",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        "&:hover": {
                          borderColor: "#dc2626",
                          borderWidth: "2px",
                          backgroundColor: "#fef2f2",
                        },
                      }}
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
    </Box>
  );
};

export default EMPR;