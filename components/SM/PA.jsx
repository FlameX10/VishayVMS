import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * VisitorsList
 * Props:
 *  - apiBase (optional) default: import.meta.env.VITE_BACKEND_API_URL || "/api"
 *
 * Expects endpoints:
 *  GET  {apiBase}/visitors/pending            (auth required)
 *  PUT  {apiBase}/visitors/:id/approve       (auth required)
 *  PUT  {apiBase}/visitors/:id/reject        (auth required)
 */
export default function VisitorsList({
  apiBase = import.meta.env.VITE_BACKEND_API_URL || "/api",
}) {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });
  const [confirm, setConfirm] = useState({ open: false, id: null, action: null });

  const getAuthToken = () => localStorage.getItem("authToken");

  const fetchPending = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();

      const res = await axios.get(`${apiBase}/visitors/pending`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      // support response shapes: { success, data: [...] } or just [...]
      const data = res?.data?.data ?? res?.data ?? [];
      setVisitors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchPending error:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openConfirm = (id, action) => setConfirm({ open: true, id, action });
  const closeConfirm = () => setConfirm({ open: false, id: null, action: null });

  const performAction = async (id, action) => {
    // optimistic UI update (mark processing)
    const original = [...visitors];
    setVisitors((v) => v.map((x) => (x.visitor_id === id ? { ...x, processing: true } : x)));

    try {
      const token = getAuthToken();
      // Backend doesn't require body for approve/reject in your code — only auth and URL.
      await axios.put(
        `${apiBase}/visitors/${id}/${action}`,
        null, // no body
        {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      // remove from pending list (since now approved/rejected)
      setVisitors((v) => v.filter((x) => x.visitor_id !== id));

      setSnack({ open: true, message: `Visitor ${action}d`, severity: "success" });
    } catch (err) {
      console.error(`Failed to ${action} visitor:`, err);
      setSnack({ open: true, message: `Failed to ${action} visitor`, severity: "error" });
      setVisitors(original);
    } finally {
      closeConfirm();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', width: '100%' }}>
      <Box sx={{ maxWidth: '100%', px: { xs: 2, sm: 3, lg: 6 }, py: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 2 }}>
          Pending Visitors
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ color: '#dc2626' }}>{error}</Typography>
        ) : visitors.length === 0 ? (
          <Typography sx={{ color: '#1f2937' }}>No pending visitors.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#0d9488' }}>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Company</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 600 }}>Created At</TableCell>
                  <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visitors.map((v) => (
                  <TableRow key={v.visitor_id} hover sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                    <TableCell sx={{ color: '#1f2937' }}>{v.name}</TableCell>
                    <TableCell sx={{ color: '#1f2937' }}>{v.visitor_type}</TableCell>
                    <TableCell sx={{ color: '#1f2937' }}>{v.company_name ?? "-"}</TableCell>
                    <TableCell sx={{ color: '#1f2937' }}>{v.phone ?? "-"}</TableCell>
                    <TableCell sx={{ color: '#1f2937' }}>{v.email ?? "-"}</TableCell>
                    <TableCell sx={{ color: '#1f2937' }}>{v.category_name ?? v.category_id ?? "-"}</TableCell>
                    <TableCell sx={{ color: '#1f2937' }}>
                      {v.created_at ? new Date(v.created_at).toLocaleString() : "-"}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<CheckIcon />}
                          disabled={v.processing}
                          onClick={() => openConfirm(v.visitor_id, "approve")}
                          sx={{ backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0f766e' }, '&:disabled': { backgroundColor: '#d1d5db' } }}
                        >
                          Approve
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<ClearIcon />}
                          disabled={v.processing}
                          onClick={() => openConfirm(v.visitor_id, "reject")}
                          sx={{ borderColor: '#dc2626', color: '#dc2626', '&:hover': { borderColor: '#b91c1c', backgroundColor: '#fef2f2' }, '&:disabled': { borderColor: '#d1d5db', color: '#d1d5db' } }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={confirm.open} onClose={closeConfirm}>
        <DialogTitle>{confirm.action === "approve" ? "Approve visitor" : "Reject visitor"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirm.action} this visitor? This action cannot be undone from
            this screen.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} sx={{ color: '#374151' }}>Cancel</Button>
          <Button
            onClick={() => performAction(confirm.id, confirm.action)}
            variant="contained"
            sx={confirm.action === "approve" 
              ? { backgroundColor: '#0d9488', '&:hover': { backgroundColor: '#0f766e' } }
              : { backgroundColor: '#dc2626', '&:hover': { backgroundColor: '#b91c1c' } }
            }
          >
            {confirm.action === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
      </Box>
    </Box>
  );
}
