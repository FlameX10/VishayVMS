import React, { useState } from 'react';

// --- Mock Data ---
// This data simulates what would come from your database or API.
const initialVisitors = [
  {
    id: 1,
    name: 'Alice Smith',
    mobile: '555-1234',
    company: 'Tech Solutions Inc.',
    purpose: 'Business Meeting',
    visitorType: 'Client',
    category: 'Scheduled',
    idProofType: 'Driver\'s License',
    idProofUrl: '/path/to/id-proof-alice.pdf',
    status: 'Pending', // 'Pending', 'Verified', 'Time Allotted', 'Completed'
    allottedTime: null,
  },
  {
    id: 2,
    name: 'Bob Johnson',
    mobile: '555-5678',
    company: 'Marketing Co.',
    purpose: 'Interview',
    visitorType: 'Candidate',
    category: 'Walk-in',
    idProofType: 'Passport',
    idProofUrl: '/path/to/id-proof-bob.jpg',
    status: 'Pending',
    allottedTime: null,
  },
  {
    id: 3,
    name: 'Charlie Brown',
    mobile: '555-8765',
    company: 'Logistics LLC',
    purpose: 'Delivery',
    visitorType: 'Vendor',
    category: 'Scheduled',
    idProofType: 'National ID',
    idProofUrl: '/path/to/id-proof-charlie.png',
    status: 'Time Allotted',
    allottedTime: '2025-11-05T14:30',
  },
];

const initialHostRequests = [
  {
    id: 101,
    hostName: 'David Lee',
    hostEmail: 'david.lee@company.com',
    visitorName: 'Alice Smith', // This links to the visitor
    visitorCompany: 'Tech Solutions Inc.',
    extraInfo: 'Meeting in Conference Room A. Please expedite entry.',
    status: 'Pending', // 'Pending', 'Approved'
  },
  {
    id: 102,
    hostName: 'Emily White',
    hostEmail: 'emily.white@company.com',
    visitorName: 'Bob Johnson',
    visitorCompany: 'Marketing Co.',
    extraInfo: 'Interview for Marketing Manager position. Scheduled for 2 PM, but visitor arrived early.',
    status: 'Approved',
  },
  {
    id: 103,
    hostName: 'Frank G',
    hostEmail: 'frank.g@company.com',
    visitorName: 'New Client XYZ',
    visitorCompany: 'Client Co.',
    extraInfo: 'Unscheduled visit, I was not notified. Please check.',
    status: 'Pending',
  },
];

// --- SVG Icons ---
// Using inline SVGs for portability

const IconUser = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const IconBriefcase = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconX = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconCheckCircle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconClock = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconMail = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconAlertCircle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconInfo = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// --- Reusable Components ---

/**
 * A reusable modal component
 */
const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col m-4">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * A reusable confirmation modal
 */
const ConfirmationModal = ({ show, onClose, onConfirm, title, message, confirmText = "Confirm", icon = "alert" }) => {
  if (!show) return null;

  const Icon = icon === 'alert' ? 
    () => <IconAlertCircle className="w-12 h-12 text-red-500" /> : 
    () => <IconCheckCircle className="w-12 h-12 text-blue-500" />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Icon />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-6">{message}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-6 py-2 rounded-md text-sm font-medium text-white transition-all ${
                icon === 'alert' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * A simple notification toast
 */
const Notification = ({ message, type, onDismiss }) => {
  const baseClasses = "fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };
  const Icon = {
    success: () => <IconCheckCircle className="w-5 h-5 text-green-600" />,
    error: () => <IconAlertCircle className="w-5 h-5 text-red-600" />,
    info: () => <IconInfo className="w-5 h-5 text-blue-600" />,
  }[type];

  React.useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <Icon />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onDismiss} className="ml-auto -mr-1 p-1 rounded-full hover:bg-black/10">
        <IconX className="w-4 h-4" />
      </button>
    </div>
  );
};

/**
 * Renders the status badge
 */
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Approved: 'bg-green-100 text-green-800',
    Verified: 'bg-blue-100 text-blue-800',
    'Time Allotted': 'bg-indigo-100 text-indigo-800',
    Completed: 'bg-gray-100 text-gray-800',
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
    >
      {status}
    </span>
  );
};

/**
 * Main Visitor Registration (VR) Component
 */
const VR = () => {
  const [activeTab, setActiveTab] = useState('visitors'); // 'visitors' or 'hosts'
  
  // Data states
  const [visitors, setVisitors] = useState(initialVisitors);
  const [hostRequests, setHostRequests] = useState(initialHostRequests);
  
  // Modal states
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [selectedHostRequest, setSelectedHostRequest] = useState(null);
  const [showHostInfoModal, setShowHostInfoModal] = useState(false);
  const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
  const [showTimeAllotModal, setShowTimeAllotModal] = useState(false);
  const [showMailConfirm, setShowMailConfirm] = useState(false);
  
  // Other UI states
  const [notification, setNotification] = useState(null); // { message, type }
  const [allottedTime, setAllottedTime] = useState('');

  // --- Handlers ---

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const handleApproveHostRequest = (requestId) => {
    setHostRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'Approved' } : req
      )
    );
    showNotification('Host request approved successfully.', 'success');
  };

  const handleOpenVisitorDetails = (visitor) => {
    setSelectedVisitor(visitor);
  };
  
  const handleCloseVisitorDetails = () => {
    setSelectedVisitor(null);
    setShowVerifyConfirm(false);
    setShowTimeAllotModal(false);
    setShowMailConfirm(false);
    setAllottedTime('');
  };

  const handleOpenHostInfo = (request) => {
    setSelectedHostRequest(request);
    setShowHostInfoModal(true);
  };

  const handleVerifyVisitor = () => {
    // Check if a matching host request is approved
    const matchingHostRequest = hostRequests.find(
      req => req.visitorName.toLowerCase() === selectedVisitor.name.toLowerCase() &&
             req.visitorCompany.toLowerCase() === selectedVisitor.company.toLowerCase()
    );

    if (matchingHostRequest && matchingHostRequest.status === 'Approved') {
      setShowVerifyConfirm(true);
    } else {
      showNotification('Matching host request is not approved yet.', 'error');
    }
  };

  const confirmVerifyVisitor = () => {
    setVisitors(prevVisitors =>
      prevVisitors.map(v =>
        v.id === selectedVisitor.id ? { ...v, status: 'Verified' } : v
      )
    );
    setSelectedVisitor(prev => ({ ...prev, status: 'Verified' }));
    setShowVerifyConfirm(false);
    setShowTimeAllotModal(true); // Open time allot modal right after
    showNotification('Visitor verified. Please allot time.', 'success');
  };

  const handleAllotTime = (e) => {
    e.preventDefault();
    if (!allottedTime) {
      showNotification('Please select a valid time.', 'error');
      return;
    }
    
    setVisitors(prevVisitors =>
      prevVisitors.map(v =>
        v.id === selectedVisitor.id ? { ...v, status: 'Time Allotted', allottedTime } : v
      )
    );
    setSelectedVisitor(prev => ({ ...prev, status: 'Time Allotted', allottedTime }));
    setShowTimeAllotModal(false);
    showNotification('Time allotted successfully.', 'success');
  };
  
  const handleSendMail = () => {
    setShowMailConfirm(true);
  };
  
  const confirmSendMail = () => {
    // Simulate sending mail and notification
    console.log(`Sending mail to visitor: ${selectedVisitor.name}`);
    console.log(`Sending notification to host dashboard`);

    setVisitors(prevVisitors =>
      prevVisitors.map(v =>
        v.id === selectedVisitor.id ? { ...v, status: 'Completed' } : v
      )
    );
    setShowMailConfirm(false);
    showNotification('Confirmation mail sent and host notified.', 'success');
    handleCloseVisitorDetails(); // Close modal after action is complete
  };

  // --- Render Functions ---

  const renderVisitorTable = () => (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Purpose</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">{visitor.name}</div>
                    <div className="text-gray-500">{visitor.mobile}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{visitor.company}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{visitor.purpose}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <StatusBadge status={visitor.status} />
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      onClick={() => handleOpenVisitorDetails(visitor)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHostRequestTable = () => (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Host Employee</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Visitor Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Visitor Company</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {hostRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">{request.hostName}</div>
                    <div className="text-gray-500">{request.hostEmail}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{request.visitorName}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{request.visitorCompany}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-3">
                    <button
                      onClick={() => handleOpenHostInfo(request)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      More Info
                    </button>
                    {request.status === 'Pending' && (
                      <button
                        onClick={() => handleApproveHostRequest(request.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderVisitorDetailsModal = () => {
    if (!selectedVisitor) return null;

    const { name, mobile, company, purpose, visitorType, category, idProofType, status, allottedTime } = selectedVisitor;

    return (
      <Modal show={!!selectedVisitor} onClose={handleCloseVisitorDetails} title="Visitor Details & Actions">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Full Name</label>
              <p className="text-sm font-semibold text-gray-900">{name}</p>
            </div>
            <div className="border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Mobile Number</label>
              <p className="text-sm text-gray-800">{mobile}</p>
            </div>
            <div className="border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Company Name</label>
              <p className="text-sm text-gray-800">{company}</p>
            </div>
            <div className="border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Purpose of Visit</label>
              <p className="text-sm text-gray-800">{purpose}</p>
            </div>
            <div className="border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Visitor Type</label>
              <p className="text-sm text-gray-800">{visitorType}</p>
            </div>
            <div className="border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Category of Visitor</label>
              <p className="text-sm text-gray-800">{category}</p>
            </div>
            <div className="col-span-1 md:col-span-2 border-b pb-2">
              <label className="text-xs font-medium text-gray-500">Identity Proof</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-800">{idProofType}</p>
                <a href="#" className="text-sm text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>
                  (View Document)
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">Admin Actions</h4>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <StatusBadge status={status} />
              </div>
              
              {status === 'Pending' && (
                <button
                  onClick={handleVerifyVisitor}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  <IconCheckCircle className="w-5 h-5" />
                  Verify Visitor
                </button>
              )}
              
              {status === 'Verified' && (
                <button
                  onClick={() => setShowTimeAllotModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                  <IconClock className="w-5 h-5" />
                  Allot Time
                </button>
              )}

              {status === 'Time Allotted' && (
                <>
                  <div className="flex items-center gap-2 p-2 bg-indigo-100 rounded-md">
                    <IconClock className="w-5 h-5 text-indigo-700" />
                    <span className="text-sm font-medium text-indigo-800">
                      Time: {new Date(allottedTime).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowTimeAllotModal(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Update Time
                  </button>
                  <button
                    onClick={handleSendMail}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all"
                  >
                    <IconMail className="w-5 h-5" />
                    Send Confirmation Mail
                  </button>
                </>
              )}
              
              {status === 'Completed' && (
                <div className="flex items-center gap-2 p-2 bg-green-100 rounded-md">
                  <IconCheckCircle className="w-5 h-5 text-green-700" />
                  <span className="text-sm font-medium text-green-800">
                    Process Completed.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  
  const renderHostInfoModal = () => (
    <Modal show={showHostInfoModal} onClose={() => setShowHostInfoModal(false)} title="Host Request - Extra Info">
      {selectedHostRequest && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500">Host</label>
            <p className="text-sm text-gray-800">{selectedHostRequest.hostName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Visitor</label>
            <p className="text-sm text-gray-800">{selectedHostRequest.visitorName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Extra Information</label>
            <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-md border border-gray-200 mt-1">
              {selectedHostRequest.extraInfo}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
  
  const renderTimeAllotModal = () => (
    <Modal show={showTimeAllotModal} onClose={() => setShowTimeAllotModal(false)} title="Allot Visitor Time">
      <form onSubmit={handleAllotTime} className="space-y-4">
        <div>
          <label htmlFor="allotTime" className="block text-sm font-medium text-gray-700 mb-1">
            Select Date and Time
          </label>
          <input
            type="datetime-local"
            id="allotTime"
            value={allottedTime}
            onChange={(e) => setAllottedTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min={new Date().toISOString().slice(0, 16)} // Set min to now
          />
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
           <button
              type="button"
              onClick={() => setShowTimeAllotModal(false)}
              className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Allot Time
            </button>
        </div>
      </form>
    </Modal>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
      {/* --- Notification Toast --- */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={() => setNotification(null)}
        />
      )}
      
      {/* --- Modals --- */}
      {renderVisitorDetailsModal()}
      {renderHostInfoModal()}
      {renderTimeAllotModal()}

      <ConfirmationModal
        show={showVerifyConfirm}
        onClose={() => setShowVerifyConfirm(false)}
        onConfirm={confirmVerifyVisitor}
        title="Verify Visitor"
        message="Are you sure you want to verify this visitor? This action cannot be undone."
        confirmText="Yes, Verify"
        icon="alert"
      />
      
      <ConfirmationModal
        show={showMailConfirm}
        onClose={() => setShowMailConfirm(false)}
        onConfirm={confirmSendMail}
        title="Send Confirmation Mail"
        message="This will send the prefabricated confirmation mail to the visitor and notify the host. Proceed?"
        confirmText="Yes, Send Mail"
        icon="check"
      />

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Visitor Management Console</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and process visitor registrations and host requests.
          </p>
        </div>
        
        {/* --- Tabs --- */}
        <div className="px-6 md:px-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === 'visitors'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <IconUser className="w-5 h-5" />
              Visitor Registrations
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'visitors' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {visitors.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('hosts')}
              className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                activeTab === 'hosts'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <IconBriefcase className="w-5 h-5" />
              Host Employee Requests
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'hosts' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {hostRequests.length}
              </span>
            </button>
          </nav>
        </div>
        
        {/* --- Tab Content --- */}
        <div className="p-6 md:p-8">
          {activeTab === 'visitors' ? renderVisitorTable() : renderHostRequestTable()}
        </div>
      </div>

      {/* Adding some custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default VR;
