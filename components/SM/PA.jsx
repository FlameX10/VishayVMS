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
    <Box>
      <Typography variant="h5" gutterBottom>
        Pending Visitors
      </Typography>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : visitors.length === 0 ? (
          <Typography>No pending visitors.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visitors.map((v) => (
                  <TableRow key={v.visitor_id} hover>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.visitor_type}</TableCell>
                    <TableCell>{v.company_name ?? "-"}</TableCell>
                    <TableCell>{v.phone ?? "-"}</TableCell>
                    <TableCell>{v.email ?? "-"}</TableCell>
                    <TableCell>{v.category_name ?? v.category_id ?? "-"}</TableCell>
                    <TableCell>
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
                        >
                          Approve
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<ClearIcon />}
                          disabled={v.processing}
                          onClick={() => openConfirm(v.visitor_id, "reject")}
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
          <Button onClick={closeConfirm}>Cancel</Button>
          <Button
            onClick={() => performAction(confirm.id, confirm.action)}
            variant="contained"
            color={confirm.action === "approve" ? "primary" : "error"}
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
  );
}
