import React, { useState } from 'react';

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
    idProofFile: null,
    visitDate: '',
    visitFrom: '',
    visitTo: '',
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Allowed file types
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg',
        'image/jpg'
      ];
      
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload PDF, DOC, DOCX, PNG, JPG, or JPEG only.');
        e.target.value = '';
        return;
      }
      
      // Check file size (50MB = 50 * 1024 * 1024 bytes)
      if (file.size > 50 * 1024 * 1024) {
        alert('File size must be less than 50MB');
        e.target.value = '';
        return;
      }
    }
    setFormData(prev => ({
      ...prev,
      idProofFile: file
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      electronics: checked
        ? [...prev.electronics, value]
        : prev.electronics.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Registration submitted successfully!');
  };

  const isStudent = formData.designation === 'student';
  const showOtherCategory = formData.visitorCategory === 'other';
  const showOtherPurpose = formData.purposeOfVisit === 'other';
  const showOtherElectronics = formData.electronics.includes('other');

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-2xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
          Visitor Registration Form
        </h1>

        <div className="space-y-6 text-black">
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
                Upload Identity Proof <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
              <p className="text-xs text-gray-600 mt-1">
                Allowed: PDF, DOC, DOCX, PNG, JPG, JPEG (Max 50MB)
              </p>
            </div>
          </div>

          {/* Visit Date and Time */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Time (From) <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="visitFrom"
                value={formData.visitFrom}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Time (To) <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="visitTo"
                value={formData.visitTo}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
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

          {/* Electronics */}
          <div>
            <label className="block text-sm font-semibold text-black mb-3">
              Electronics Being Carried
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: 'laptop', label: 'Laptop' },
                { value: 'mobile', label: 'Mobile Phone' },
                { value: 'tablet', label: 'Tablet' },
                { value: 'camera', label: 'Camera' },
                { value: 'pendrive', label: 'Pen Drive/USB' },
                { value: 'harddisk', label: 'External Hard Disk' },
                { value: 'smartwatch', label: 'Smart Watch' },
                { value: 'other', label: 'Other' }
              ].map(item => (
                <label key={item.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={formData.electronics.includes(item.value)}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-black">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Other Electronics */}
          {showOtherElectronics && (
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Please Specify Other Electronics <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otherElectronics"
                value={formData.otherElectronics}
                onChange={handleInputChange}
                required={showOtherElectronics}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
          >
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );
}