import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Stack, 
  Chip,  
  Paper,  
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import ImageIcon from "@mui/icons-material/Image";

const IDV = () => {
  // Mock data for demonstration
  const [visitors, setVisitors] = useState([
    {
      visitor_id: "V001",
      full_name: "John Doe",
      id_number: "DL12345678",
      phone: "+1 234-567-8900",
      company: "Tech Solutions Inc.",
      visit_date: "2025-11-05",
      id_image_url: "https://via.placeholder.com/400x250/2563eb/ffffff?text=ID+Document",
    },
    {
      visitor_id: "V002",
      full_name: "Sarah Johnson",
      id_number: "PA98765432",
      phone: "+1 345-678-9012",
      company: "Marketing Pro",
      visit_date: "2025-11-06",
      id_image_url: "https://via.placeholder.com/400x250/1d4ed8/ffffff?text=Passport",
    },
    {
      visitor_id: "V003",
      full_name: "Michael Chen",
      id_number: "ID11223344",
      phone: "+1 456-789-0123",
      company: "Global Consulting",
      visit_date: "2025-11-05",
      id_image_url: "https://via.placeholder.com/400x250/2563eb/ffffff?text=ID+Card",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleVerify = (visitor) => {
    alert(`ID verified for ${visitor.full_name}`);
    setVisitors(visitors.filter(v => v.visitor_id !== visitor.visitor_id));
  };

  const handleReject = (visitorId) => {
    const visitor = visitors.find(v => v.visitor_id === visitorId);
    alert(`ID verification rejected for ${visitor?.full_name || 'visitor'}`);
    setVisitors(visitors.filter(v => v.visitor_id !== visitorId));
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
    setSelectedImage(null);
  };

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
          Visitor ID Verification
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#6b7280",
            fontSize: "0.95rem"
          }}
        >
          Review and verify visitor identification documents
        </Typography>
      </Box>

      {/* Stats Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "12px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
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
            <VerifiedUserIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h3" fontWeight="700">
              {visitors.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Pending Verifications
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {visitors.length === 0 ? (
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
          <CheckCircleIcon sx={{ fontSize: 64, color: "#2563eb", mb: 2 }} />
          <Typography variant="h6" fontWeight="600" color="#111827" gutterBottom>
            All Verified!
          </Typography>
          <Typography variant="body2" color="#6b7280">
            No pending ID verifications at the moment.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {visitors.map((visitor, index) => (
            <Card 
              key={visitor.visitor_id}
              elevation={0}
              sx={{ 
                borderRadius: "12px", 
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
                  borderColor: "#2563eb",
                }
              }}
            >
              {/* Top Color Bar */}
              <Box
                sx={{
                  height: "4px",
                  backgroundColor: "#2563eb",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              />

              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {/* Left Section - Visitor Info */}
                  <Grid item xs={12} md={4}>
                    <Stack spacing={2}>
                      {/* Visitor Header */}
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar 
                          sx={{ 
                            bgcolor: "#2563eb",
                            width: 56,
                            height: 56,
                            boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Box>
                          <Typography 
                            variant="h6" 
                            fontWeight="700"
                            sx={{ 
                              color: "#111827",
                              mb: 0.5,
                              fontSize: "1.1rem"
                            }}
                          >
                            {visitor.full_name || "Visitor"}
                          </Typography>
                          <Chip
                            label="Pending"
                            size="small"
                            sx={{
                              backgroundColor: "#fef3c7",
                              color: "#92400e",
                              fontWeight: "600",
                              fontSize: "0.75rem",
                              height: "24px",
                              borderRadius: "6px",
                            }}
                          />
                        </Box>
                      </Stack>

                      {/* Visitor Details */}
                      <Stack spacing={1.5}>
                        {/* ID Number */}
                        <Box 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1.5,
                            p: 1.5,
                            backgroundColor: "#f9fafb",
                            borderRadius: "8px",
                          }}
                        >
                          <FingerprintIcon sx={{ color: "#2563eb", fontSize: 20 }} />
                          <Box>
                            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.7rem" }}>
                              ID Number
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: "#374151",
                                fontSize: "0.875rem",
                                fontWeight: "600"
                              }}
                            >
                              {visitor.id_number || "Not provided"}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Phone */}
                        <Box 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1.5,
                            p: 1.5,
                            backgroundColor: "#f9fafb",
                            borderRadius: "8px",
                          }}
                        >
                          <PhoneIcon sx={{ color: "#2563eb", fontSize: 20 }} />
                          <Box>
                            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.7rem" }}>
                              Phone
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: "#374151",
                                fontSize: "0.875rem",
                                fontWeight: "600"
                              }}
                            >
                              {visitor.phone}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Company */}
                        <Box 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1.5,
                            p: 1.5,
                            backgroundColor: "#f9fafb",
                            borderRadius: "8px",
                          }}
                        >
                          <BusinessIcon sx={{ color: "#2563eb", fontSize: 20 }} />
                          <Box>
                            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.7rem" }}>
                              Company
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: "#374151",
                                fontSize: "0.875rem",
                                fontWeight: "600"
                              }}
                            >
                              {visitor.company}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Visit Date */}
                        <Box 
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: 1.5,
                            p: 1.5,
                            backgroundColor: "#f9fafb",
                            borderRadius: "8px",
                          }}
                        >
                          <CalendarTodayIcon sx={{ color: "#2563eb", fontSize: 20 }} />
                          <Box>
                            <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.7rem" }}>
                              Visit Date
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: "#374151",
                                fontSize: "0.875rem",
                                fontWeight: "600"
                              }}
                            >
                              {new Date(visitor.visit_date).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Stack>
                  </Grid>

                  {/* Middle Section - ID Document Image */}
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: "#6b7280", 
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          mb: 1,
                          display: "block"
                        }}
                      >
                        ID Document
                      </Typography>
                      <Box
                        onClick={() => handleImageClick(visitor.id_image_url)}
                        sx={{
                          width: "100%",
                          height: "280px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "2px solid #e5e7eb",
                          cursor: "pointer",
                          position: "relative",
                          backgroundColor: "#f9fafb",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#2563eb",
                            boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
                          }
                        }}
                      >
                        <img
                          src={visitor.id_image_url}
                          alt="ID Document"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "white",
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <ImageIcon sx={{ fontSize: 18 }} />
                          <Typography variant="caption" fontWeight="600">
                            Click to view full size
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Right Section - Actions */}
                  <Grid item xs={12} md={4}>
                    <Stack spacing={2} sx={{ height: "100%" }}>
                      <Box>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: "#6b7280", 
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            mb: 1,
                            display: "block"
                          }}
                        >
                          Verification Actions
                        </Typography>
                      </Box>

                      {/* Editable ID Number Field */}
                      <TextField
                        fullWidth
                        label="Verify ID Number"
                        variant="outlined"
                        size="small"
                        value={visitor.id_number || ""}
                        onChange={(e) => {
                          const updatedVisitors = [...visitors];
                          updatedVisitors[index].id_number = e.target.value;
                          setVisitors(updatedVisitors);
                        }}
                        InputProps={{
                          startAdornment: <BadgeIcon sx={{ color: "#9ca3af", mr: 1, fontSize: 20 }} />,
                        }}
                        sx={{ 
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "#f9fafb",
                            "&:hover fieldset": {
                              borderColor: "#2563eb",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#2563eb",
                              borderWidth: "2px",
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#ffffff",
                            }
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#2563eb",
                            fontWeight: "600",
                          },
                        }}
                      />

                      <Box 
                        sx={{ 
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        {/* Action Buttons */}
                        <Button
                          variant="contained"
                          onClick={() => handleVerify(visitor)}
                          fullWidth
                          startIcon={<CheckCircleIcon />}
                          sx={{
                            backgroundColor: "#2563eb",
                            color: "#ffffff",
                            textTransform: "none",
                            fontWeight: "600",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.3)",
                            "&:hover": {
                              backgroundColor: "#1d4ed8",
                              boxShadow: "0 4px 8px rgba(37, 99, 235, 0.4)",
                            },
                          }}
                        >
                          Verify ID
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleReject(visitor.visitor_id)}
                          fullWidth
                          startIcon={<CancelIcon />}
                          sx={{
                            borderColor: "#ef4444",
                            borderWidth: "2px",
                            color: "#ef4444",
                            textTransform: "none",
                            fontWeight: "600",
                            padding: "12px 16px",
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
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "700", color: "#111827" }}>
          ID Document Preview
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                p: 2,
              }}
            >
              <img
                src={selectedImage}
                alt="ID Document Full Size"
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseImageDialog}
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IDV;