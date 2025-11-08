import React, { useState } from 'react';
import axios from 'axios';

export default function VRF() {
  const [formData, setFormData] = useState({
    email: '',
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/visitor/register`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert(res.data.message);

      // Reset form on success
      setFormData({
        email: '',
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
        otherElectronics: '',
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
          {/* ✅ Email Field */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         outline-none transition"
            />
          </div>

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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           outline-none transition"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           outline-none transition"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           outline-none transition"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           outline-none transition"
              />
            </div>
          </div>

          {/* Company or College */}
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                           outline-none transition"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                             outline-none transition"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                             outline-none transition"
                />
              </div>
            </div>
          )}

          {/* (rest of your existing fields remain unchanged) */}
          {/* ... ID Proof, Visit Date, Purpose, Category, etc. */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg 
                       font-semibold text-lg hover:bg-blue-700 hover:shadow-lg 
                       transition-all duration-200"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}
