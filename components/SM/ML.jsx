// MeetingsPageWithActions.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * MeetingsPageWithActions
 *
 * Props:
 *  - apiBase (optional) default: import.meta.env.VITE_BACKEND_API_URL || ""
 *
 * Expects auth token in localStorage.authToken
 * Uses PUT /meetings/:id/status { status: "scheduled" | "rejected" }
 */
export default function MeetingsPageWithActions({ apiBase = import.meta.env.VITE_BACKEND_API_URL || "" }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [hostFilter, setHostFilter] = useState("");

  // Pagination (client-side)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // UI
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  // Confirm dialog for actions
  const [actionDialog, setActionDialog] = useState({
    open: false,
    meeting: null,
    action: null, // "scheduled" | "rejected"
  });

  const getAuthToken = () => localStorage.getItem("authToken");

  const fetchMeetings = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const params = {};
      if (dateFilter) params.date = dateFilter;
      if (statusFilter) params.status = statusFilter;
      if (hostFilter) params.host_id = hostFilter;

      const res = await axios.get(`${apiBase}/meetings/details`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        params,
      });

      const data = res?.data?.data ?? res?.data ?? [];
      // ensure each meeting has a processing flag (false)
      setMeetings(Array.isArray(data) ? data.map((m) => ({ ...m, processing: false })) : []);
    } catch (err) {
      console.error("fetchMeetings error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch meetings");
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setPage(0);
    fetchMeetings();
  };

  const handleRefresh = () => {
    setDateFilter("");
    setStatusFilter("");
    setHostFilter("");
    setPage(0);
    fetchMeetings();
  };

  // pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // open confirmation dialog
  const confirmAction = (meeting, action) => {
    setActionDialog({ open: true, meeting, action });
  };
  const closeActionDialog = () => setActionDialog({ open: false, meeting: null, action: null });

  // perform status update
  const performStatusUpdate = async (meetingId, newStatus) => {
    // optimistic UI: set processing true on target meeting
    const original = [...meetings];
    setMeetings((list) => list.map((m) => (m.meeting_id === meetingId ? { ...m, processing: true } : m)));

    try {
      const token = getAuthToken();
      const res = await axios.put(
        `${apiBase}/meetings/${meetingId}/status`,
        { status: newStatus },
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      // on success, update local meeting status using returned data if provided
      const updated = res?.data?.data ?? null;
      if (updated) {
        setMeetings((list) => list.map((m) => (m.meeting_id === meetingId ? { ...m, ...updated, processing: false } : m)));
      } else {
        // fallback: just update status locally
        setMeetings((list) => list.map((m) => (m.meeting_id === meetingId ? { ...m, status: newStatus, processing: false } : m)));
      }

      setSnack({ open: true, message: `Meeting ${newStatus}`, severity: "success" });
    } catch (err) {
      console.error("status update error:", err);
      setSnack({ open: true, message: `Failed to set ${newStatus}`, severity: "error" });
      setMeetings(original); // restore
    } finally {
      closeActionDialog();
    }
  };

  // displayed meetings for pagination
  const displayed = meetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', width: '100%' }}>
      <Box sx={{ maxWidth: '100%', px: { xs: 2, sm: 3, lg: 6 }, py: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
              Meetings
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
              Meetings with approved visitors — schedule or reject from here.
            </Typography>
          </Box>

          <Box>
            <Button startIcon={<RefreshIcon />} onClick={handleRefresh} sx={{ color: '#1f2937' }}>
              Reset & Refresh
            </Button>
          </Box>
        </Stack>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ startAdornment: <CalendarTodayIcon sx={{ mr: 1 }} /> }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="pending">pending</MenuItem>
                <MenuItem value="scheduled">scheduled</MenuItem>
                <MenuItem value="confirmed">confirmed</MenuItem>
                <MenuItem value="cancelled">cancelled</MenuItem>
                <MenuItem value="rejected">rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Host ID"
              value={hostFilter}
              onChange={(e) => setHostFilter(e.target.value)}
              fullWidth
              placeholder="e.g. 3"
            />
          </Grid>

          <Grid item xs={12} md={2} sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={loading}
              fullWidth
              sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0f766e' } }}
            >
              Search
            </Button>
            <Button variant="outlined" onClick={handleRefresh} disabled={loading} sx={{ borderColor: '#d1d5db', color: '#374151', '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' } }}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

        {/* Content */}
        <Paper sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={48} />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4 }}>
            <Typography sx={{ mb: 2, color: '#dc2626' }}>
              {error}
            </Typography>
            <Button variant="contained" onClick={fetchMeetings} sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0f766e' } }}>
              Retry
            </Button>
          </Box>
        ) : meetings.length === 0 ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: '#1f2937' }}>No meetings found</Typography>
            <Typography sx={{ color: '#6b7280' }}>Try changing filters or refresh.</Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#0d9488' }}>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Meeting</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Scheduled</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Purpose</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Host</TableCell>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Visitor</TableCell>
                    <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {displayed.map((m) => (
                    <TableRow key={m.meeting_id} hover sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                      <TableCell>
                        <Typography fontWeight={700} sx={{ color: '#1f2937' }}>#{m.meeting_id}</Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          created: {m.created_at ? new Date(m.created_at).toLocaleString() : "-"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>
                          {m.scheduled_date ?? "-"} {m.scheduled_time ?? ""}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ maxWidth: 220 }}>
                        <Typography noWrap>{m.purpose ?? "-"}</Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={m.status ?? "-"}
                          size="small"
                          color={
                            m.status === "confirmed"
                              ? "success"
                              : m.status === "cancelled"
                              ? "error"
                              : m.status === "scheduled"
                              ? "primary"
                              : m.status === "rejected"
                              ? "default"
                              : "warning"
                          }
                        />
                      </TableCell>

                      <TableCell>
                        {m.host ? (
                          <Box>
                            <Typography fontWeight={700} noWrap sx={{ color: '#1f2937' }}>
                              {m.host.full_name}
                            </Typography>
                            <Typography variant="body2" noWrap sx={{ color: '#6b7280' }}>
                              {m.host.email}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography sx={{ color: '#6b7280' }}>No host</Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        {m.visitor ? (
                          <Box>
                            <Typography fontWeight={700} noWrap sx={{ color: '#1f2937' }}>
                              {m.visitor.name}
                            </Typography>
                            <Typography variant="body2" noWrap sx={{ color: '#6b7280' }}>
                              {m.visitor.email ?? "-"} • {m.visitor.phone ?? "-"}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography sx={{ color: '#6b7280' }}>No visitor</Typography>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<EventAvailableIcon />}
                            onClick={() => confirmAction(m, "scheduled")}
                            disabled={m.processing || m.status === "scheduled"}
                            sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0f766e' }, '&:disabled': { backgroundColor: '#d1d5db' } }}
                          >
                            Schedule
                          </Button>

                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<CancelIcon />}
                            onClick={() => confirmAction(m, "rejected")}
                            disabled={m.processing || m.status === "rejected"}
                            sx={{ borderColor: '#dc2626', color: '#dc2626', '&:hover': { borderColor: '#b91c1c', backgroundColor: '#fef2f2' }, '&:disabled': { borderColor: '#d1d5db', color: '#d1d5db' } }}
                          >
                            Reject
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={meetings.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </Paper>

      {/* Action confirmation dialog */}
      <Dialog open={actionDialog.open} onClose={closeActionDialog}>
        <DialogTitle>
          {actionDialog.action === "scheduled" ? "Schedule meeting" : "Reject meeting"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actionDialog.action === "scheduled"
              ? `Are you sure you want to mark meeting #${actionDialog.meeting?.meeting_id} as scheduled?`
              : `Are you sure you want to reject meeting #${actionDialog.meeting?.meeting_id}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeActionDialog} sx={{ color: '#374151' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => performStatusUpdate(actionDialog.meeting.meeting_id, actionDialog.action)}
            sx={actionDialog.action === "scheduled" 
              ? { backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0f766e' } }
              : { backgroundColor: '#dc2626', '&:hover': { backgroundColor: '#b91c1c' } }
            }
          >
            {actionDialog.action === "scheduled" ? "Schedule" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.message}
        </Alert>
      </Snackbar>
      </Box>
    </Box>
  );
}
