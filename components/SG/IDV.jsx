import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Avatar,
  Stack,
  Chip,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
      id_image_url: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=ID+Document",
    },
    {
      visitor_id: "V002",
      full_name: "Sarah Johnson",
      id_number: "PA98765432",
      phone: "+1 345-678-9012",
      company: "Marketing Pro",
      visit_date: "2025-11-06",
      id_image_url: "https://via.placeholder.com/400x250/6366f1/ffffff?text=Passport",
    },
    {
      visitor_id: "V003",
      full_name: "Michael Chen",
      id_number: "ID11223344",
      phone: "+1 456-789-0123",
      company: "Global Consulting",
      visit_date: "2025-11-05",
      id_image_url: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=ID+Card",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleVerify = (visitor) => {
    alert(`ID verified for ${visitor.full_name}`);
    // Remove from list after verification
    setVisitors(visitors.filter(v => v.visitor_id !== visitor.visitor_id));
  };

  const handleReject = (visitorId) => {
    const visitor = visitors.find(v => v.visitor_id === visitorId);
    alert(`ID verification rejected for ${visitor?.full_name || 'visitor'}`);
    // Remove from list after rejection
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
          background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.3)",
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
          <CheckCircleIcon sx={{ fontSize: 64, color: "#8b5cf6", mb: 2 }} />
          <Typography variant="h6" fontWeight="600" color="#111827" gutterBottom>
            All Verified!
          </Typography>
          <Typography variant="body2" color="#6b7280">
            No pending ID verifications at the moment.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {visitors.map((visitor, index) => (
            <Grid item xs={12} md={6} lg={4} key={visitor.visitor_id}>
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
                    boxShadow: "0 12px 24px -8px rgba(139, 92, 246, 0.25)",
                    borderColor: "#8b5cf6",
                  }
                }}
              >
                {/* Top Color Bar */}
                <Box
                  sx={{
                    height: "4px",
                    background: "linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                <CardContent sx={{ p: 3 }}>
                  {/* Visitor Header */}
                  <Stack direction="row" spacing={2} alignItems="flex-start" mb={3}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "#8b5cf6",
                        width: 56,
                        height: 56,
                        boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.3)",
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
                        {visitor.full_name || "Visitor"}
                      </Typography>
                      <Chip
                        label="Pending Verification"
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
                  <Stack spacing={2} mb={3}>
                    {/* ID Number */}
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1.5,
                        p: 2,
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        border: "1px solid #f3f4f6"
                      }}
                    >
                      <FingerprintIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                      <Box sx={{ flex: 1 }}>
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
                    {visitor.phone && (
                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1.5,
                          p: 2,
                          backgroundColor: "#f9fafb",
                          borderRadius: "8px",
                          border: "1px solid #f3f4f6"
                        }}
                      >
                        <PhoneIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.7rem" }}>
                            Phone Number
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
                    )}

                    {/* Company */}
                    {visitor.company && (
                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1.5,
                          p: 2,
                          backgroundColor: "#f9fafb",
                          borderRadius: "8px",
                          border: "1px solid #f3f4f6"
                        }}
                      >
                        <BusinessIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                        <Box sx={{ flex: 1 }}>
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
                    )}

                    {/* Visit Date */}
                    {visitor.visit_date && (
                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1.5,
                          p: 2,
                          backgroundColor: "#f9fafb",
                          borderRadius: "8px",
                          border: "1px solid #f3f4f6"
                        }}
                      >
                        <CalendarTodayIcon sx={{ color: "#8b5cf6", fontSize: 20 }} />
                        <Box sx={{ flex: 1 }}>
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
                    )}
                  </Stack>

                  {/* ID Document Image */}
                  {visitor.id_image_url && (
                    <Box sx={{ mb: 3 }}>
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
                          height: "180px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "2px solid #e5e7eb",
                          cursor: "pointer",
                          position: "relative",
                          backgroundColor: "#f9fafb",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#8b5cf6",
                            boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.3)",
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
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "white",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <ImageIcon sx={{ fontSize: 16 }} />
                          <Typography variant="caption" fontWeight="600">
                            Click to view full size
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  <Divider sx={{ mb: 3 }} />

                  {/* Editable ID Number Field */}
                  <TextField
                    fullWidth
                    label="ID Number"
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
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#f9fafb",
                        "&:hover fieldset": {
                          borderColor: "#8b5cf6",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8b5cf6",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#ffffff",
                        }
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#8b5cf6",
                        fontWeight: "600",
                      },
                    }}
                  />

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="contained"
                      onClick={() => handleVerify(visitor)}
                      fullWidth
                      startIcon={<CheckCircleIcon />}
                      sx={{
                        backgroundColor: "#8b5cf6",
                        color: "#ffffff",
                        textTransform: "none",
                        fontWeight: "600",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(139, 92, 246, 0.3)",
                        "&:hover": {
                          backgroundColor: "#7c3aed",
                          boxShadow: "0 4px 8px rgba(139, 92, 246, 0.4)",
                        },
                      }}
                    >
                      Verify
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
              backgroundColor: "#8b5cf6",
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#7c3aed",
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