import React, { useState } from 'react';

const initialVisitors = [
  {
    id: 1,
    name: 'Robert Luther',
    type: 'Vendor',
    purpose: 'Meeting',
    status: 'Out',
    company: 'Tech Solutions Inc.',
    toMeet: 'Jane Doe (HR)',
    phone: '555-1234',
    entryTime: '09:30 AM',
    date: '2025-10-31'
  },
  {
    id: 2,
    name: 'Luna Zona',
    type: 'Client',
    purpose: 'Meeting',
    status: 'Out',
    company: 'Creative Minds',
    toMeet: 'Mike Ross (IT)',
    phone: '555-5678',
    entryTime: '10:15 AM',
    date: '2025-10-31'
  },
  {
    id: 3,
    name: 'Albert Manish',
    type: 'Client',
    purpose: 'Interview',
    status: 'Out',
    company: 'N/A',
    toMeet: 'Sarah Lee (Marketing)',
    phone: '555-9012',
    entryTime: '11:00 AM',
    date: '2025-10-31'
  },
  {
    id: 4,
    name: 'Robert Smith',
    type: 'Interview',
    purpose: 'Interview',
    status: 'In',
    company: 'N/A',
    toMeet: 'Admin',
    phone: '555-3456',
    entryTime: '02:30 PM',
    date: '2025-10-31'
  },
];

const VLOG = () => {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const toggleVisitorStatus = (id) => {
    setVisitors(currentVisitors =>
      currentVisitors.map(visitor =>
        visitor.id === id 
          ? { ...visitor, status: visitor.status === 'In' ? 'Out' : 'In' } 
          : visitor
      )
    );
  };

  const handleShowInfo = (visitor) => {
    setSelectedVisitor(visitor);
  };

  const handleCloseModal = () => {
    setSelectedVisitor(null);
  };

  const stats = {
    total: visitors.length,
    checkedIn: visitors.filter(v => v.status === 'In').length,
    checkedOut: visitors.filter(v => v.status === 'Out').length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Visitor Management System</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage visitor check-ins and check-outs</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-8">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total Visitors</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">{stats.total}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Checked In</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">{stats.checkedIn}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Checked Out</div>
            <div className="text-2xl font-semibold text-gray-800 mt-1">{stats.checkedOut}</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Visitor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">To Meet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Entry Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleShowInfo(visitor)}
                      className="text-gray-900 font-medium hover:text-blue-600 transition-colors"
                    >
                      {visitor.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visitor.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visitor.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visitor.toMeet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{visitor.entryTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                      visitor.status === 'In' 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}>
                      {visitor.status === 'In' ? 'Checked In' : 'Checked Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleVisitorStatus(visitor.id)}
                      className={`px-4 py-2 text-sm font-medium rounded border transition-colors ${
                        visitor.status === 'In'
                          ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {visitor.status === 'In' ? 'Check Out' : 'Check In'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visitor Info Modal */}
      {selectedVisitor && (
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
              <h3 className="text-lg font-semibold text-gray-800">Visitor Details</h3>
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
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Name</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.name}</p>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                    selectedVisitor.status === 'In' 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}>
                    {selectedVisitor.status}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Type</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.type}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Purpose</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.purpose}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Company</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.company}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">To Meet</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.toMeet}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Phone</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.phone}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Entry Time</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.entryTime}</p>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Date</label>
                  <p className="text-sm text-gray-900">{selectedVisitor.date}</p>
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
              <button
                onClick={() => {
                  toggleVisitorStatus(selectedVisitor.id);
                  const updated = visitors.find(v => v.id === selectedVisitor.id);
                  setSelectedVisitor({...updated, status: updated.status === 'In' ? 'Out' : 'In'});
                }}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                  selectedVisitor.status === 'In'
                    ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    : 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                }`}
              >
                {selectedVisitor.status === 'In' ? 'Check Out' : 'Check In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VLOG;