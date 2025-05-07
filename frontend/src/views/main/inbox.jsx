import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faInbox, faPlusCircle, faPaperPlane, faFilter, faCog, faExclamationTriangle, faBullhorn, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';

// Mock data (consider moving to a separate file if it grows)
const petRequestsData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contactNumber: '123-456-7890', address: '123 Main St', requestStatus: 'Pending', petName: 'Buddy', petTags: ['dog', 'friendly'], message: 'I would love to adopt Buddy!', dateRequested: '2024-07-24', inboxViewStatus: 'unread' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contactNumber: '987-654-3210', address: '456 Oak Ave', requestStatus: 'Approved', petName: 'Whiskers', petTags: ['cat', 'playful'], message: 'Whiskers seems like a great fit for my family.', dateRequested: '2024-07-23', inboxViewStatus: 'read' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', contactNumber: '555-123-4567', address: '789 Pine Ln', requestStatus: 'Rejected', petName: 'Rocky', petTags: ['dog', 'energetic'], message: 'I am interested in adopting Rocky.', dateRequested: '2024-07-22', inboxViewStatus: 'read' },
    { id: 4, name: 'Mary Brown', email: 'mary.brown@example.com', contactNumber: '111-222-3333', address: '101 Elm St', requestStatus: 'Completed', petName: 'Fluffy', petTags: ['cat', 'calm'], message: 'I want to adopt Fluffy.', dateRequested: '2024-07-21', inboxViewStatus: 'read' },
    { id: 5, name: 'David Wilson', email: 'david.wilson@example.com', contactNumber: '444-555-6666', address: '222 Maple Dr', requestStatus: 'Pending', petName: 'Max', petTags: ['dog', 'loyal'], message: 'I am interested in adopting Max.', dateRequested: '2024-07-20', inboxViewStatus: 'unread' },
];

const sentMessagesData = [
    { id: 1, snt_name: 'Edmark Talingting', snt_email: 'sheltera@example.com', snt_contactNumber: '555-987-6543', snt_address: '789 Shelter Rd', snt_requestStatus: 'Pending', snt_petName: 'Buddy', snt_petTags: ['dog', 'friendly'], snt_message: 'Inquiry about Buddy', snt_dateRequested: '2024-07-25', snt_dateUpdated: '2024-07-25' },
    { id: 2, snt_name: 'Jodeci Pacibe', snt_email: 'shelterb@example.com', snt_contactNumber: '555-234-5678', snt_address: '123 Rescue Ln', snt_requestStatus: 'Approved', snt_petName: 'Whiskers', snt_petTags: ['cat', 'playful'], snt_message: 'Application for Whiskers', snt_dateRequested: '2024-07-24', snt_dateUpdated: '2024-07-24' },
    { id: 2, snt_name: 'Jodeci Pacibe', snt_email: 'shelterb@example.com', snt_contactNumber: '555-234-5678', snt_address: '123 Rescue Ln', snt_requestStatus: 'Completed', snt_petName: 'PDiddy', snt_petTags: ['oil', 'baby'], snt_message: 'Application for Diddy', snt_dateRequested: '2024-07-24', snt_dateUpdated: '2024-07-24' },
];

const systemMessagesData = [
    { id: 1, sys_admin_name: 'Rexshimura', sys_message_type: 'Warning', sys_message: 'The image you posted was flagged as inappropriate. Please review our guidelines.', sys_date_sent: '2025-05-06' },
    { id: 2, sys_admin_name: 'Rexshimura', sys_message_type: 'Announcement', sys_message: 'We are excited to announce our new foster program! Learn how you can make a difference.', sys_date_sent: '2025-05-05' },
    { id: 3, sys_admin_name: 'Rexshimura', sys_message_type: 'Update', sys_message: 'System Update V3.1.2 Pre-Alpha: Bug fixes and performance improvements.', sys_date_sent: '2025-05-04' },
    { id: 4, sys_admin_name: 'Rexshimura', sys_message_type: 'System', sys_message: 'Your post was rejected due to policy violations.', sys_date_sent: '2025-05-04' },
    { id: 5, sys_admin_name: 'Rexshimura', sys_message_type: 'System', sys_message: 'Your post was approved and is now live.', sys_date_sent: '2025-05-04' },
    { id: 6, sys_admin_name: 'Rexshimura', sys_message_type: 'System', sys_message: 'Your post was deleted by the administrator.', sys_date_sent: '2025-05-04' },
    { id: 7, sys_admin_name: 'Petmosphere', sys_message_type: 'System', sys_message: 'Welcome to Petmosphere! Were so happy to have you join our community of pet lovers.', sys_date_sent: '2025-05-07' }
];

