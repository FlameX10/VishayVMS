import React, { useState } from 'react';

const initialMeetings = [
  {
    id: 1,
    hostEmployee: 'Jane Doe',
    department: 'HR',
    visitor: 'Robert Luther',
    visitorCompany: 'Tech Solutions Inc.',
    date: '2025-10-31',
    time: '10:00 AM',
    duration: '1 hour',
    purpose: 'Vendor Discussion',
    status: 'Scheduled'
  },
  {
    id: 2,
    hostEmployee: 'Mike Ross',
    department: 'IT',
    visitor: 'Luna Zona',
    visitorCompany: 'Creative Minds',
    date: '2025-10-31',
    time: '02:30 PM',
    duration: '45 mins',
    purpose: 'Client Meeting',
    status: 'Completed'
  },
  {
    id: 3,
    hostEmployee: 'Sarah Lee',
    department: 'Marketing',
    visitor: 'Albert Manish',
    visitorCompany: 'N/A',
    date: '2025-11-01',
    time: '11:00 AM',
    duration: '30 mins',
    purpose: 'Interview',
    status: 'Scheduled'
  },
  {
    id: 4,
    hostEmployee: 'John Smith',
    department: 'Sales',
    visitor: 'Emma Wilson',
    visitorCompany: 'Global Corp',
    date: '2025-11-01',
    time: '03:00 PM',
    duration: '2 hours',
    purpose: 'Business Proposal',
    status: 'Postponed'
  },
  {
    id: 5,
    hostEmployee: 'Admin',
    department: 'Admin',
    visitor: 'Robert Smith',
    visitorCompany: 'N/A',
    date: '2025-10-31',
    time: '09:00 AM',
    duration: '1 hour',
    purpose: 'Interview',
    status: 'Cancelled'
  },
  {
    id: 6,
    hostEmployee: 'David Chen',
    department: 'Engineering',
    visitor: 'Sofia Martinez',
    visitorCompany: 'Tech Innovations',
    date: '2025-11-02',
    time: '01:00 PM',
    duration: '1.5 hours',
    purpose: 'Technical Discussion',
    status: 'Scheduled'
  },
];

const ML = () => {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const today = '2025-10-31';
  const tomorrow = '2025-11-01';
  const dayAfterTomorrow = '2025-11-02';

  const getFilteredMeetings = () => {
    let filtered = meetings;

    if (dateFilter !== 'all') {
      filtered = filtered.filter(m => m.date === dateFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.hostEmployee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.visitor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.visitorCompany.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredMeetings = getFilteredMeetings();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Postponed':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const updateMeetingStatus = (id, newStatus) => {
    setMeetings(currentMeetings =>
      currentMeetings.map(meeting =>
        meeting.id === id ? { ...meeting, status: newStatus } : meeting
      )
    );
    if (selectedMeeting && selectedMeeting.id === id) {
      setSelectedMeeting({ ...selectedMeeting, status: newStatus });
    }
  };

  const handleShowInfo = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleCloseModal = () => {
    setSelectedMeeting(null);
  };

  const stats = {
    total: meetings.length,
    scheduled: meetings.filter(m => m.status === 'Scheduled').length,
    completed: meetings.filter(m => m.status === 'Completed').length,
    postponed: meetings.filter(m => m.status === 'Postponed').length,
    cancelled: meetings.filter(m => m.status === 'Cancelled').length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Meeting Management System</h1>
        <p className="text-sm text-gray-500 mt-1">Schedule and track meetings with visitors</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium text-gray-700">Filter by Date:</label>
            <input
              type="date"
              value={dateFilter === 'all' ? '' : dateFilter}
              onChange={(e) => setDateFilter(e.target.value || 'all')}
              className="px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {dateFilter !== 'all' && (
              <button
                onClick={() => setDateFilter('all')}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search by host, visitor, department, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Host Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Meeting Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Meeting Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMeetings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center text-sm text-gray-500">
                    No meetings found
                  </td>
                </tr>
              ) : (
                filteredMeetings.map((meeting) => (
                  <tr key={meeting.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleShowInfo(meeting)}
                        className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                      >
                        {meeting.hostEmployee}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meeting.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meeting.visitor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meeting.visitorCompany}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meeting.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meeting.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meeting.purpose}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleShowInfo(meeting)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Meeting Details</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none focus:outline-none"
              >
                ×
              </button>
            </div>
            
            <div className="px-6 py-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Host Employee</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.hostEmployee}</p>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Department</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.department}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Visitor</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.visitor}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Company</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.visitorCompany}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Date</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.date}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Time</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.time}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Duration</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.duration}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${getStatusColor(selectedMeeting.status)}`}>
                    {selectedMeeting.status}
                  </span>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Purpose</label>
                  <p className="text-sm text-gray-900">{selectedMeeting.purpose}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <select
                value={selectedMeeting.status}
                onChange={(e) => updateMeetingStatus(selectedMeeting.id, e.target.value)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Postponed">Postponed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ML;