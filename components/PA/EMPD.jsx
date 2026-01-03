'use client';

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Search, ChevronDown, User, Mail, Clock, Calendar, Filter, CheckCircle, AlertCircle } from 'lucide-react';

// Status badge styles
const statusStyles = {
  'approved': 'bg-green-100 text-green-700 border border-green-200',
  'active': 'bg-teal-100 text-teal-700 border border-teal-200',
  'inactive': 'bg-gray-100 text-gray-700 border border-gray-200',
};

// Role badge styles
const roleStyles = {
  'security_guard': 'bg-blue-100 text-blue-700',
  'host_employee': 'bg-purple-100 text-purple-700',
  'process_admin': 'bg-orange-100 text-orange-700',
};

// --- Sub-Components ---
const StatCard = ({ title, value, change, color, icon: Icon }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg flex-1 min-w-[180px]">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      {Icon && <Icon className="w-5 h-5 text-teal-600" />}
    </div>
    <div className="text-3xl font-bold text-gray-800 mt-1">{value}</div>
    {change && (
      <div className={`text-xs mt-2 font-medium ${color === 'green' ? 'text-green-500' : 'text-red-500'}`}>
        {change} vs last month
      </div>
    )}
  </div>
);

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl border border-gray-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <User className="mr-3 text-teal-600" size={28} />
            {user.full_name || 'N/A'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${roleStyles[user.role] || 'bg-gray-100 text-gray-700'}`}>
                {user.role.toUpperCase().replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Current Status</p>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[user.status] || statusStyles.approved}`}>
                {user.status}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t mt-4 space-y-3">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-3" />
              <a href={`mailto:${user.email}`} className="text-teal-600 hover:underline">{user.email}</a>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-gray-700">User ID: {user.user_id}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition shadow-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function ApprovedEmployees() {
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showRoleFilter, setShowRoleFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Unauthorized: Please log in.');
        setLoading(false);
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));

        if (decoded.role !== "process_admin") {
          setError('Access denied: You are not authorized.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/pa/approved/emp/requests`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setApprovedUsers(response.data.approvedUsers);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch approved users');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedUsers();
  }, []);

  // Unique roles
  const allRoles = useMemo(() => {
    const roles = new Set(approvedUsers.map(u => u.role));
    return ['All Roles', ...Array.from(roles)].sort();
  }, [approvedUsers]);

  const allStatuses = ['All Status', 'approved', 'active', 'inactive'];

  // Filter logic
  const filteredUsers = useMemo(() => {
    let results = approvedUsers;
    const term = searchTerm.toLowerCase();

    if (searchTerm) {
      results = results.filter(user =>
        user.full_name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.role?.toLowerCase().includes(term)
      );
    }

    if (selectedRole !== 'All Roles') {
      results = results.filter(user => user.role === selectedRole);
    }

    if (selectedStatus !== 'All Status') {
      results = results.filter(user => user.status === selectedStatus);
    }

    return results;
  }, [approvedUsers, searchTerm, selectedRole, selectedStatus]);

  // CSV Export
  const exportToCsv = (data) => {
    const headers = ['user_id', 'full_name', 'email', 'role', 'status'];
    const csv = "data:text/csv;charset=utf-8," 
      + headers.join(',') + "\n"
      + data.map(u => headers.map(h => `"${u[h] || 'N/A'}"`).join(',')).join("\n");
    
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "approved_employees.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const totalApproved = approvedUsers.length;
  const securityGuards = approvedUsers.filter(u => u.role === 'security_guard').length;
  const hostEmployees = approvedUsers.filter(u => u.role === 'host_employee').length;
  const processAdmins = approvedUsers.filter(u => u.role === 'process_admin').length;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">Loading approved employees...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full">
          <div className="flex items-center mb-3">
            <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
          </div>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-800">Approved Employees</h2>
          <p className="text-sm text-gray-500 mt-1">Dashboard / Process Admin / <strong>Approved Employees</strong></p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          <StatCard title="Total Approved" value={totalApproved} icon={CheckCircle} />
          <StatCard title="Security Guards" value={securityGuards} change="5%" color="green" />
          <StatCard title="Host Employees" value={hostEmployees} change="10%" color="green" />
          <StatCard title="Process Admins" value={processAdmins} />
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 md:w-1/3">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, role..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleFilter(!showRoleFilter)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition border"
              >
                <Filter size={18} className="mr-1" /> {selectedRole} <ChevronDown size={18} className="ml-1" />
              </button>
              {showRoleFilter && (
                <div className="absolute top-full mt-1 w-48 bg-white rounded-lg shadow-xl border z-20">
                  {allRoles.map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setShowRoleFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition border pr-8 focus:ring-teal-500 focus:border-teal-500"
              >
                {allStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={() => exportToCsv(filteredUsers)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-md ml-auto"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-600 text-white">
              <tr>
                {['User ID', 'Name', 'Email', 'Role', 'Status'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.user_id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-500">{user.user_id}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-teal-600 hover:underline font-medium"
                    >
                      {user.full_name || 'N/A'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a href={`mailto:${user.email}`} className="text-teal-600 hover:underline">{user.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${roleStyles[user.role] || 'bg-gray-100 text-gray-700'}`}>
                      {user.role.toUpperCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[user.status] || statusStyles.approved}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="text-center p-8 text-gray-500">No approved employees found matching your search criteria.</p>
          )}
        </div>

        {/* Modal */}
        <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      </div>
    </div>
  );
}