// Helper function for status badges (reused)
const getStatusBadge = (status) => {
    let badgeClasses = "px-2 py-1 rounded text-xs font-semibold";
    switch (status) {
        case 'Pending':
            badgeClasses += " text-yellow-700 bg-yellow-100 border border-yellow-300";
            return <div className={badgeClasses}>Pending</div>;
        case 'Approved':
            badgeClasses += " text-green-700 bg-green-100 border border-green-300";
            return <div className={badgeClasses}>Approved</div>;
        case 'Rejected':
            badgeClasses += " text-red-700 bg-red-100 border border-red-300";
            return <div className={badgeClasses}>Rejected</div>;
        case 'Completed':
            badgeClasses += " text-blue-500 bg-blue-100 border border-blue-300";
            return <div className={badgeClasses}>Completed</div>;
        default:
            badgeClasses += " text-gray-500 bg-gray-100 border border-gray-300";
            return <div className={badgeClasses}>Unknown</div>;
    }
};

// Helper function for system message type badges
const getSystemMessageBadge = (type) => {
    let badgeClasses = "px-2 py-1 rounded text-xs font-semibold";
    switch (type) {
        case 'Warning':
            badgeClasses += " text-red-700 bg-red-100 border border-red-300";
            return <div className={badgeClasses}><FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" /> Warning</div>;
        case 'Announcement':
            badgeClasses += " text-blue-700 bg-blue-100 border border-blue-300";
            return <div className={badgeClasses}><FontAwesomeIcon icon={faBullhorn} className="mr-1" /> Announcement</div>;
        case 'Update':
            badgeClasses += " text-yellow-700 bg-yellow-100 border border-yellow-300";
            return <div className={badgeClasses}><FontAwesomeIcon icon={faSyncAlt} className="mr-1" /> Update</div>;
        default:
            badgeClasses += " text-gray-500 bg-gray-100 border border-gray-300";
            return <div className={badgeClasses}>System</div>;
    }
};

