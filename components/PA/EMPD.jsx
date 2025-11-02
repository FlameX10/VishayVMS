import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  Stack,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const ApprovedUsers = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Unauthorized: Please log in.');
        setLoading(false);
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setRole(decoded.role);

        if (decoded.role !== "process_admin") {
          setError('Access denied: You are not authorized.');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/pa/approved/emp/requests`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setApprovedUsers(response.data.approvedUsers);
      } catch (err) {
        setError(
          err?.response?.data?.message || 'Failed to fetch approved users'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedUsers();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: 'flex', margin: '50px auto' }} />;
  }

  if (error) {
    return <Alert severity="error" sx={{ margin: '20px' }}>{error}</Alert>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Approved Employees
      </Typography>
      <Grid container spacing={4}>
        {approvedUsers.length === 0 ? (
          <Alert severity="info" sx={{ width: '100%', textAlign: 'center' }}>
            No approved employees found.
          </Alert>
        ) : (
          approvedUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.user_id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 2,
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        fontSize: 20,
                      }}
                    >
                      <PersonIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {user.full_name || 'N/A'}
                    </Typography>
                  </Stack>

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Role:</strong> {user.role.toUpperCase()}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Status:</strong> {user.status}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ApprovedUsers;
