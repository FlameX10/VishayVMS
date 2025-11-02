import React, { useState } from 'react';
import axios from 'axios';

export default function VRF() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    mobile: '',
    department: '',
    companyName: '',
    collegeName: '',
    course: '',
    idProofType: '',
    idProofNumber: '',
    visitDate: '',
    purposeOfVisit: '',
    otherPurpose: '',
    visitorType: '',
    visitorCategory: '',
    otherCategory: '',
    electronics: [],
    otherElectronics: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:3000/visitor/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(res.data.message);
      // Reset form on success
      setFormData({
        name: '',
        designation: '',
        mobile: '',
        department: '',
        companyName: '',
        collegeName: '',
        course: '',
        idProofType: '',
        idProofNumber: '',
        visitDate: '',
        purposeOfVisit: '',
        otherPurpose: '',
        visitorType: '',
        visitorCategory: '',
        otherCategory: '',
        electronics: [],
        otherElectronics: ''
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error occurred while submitting the form');
    }
  };

  const isStudent = formData.designation === 'student';
  const showOtherCategory = formData.visitorCategory === 'other';
  const showOtherPurpose = formData.purposeOfVisit === 'other';

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-2xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
          Visitor Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Name and Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Designation <span className="text-red-500">*</span>
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">Select Designation</option>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="director">Director</option>
                <option value="consultant">Consultant</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Mobile and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Company or College Section */}
          {!isStudent ? (
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required={!isStudent}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  required={isStudent}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required={isStudent}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>
          )}

          {/* ID Proof */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Identity Proof Type <span className="text-red-500">*</span>
              </label>
              <select
                name="idProofType"
                value={formData.idProofType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">Select ID Proof</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="pan">PAN Card</option>
                <option value="driving">Driving License</option>
                <option value="passport">Passport</option>
                <option value="voter">Voter ID</option>
                <option value="college">College ID</option>
                <option value="employee">Employee ID</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Identity Proof Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idProofNumber"
                value={formData.idProofNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          {/* Visit Date */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Visit Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          {/* Purpose and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Purpose of Visit <span className="text-red-500">*</span>
              </label>
              <select
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">Select Purpose</option>
                <option value="meeting">Business Meeting</option>
                <option value="interview">Interview</option>
                <option value="training">Training/Workshop</option>
                <option value="inspection">Inspection</option>
                <option value="delivery">Delivery</option>
                <option value="maintenance">Maintenance</option>
                <option value="industrial_visit">Industrial Visit</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Type of Visitor <span className="text-red-500">*</span>
              </label>
              <select
                name="visitorType"
                value={formData.visitorType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">Select Type</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="vendor">Vendor</option>
                <option value="contractor">Contractor</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>

          {/* Other Purpose */}
          {showOtherPurpose && (
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Please Specify Purpose <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otherPurpose"
                value={formData.otherPurpose}
                onChange={handleInputChange}
                required={showOtherPurpose}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Category of Visitor <span className="text-red-500">*</span>
            </label>
            <select
              name="visitorCategory"
              value={formData.visitorCategory}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            >
              <option value="">Select Category</option>
              <option value="client">Client</option>
              <option value="student">Student/Academic</option>
              <option value="supplier">Supplier</option>
              <option value="government">Government Official</option>
              <option value="press">Press/Media</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Other Category */}
          {showOtherCategory && (
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Please Specify Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otherCategory"
                value={formData.otherCategory}
                onChange={handleInputChange}
                required={showOtherCategory}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}