const InboxPage = () => {
    const [activeTab, setActiveTab] = useState('Inbox');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [modalStatus, setModalStatus] = useState('');
    const [messages, setMessages] = useState(petRequestsData);
    const [sentMessages, setSentMessages] = useState(sentMessagesData);
    const [systemMessages, setSystemMessages] = useState(systemMessagesData);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedMessage(null);
        setFilterStatus(''); // Reset filter when tab changes
    };

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        if (activeTab === 'Inbox') {
            setModalStatus(message.requestStatus);
            if (message.inboxViewStatus === 'unread') {
                setMessages(prevMessages =>
                    prevMessages.map(m =>
                        m.id === message.id ? { ...m, inboxViewStatus: 'read' } : m
                    )
                );
            }
        } else if (activeTab === 'Sent') {
            setModalStatus(message.snt_requestStatus);
        } else if (activeTab === 'System') {
            // No specific modal status for system messages yet
        }
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    const handleSaveStatus = () => {
        if (selectedMessage && activeTab === 'Inbox') {
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === selectedMessage.id ? { ...msg, requestStatus: modalStatus } : msg
                )
            );
        }
        setSelectedMessage(null);
    };

    const filteredMessages = filterStatus
        ? messages.filter(message => message.requestStatus === filterStatus)
        : messages;

    const filteredSentMessages = filterStatus
        ? sentMessages.filter(message => message.snt_requestStatus === filterStatus)
        : sentMessages;

    // No filter for system messages for now, can be added later if needed pero kamo nalang butang hahaha
    const filteredSystemMessages = systemMessages;

    const renderMessageList = (messageList, tab) => {
        if (!messageList || messageList.length === 0) {
            return <p className="text-gray-700">No {tab.toLowerCase()} messages to display.</p>;
        }

        return (
            <ul className="space-y-2">
                {messageList.map((message) => (
                    <li
                        key={message.id}
                        className={`bg-white border rounded-md shadow-sm p-3 cursor-pointer transition-colors duration-200 ${selectedMessage?.id === message.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        onClick={() => handleMessageClick(message)}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {tab === 'Inbox' && (
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className={`text-lg ${message.inboxViewStatus === 'unread' ? 'text-purple-600' : 'text-gray-500'}`}
                                    />
                                )}
                                {tab === 'Sent' && (
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-lg text-blue-600" />
                                )}
                                {tab === 'System' && (
                                    <FontAwesomeIcon icon={faCog} className="text-lg text-gray-700" />
                                )}
                                <span className="font-semibold text-gray-800">
                                    {tab === 'Inbox' ? message.name : tab === 'Sent' ? message.snt_name : message.sys_admin_name}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {tab === 'Inbox' ? message.dateRequested : tab === 'Sent' ? message.snt_dateRequested : message.sys_date_sent}
                            </span>
                        </div>
                        <p className="text-gray-700 truncate">
                            {tab === 'Inbox'
                                ? `${message.petName} - ${message.message}`
                                : tab === 'Sent'
                                    ? `${message.snt_petName} - ${message.snt_message}`
                                    : message.sys_message}
                        </p>
                        <div className="mt-1">
                            {tab === 'Inbox' && getStatusBadge(message.requestStatus)}
                            {tab === 'Sent' && getStatusBadge(message.snt_requestStatus)}
                            {tab === 'System' && getSystemMessageBadge(message.sys_message_type)}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Inbox':
                return (
                    <>
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
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Total:</span> {messages.length} |
                                <span className="font-semibold text-yellow-700"> Pending:</span> {messages.filter(m => m.requestStatus === 'Pending').length} |
                                <span className="font-semibold text-green-700"> Approved:</span> {messages.filter(m => m.requestStatus === 'Approved').length} |
                                <span className="font-semibold text-red-700"> Rejected:</span> {messages.filter(m => m.requestStatus === 'Rejected').length} |
                                <span className="font-semibold text-blue-500"> Completed:</span> {messages.filter(m => m.requestStatus === 'Completed').length}
                            </div>
                        </div>
                        {renderMessageList(filteredMessages, 'Inbox')}
                    </>
                );
            case 'Sent':
                return (
                    <>
                        <div className="mb-4 flex justify-between items-center">
                            <div className="relative inline-block">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option value="">All Messages</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FontAwesomeIcon icon={faFilter} className="ml-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Total:</span> {sentMessages.length} |
                                <span className="font-semibold text-yellow-700"> Pending:</span> {sentMessages.filter(m => m.snt_requestStatus === 'Pending').length} |
                                <span className="font-semibold text-green-700"> Approved:</span> {sentMessages.filter(m => m.snt_requestStatus === 'Approved').length} |
                                <span className="font-semibold text-red-700"> Rejected:</span> {sentMessages.filter(m => m.snt_requestStatus === 'Rejected').length} |
                                <span className="font-semibold text-blue-500"> Completed:</span> {sentMessages.filter(m => m.snt_requestStatus === 'Completed').length}
                            </div>
                        </div>
                        {renderMessageList(filteredSentMessages, 'Sent')}
                    </>
                );
            case 'System':
                return (
                    <>
                        <div className="mb-4 flex justify-end">
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Total:</span> {systemMessages.length}
                            </div>
                        </div>
                        {renderMessageList(filteredSystemMessages, 'System')}
                    </>
                );
            default:
                return null;
        }
    };

    const [windowWidth, setWindowWidth] = useState(0);

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

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <Inner_Header />
            </div>

            <ScrollToTopButton />

            <div className="bg-gray-100 mt-20 min-h-screen animate__animated animate__fadeIn">
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
                                    Received
                                </button>
                                <button
                                    onClick={() => handleTabChange('Sent')}
                                    className={`${activeTab === 'Sent'
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
                                    Sent
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
                        {renderTabContent()}
                    </div>
                </div>
            </div>

            {selectedMessage && (
                <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[80vh]">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {activeTab === 'Inbox'
                                        ? `${selectedMessage.petName} - Adoption Request`
                                        : activeTab === 'Sent'
                                            ? `${selectedMessage.snt_petName} - Message Details`
                                            : `${selectedMessage.sys_message_type} - System Notification`}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {activeTab === 'Inbox'
                                        ? `Requested By: ${selectedMessage.name} | ${selectedMessage.dateRequested}`
                                        : activeTab === 'Sent'
                                            ? `Sent To: ${selectedMessage.snt_name} | ${selectedMessage.snt_dateRequested}`
                                            : `Sent On: ${selectedMessage.sys_date_sent}`}
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
                            {activeTab === 'Inbox' ? (
                                <>
                                    <p><span className="font-semibold">Name:</span> {selectedMessage.name}</p>
                                    <p><span className="font-semibold">Email:</span> {selectedMessage.email}</p>
                                    <p><span className="font-semibold">Contact Number:</span> {selectedMessage.contactNumber}</p>
                                    <p><span className="font-semibold">Address:</span> {selectedMessage.address}</p>
                                    <p><span className="font-semibold">Request Status:</span> {getStatusBadge(selectedMessage.requestStatus)}</p>
                                    <p><span className="font-semibold">Pet Name:</span> {selectedMessage.petName}</p>
                                    <p><span className="font-semibold">Pet Tags:</span> {selectedMessage.petTags.join(', ')}</p>
                                    <p><span className="font-semibold">Message:</span></p>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pb-5">{selectedMessage.message}</p>
                                    <p className="text-gray-800 text-sm mb-2 leading-relaxed whitespace-pre-line">Your Request Response:</p>
                                </>
                            ) : activeTab === 'Sent' ? (
                                <>
                                    <p><span className="font-semibold">Name:</span> {selectedMessage.snt_name}</p>
                                    <p><span className="font-semibold">Email:</span> {selectedMessage.snt_email}</p>
                                    <p><span className="font-semibold">Contact Number:</span> {selectedMessage.snt_contactNumber}</p>
                                    <p><span className="font-semibold">Address:</span> {selectedMessage.snt_address}</p>
                                    <p><span className="font-semibold">Request Status:</span> {getStatusBadge(selectedMessage.snt_requestStatus)}</p>
                                    <p><span className="font-semibold">Pet Name:</span> {selectedMessage.snt_petName}</p>
                                    <p><span className="font-semibold">Pet Tags:</span> {selectedMessage.snt_petTags.join(', ')}</p>
                                    <p><span className="font-semibold">Message:</span></p>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pb-5">{selectedMessage.snt_message}</p>
                                    <p><span className="font-semibold">Date Sent:</span> {selectedMessage.snt_dateRequested}</p>
                                    <p><span className="font-semibold">Last Updated:</span> {selectedMessage.snt_dateUpdated}</p>
                                    { selectedMessage.snt_requestStatus === 'Completed' && (
                                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-sm transition-colors">
                                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add Review
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p><span className="font-semibold">Admin:</span> {selectedMessage.sys_admin_name}</p>
                                    <p><span className="font-semibold">Type:</span> {getSystemMessageBadge(selectedMessage.sys_message_type)}</p>
                                    <p><span className="font-semibold">Message:</span></p>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pb-5">{selectedMessage.sys_message}</p>
                                    <p><span className="font-semibold">Date Sent:</span> {selectedMessage.sys_date_sent}</p>
                                </>
                            )}
                        </div>
                        <div className="mt-4 flex justify-end gap-2 flex-col items-end">
                            {activeTab === 'Inbox' && (
                                <>
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
                                </>
                            )}
                            {activeTab === 'Sent' && (
                                <button
                                    onClick={handleCloseMessage}
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow-md text-sm w-full sm:w-auto"
                                >
                                    Done
                                </button>
                            )}
                            {activeTab === 'System' && (
                                <button
                                    onClick={handleCloseMessage}
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow-md text-sm w-full sm:w-auto"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InboxPage;