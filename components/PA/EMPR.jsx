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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const PendingUserRequests = () => {
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Pending User Approval Requests
      </Typography>

      {users.length === 0 ? (
        <Alert severity="info">No pending user requests found.</Alert>
      ) : (
        <Grid container spacing={4}>
          {users.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={user.user_id}>
              <Card sx={{ borderRadius: "12px", boxShadow: 3, padding: 2 }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {user.full_name || "New User"}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {user.email}
                  </Typography>

                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={user.full_name || ""}
                    onChange={(e) => {
                      const updatedUsers = [...users];
                      updatedUsers[index].full_name = e.target.value;
                      setUsers(updatedUsers);
                    }}
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
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

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(user)}
                      fullWidth
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleReject(user.user_id)}
                      fullWidth
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

export default PendingUserRequests;
