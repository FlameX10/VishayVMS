import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MeetingStatusList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/he/meetings-status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMeetings(response.data.meetings);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            My Meetings with Visitor Details
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                  <TableCell><b>Purpose</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Visitor Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Visitor Type</b></TableCell>
                  <TableCell><b>Company</b></TableCell>
                  <TableCell><b>ID Proof</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {meetings.length > 0 ? (
                  meetings.map((m) => (
                    <TableRow key={m.meeting_id}>
                      <TableCell>{m.scheduled_date}</TableCell>
                      <TableCell>{m.scheduled_time}</TableCell>
                      <TableCell>{m.purpose || "—"}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            m.status === "approved"
                              ? "green"
                              : m.status === "rejected"
                              ? "red"
                              : "orange",
                        }}
                      >
                        {m.status}
                      </TableCell>
                      <TableCell>{m.visitor_name || "—"}</TableCell>
                      <TableCell>{m.visitor_email || "—"}</TableCell>
                      <TableCell>{m.visitor_phone || "—"}</TableCell>
                      <TableCell>{m.visitor_type || "—"}</TableCell>
                      <TableCell>{m.company_name || "—"}</TableCell>
                      <TableCell>
                        {m.id_proof_type
                          ? `${m.id_proof_type}: ${m.id_proof_number}`
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No meetings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MeetingStatusList;
