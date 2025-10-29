import React, { useState } from 'react';
import { Search, User, Mail, Phone, Calendar, Clock, MapPin } from 'lucide-react';

const VL = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Sample visitor data - replace with your actual data
  const visitors = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 234-567-8900',
      company: 'Tech Corp',
      purpose: 'Business Meeting',
      visitDate: '2025-10-28',
      visitTime: '10:30 AM',
      location: 'Building A, Floor 3'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 234-567-8901',
      company: 'Design Studio',
      purpose: 'Project Discussion',
      visitDate: '2025-10-29',
      visitTime: '2:00 PM',
      location: 'Building B, Floor 2'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1 234-567-8902',
      company: 'Innovation Labs',
      purpose: 'Product Demo',
      visitDate: '2025-10-30',
      visitTime: '11:00 AM',
      location: 'Building A, Floor 1'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '+1 234-567-8903',
      company: 'Marketing Plus',
      purpose: 'Consultation',
      visitDate: '2025-10-30',
      visitTime: '3:30 PM',
      location: 'Building C, Floor 4'
    },
    {
      id: 5,
      name: 'David Kumar',
      email: 'david.k@email.com',
      phone: '+1 234-567-8904',
      company: 'Finance Group',
      purpose: 'Contract Review',
      visitDate: '2025-10-31',
      visitTime: '9:00 AM',
      location: 'Building A, Floor 5'
    }
  ];

  // Filter visitors based on search term
  const filteredVisitors = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Visitor List</h1>
        
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, company, purpose, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Visitor List */}
        <div className="space-y-3">
          {filteredVisitors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No visitors found matching your search.</p>
            </div>
          ) : (
            filteredVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                {/* Visitor Card */}
                <div
                  onClick={() => toggleExpand(visitor.id)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{visitor.name}</h3>
                        <p className="text-sm text-gray-600">{visitor.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{visitor.visitDate}</p>
                      <p className="text-sm text-gray-500">{visitor.visitTime}</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === visitor.id && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Mail size={18} className="text-gray-400" />
                      <span className="text-sm">{visitor.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Phone size={18} className="text-gray-400" />
                      <span className="text-sm">{visitor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Calendar size={18} className="text-gray-400" />
                      <span className="text-sm">Purpose: {visitor.purpose}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Clock size={18} className="text-gray-400" />
                      <span className="text-sm">{visitor.visitDate} at {visitor.visitTime}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <MapPin size={18} className="text-gray-400" />
                      <span className="text-sm">{visitor.location}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VL;