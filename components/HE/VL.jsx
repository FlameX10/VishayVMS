'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, Mail, FileText, User, AlertCircle, CheckCircle } from 'lucide-react';

const CreateMeeting = () => {
  const [formData, setFormData] = useState({
    visitor_email: "",
    scheduled_date: "",
    scheduled_time: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.visitor_email || !formData.scheduled_date || !formData.purpose) {
      setSnackbar({ open: true, message: "Please fill required fields", severity: "warning" });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/he/create-meeting`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbar({
        open: true,
        message: response.data.message || "Meeting created successfully!",
        severity: "success",
      });

      // Clear form after success
      setFormData({
        visitor_email: "",
        scheduled_date: "",
        scheduled_time: "",
        purpose: "",
      });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans w-full">
      <div className="max-w-full px-4 sm:px-6 lg:px-12 py-4">
        
        {/* Header */}
        <header className="flex justify-end items-center mb-6 text-sm text-gray-500">
          <Calendar className="w-5 h-5" />
          <span className="mx-1">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="mx-2 text-gray-300">|</span>
          <Clock className="w-5 h-5" />
          <span className="ml-1">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          <User className="w-6 h-6 ml-4 text-teal-600" />
        </header>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Meeting Invitation</h2>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Host Employee / <strong>Meeting Invitation</strong></p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Visitor Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2 text-teal-600" />
                Visitor Email
              </label>
              <input
                type="email"
                name="visitor_email"
                value={formData.visitor_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                placeholder="visitor@example.com"
              />
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scheduled Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2 text-teal-600" />
                  Scheduled Date
                </label>
                <input
                  type="date"
                  name="scheduled_date"
                  value={formData.scheduled_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </div>

              {/* Scheduled Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-2 text-teal-600" />
                  Scheduled Time
                </label>
                <input
                  type="time"
                  name="scheduled_time"
                  value={formData.scheduled_time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2 text-teal-600" />
                Purpose
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition resize-none"
                placeholder="Enter the purpose of the meeting..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition shadow-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Meeting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Create Meeting
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Snackbar Notification */}
        {snackbar.open && (
          <div 
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl flex items-center space-x-3 min-w-[300px] ${
              snackbar.severity === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : snackbar.severity === 'error'
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
            }`}
          >
            {snackbar.severity === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : snackbar.severity === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            )}
            <span className="flex-1">{snackbar.message}</span>
            <button
              onClick={() => setSnackbar({ ...snackbar, open: false })}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMeeting;