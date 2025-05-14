import React, { useState, useEffect } from 'react';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faInbox, faPaperPlane, faFilter, faListAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import petRequestsData from '../../data/petRequestsData.jsx';
import yourRequestsData from '../../data/yourRequestsData.jsx';
import adminNotifData from '../../data/adminNotifData.jsx';

export function meta() {
  return [
    { title: "( ✦ ) PETMOSPHERE - INBOX" },
    { name: "description", content: "View and manage adoption requests." },
  ];
}

// Helper function for status badges
const getStatusBadge = (status) => {
  let badgeClasses = "px-2 py-1 rounded text-xs font-semibold";
  switch (status) {
    case 'Pending':
      badgeClasses = (badgeClasses, "text-yellow-700 bg-yellow-100 border border-yellow-300");
      return <div className={badgeClasses}>Pending</div>;
    case 'Approved':
      badgeClasses = (badgeClasses, "text-green-700 bg-green-100 border border-green-300");
      return <div className={badgeClasses}>Approved</div>;
    case 'Rejected':
      badgeClasses = (badgeClasses, "text-red-700 bg-red-100 border border-red-300");
      return <div className={badgeClasses}>Rejected</div>;
    case 'Completed':
      badgeClasses = (badgeClasses, "text-blue-500 bg-blue-100 border border-blue-300");
      return <div className={badgeClasses}>Completed</div>;
    case 'Info':
      badgeClasses = (badgeClasses, "text-blue-700 bg-blue-100 border border-blue-300");
      return <div className={badgeClasses}>Info</div>;
    default:
      return null;
  }
};

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState('Inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [modalStatus, setModalStatus] = useState('Pending');
  const [windowWidth, setWindowWidth] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessages = [
      ...petRequestsData,
      ...yourRequestsData,
      ...adminNotifData,
    ];
    setMessages(allMessages);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedMessage(null);
    setFilterStatus('');
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setModalStatus(message.requestStatus);
    if (message.inboxViewStatus === 'unread' && message.type === 'received') {
      setMessages(messages.map(m =>
        m.id === message.id ? { ...m, inboxViewStatus: 'read' } : m
      ));
    }
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleSaveStatus = () => {
    if (selectedMessage) {
      setMessages(messages.map(msg =>
        msg.id === selectedMessage.id ? { ...msg, requestStatus: modalStatus } : msg
      ));
    }
    setSelectedMessage(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  const filteredMessages = (tab) => {
    let currentMessages = messages;
    switch (tab) {
      case 'Inbox':
        currentMessages = currentMessages.filter(m => m.type === 'received');
        break;
      case 'Your Requests':
        currentMessages = currentMessages.filter(m => m.type === 'your-requests');
        break;
      case 'System':
        currentMessages = currentMessages.filter(m => m.type === 'system');
        break;
      default:
        break;
    }

    return filterStatus
      ? currentMessages.filter(message => message.requestStatus === filterStatus)
      : currentMessages;
  };

  const renderMessageList = (messageList) => {
    if (!messageList || messageList.length === 0) {
      return <p className="text-gray-700">No messages to display.</p>;
    }

    return (
      <ul className="space-y-2">
        {messageList.map((message) => {
          const statusBadge = getStatusBadge(message.requestStatus);
          return (
            <li
              key={message.id}
              className={`bg-white border rounded-md shadow-sm p-3 cursor-pointer transition-colors duration-200 ${selectedMessage?.id === message.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              onClick={() => handleMessageClick(message)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {activeTab === 'Inbox' ? (
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={`text-lg ${message.inboxViewStatus === 'unread' ? 'text-purple-600' : 'text-gray-500'}`}
                    />
                  ) : activeTab === 'Your Requests' ? (
                    <FontAwesomeIcon icon={faListAlt} className="text-lg text-blue-600" />
                  ) : (
                    <FontAwesomeIcon icon={faCog} className="text-lg text-gray-700" />
                  )}
                  <span className="font-semibold text-gray-800">
                    {activeTab === 'Inbox'
                      ? message.requestorName
                      : activeTab === 'Your Requests'
                        ? `To: ${message.yourName}`
                        : message.adminName}
                  </span>
                </div>
                <span className={`text-sm ${message.inboxViewStatus === 'unread' && activeTab === 'Inbox' ? 'text-purple-600' : 'text-gray-500'}`}>
                  {activeTab === 'Inbox' ? message.dateRequested :
                    activeTab === 'Your Requests' ? message.yourDateRequested :
                      message.adminDateNotified}
                </span>
              </div>
              <p className="text-gray-700 truncate">
                {activeTab === 'Inbox' ? `${message.requestedPetName} - ${message.requestorMessage}` :
                  activeTab === 'Your Requests' ? message.yourRequestMessage :
                    message.adminMessage}
              </p>
              {statusBadge && <div className="mt-1">{statusBadge}</div>}
              {message.type === 'system' && message.reason && (
                <p className="text-gray-600 text-sm">Reason: {message.reason}</p>
              )}
              {message.type === 'system' && message.adminNotificationType && (
                <p className="text-gray-600 text-sm">Type: {message.adminNotificationType}</p>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Inbox':
        return renderMessageList(filteredMessages('Inbox'));
      case 'Your Requests':
        return renderMessageList(filteredMessages('Your Requests'));
      case 'System':
        return renderMessageList(filteredMessages('System'));
      default:
        return null;
    }
  };

  // Calculate status counts for Inbox only
  const inboxMessages = messages.filter(m => m.type === 'received');
  const pendingCount = inboxMessages.filter(m => m.requestStatus === 'Pending').length;
  const approvedCount = inboxMessages.filter(m => m.requestStatus === 'Approved').length;
  const rejectedCount = inboxMessages.filter(m => m.requestStatus === 'Rejected').length;
  const completedCount = inboxMessages.filter(m => m.requestStatus === 'Completed').length;
  const totalCount = inboxMessages.length;

  return (
    <>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
        <Inner_Header />
      </div>

      <ScrollToTopButton />

      <div className="bg-gray-100 mt-20 min-h-screen animate__animated animate__fadeIn">
        {/* Hero Section */}
        <section
          className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
          style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
        >
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">My Inbox</h1>
            <p className="text-lg max-w-2xl mx-auto">
              View and manage your adoption requests and system notifications.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-10">
          <div className="bg-white shadow-md border rounded-lg p-6 max-w-3xl mx-auto animate__animated animate__fadeInUp">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-4">
                <button
                  onClick={() => handleTabChange('Inbox')}
                  className={`${activeTab === 'Inbox'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <FontAwesomeIcon icon={faInbox} className="mr-1" />
                  Inbox
                </button>
                <button
                  onClick={() => handleTabChange('Your Requests')}
                  className={`${activeTab === 'Your Requests'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <FontAwesomeIcon icon={faListAlt} className="mr-1" />
                  Your Requests
                </button>
                <button
                  onClick={() => handleTabChange('System')}
                  className={`${activeTab === 'System'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <FontAwesomeIcon icon={faCog} className="mr-1" />
                  System
                </button>
              </nav>
            </div>

            {(activeTab === 'Inbox' || activeTab === 'Your Requests') && (
              <div className="mb-4 flex justify-between items-center">
                <div className="relative inline-block">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">All Requests</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FontAwesomeIcon icon={faFilter} className="ml-2 text-gray-500" />
                  </div>
                </div>
                {activeTab === 'Inbox' && (
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Total:</span> {totalCount} |
                    <span className="font-semibold text-yellow-700"> Pending:</span> {pendingCount} |
                    <span className="font-semibold text-green-700"> Approved:</span> {approvedCount} |
                    <span className="font-semibold text-red-700"> Rejected:</span> {rejectedCount} |
                    <span className="font-semibold text-blue-500"> Completed:</span> {completedCount}
                  </div>
                )}
              </div>
            )}

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedMessage.requestedPetName || selectedMessage.yourRequestedPetName || selectedMessage.adminName}{" - "}
                  {selectedMessage.type === 'system' ? 'Notification' :
                    selectedMessage.type === 'your-requests' ? 'Your Request' : 'Adoption Request'}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedMessage.type !== 'system' &&
                    (selectedMessage.type === 'received'
                      ? `Requested By: ${selectedMessage.requestorName} | ${selectedMessage.dateRequested}`
                      : `Date: ${selectedMessage.yourDateRequested || selectedMessage.adminDateNotified}`
                    )}
                  {selectedMessage.type === 'system' && `Date: ${selectedMessage.adminDateNotified}`}
                </p>
              </div>
              <button
                onClick={handleCloseMessage}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2 text-gray-800">
              {selectedMessage.type === 'received' && (
                <>
                  <p><span className="font-semibold">Name:</span> {selectedMessage.requestorName}</p>
                  <p><span className="font-semibold">Email:</span> {selectedMessage.requestorEmail}</p>
                  <p><span className="font-semibold">Contact Number:</span> {selectedMessage.requestorContactNumber}</p>
                  <p><span className="font-semibold">Address:</span> {selectedMessage.requestorAddress}</p>
                </>
              )}
              {selectedMessage.type === 'your-requests' && (
                <p><span className="font-semibold">To:</span> {selectedMessage.yourName}</p>
              )}
              {selectedMessage.type === 'system' && (
                <p><span className="font-semibold">Admin:</span> {selectedMessage.adminName}</p>
              )}

              <p><span className="font-semibold">
                {(selectedMessage.type === 'system' || selectedMessage.type === 'your-requests')
                  ? 'Status:'
                  : 'Request Status:'}
              </span>
                {getStatusBadge(selectedMessage.requestStatus) || "N/A"}
              </p>
              {selectedMessage.type !== 'system' && <p><span className="font-semibold">Pet Name:</span> {selectedMessage.requestedPetName || selectedMessage.yourRequestedPetName}</p>}
              {selectedMessage.type !== 'system' && <p><span className="font-semibold">Pet Tags:</span> {selectedMessage.requestedPetTag || selectedMessage.yourRequestedPetTag.join(', ')}</p>}
              <p><span className="font-semibold">Message:</span></p>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line pb-5">{selectedMessage.requestorMessage || selectedMessage.yourRequestMessage || selectedMessage.adminMessage}</p>
              {selectedMessage.type === 'received' && (
                <>
                  <p className="text-gray-800 text-sm mb-2 leading-relaxed whitespace-pre-line">Your Request Response:</p>
                </>
              )}
              {selectedMessage.type === 'system' && selectedMessage.reason && (
                <p><span className="font-semibold">Reason:</span> {selectedMessage.reason}</p>
              )}
              {selectedMessage.type === 'system' && selectedMessage.adminNotificationType && (
                <p><span className="font-semibold">Type:</span> {selectedMessage.adminNotificationType}</p>
              )}
            </div>
            {/* Add Reply/Forward/Delete buttons here if needed */}
            {selectedMessage.type === 'received' && (
              <div className="mt-4 flex justify-end gap-2 flex-col items-end">
                <div className="relative inline-block w-full mb-2">
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value)}
                    className={`block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm
                                                ${['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)
                      ? 'text-gray-400'
                      : 'text-gray-700'
                      }`}
                    disabled={['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)) {
                      handleCloseMessage();
                    } else {
                      handleSaveStatus();
                    }
                  }}
                  className={`bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow-md text-sm w-full sm:w-auto
                                                ${['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)
                      ? 'bg-gray-400 text-white cursor-pointer'
                      : 'bg-purple-500 hover:bg-purple-700 text-white'
                      }`}

                >
                  {['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)
                    ? 'Done'
                    : 'Save'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InboxPage;


{ !isMyAcc && (
    <button
        onClick={handleOpenAddReview}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-sm transition-colors"
    >
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add Review
    </button>
)}