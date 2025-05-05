import React, { useState, useEffect } from 'react';
import Inner_Footer from '../../components/inner_footer';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faInbox, faPaperPlane, faFilter } from '@fortawesome/free-solid-svg-icons'; // Added icons
// import { Button } from '@/components/ui/button';  //Removed
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" //Removed

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
        default:
            badgeClasses = (badgeClasses, "text-gray-500 bg-gray-100 border border-gray-300");
            return <div className={badgeClasses}>Unknown</div>;
    }
};

const InboxPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            contactNumber: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            dateRequested: '2024-07-28',
            requestStatus: 'Pending',
            petName: 'Fluffy',
            petTags: ['Dog', 'Friendly', 'Medium'],
            message: 'Hello, I am interested in adopting the pet you posted.',
            inboxViewStatus: 'unread',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            contactNumber: '987-654-3210',
            address: '456 Oak Ave, Someville, USA',
            dateRequested: '2024-07-27',
            requestStatus: 'Approved',
            petName: 'Buddy',
            petTags: ['Cat', 'Calm', 'Small'],
            message: 'Hello, I am interested in adopting the pet you posted.',
            inboxViewStatus: 'read',
        },
        {
            id: 3,
            name: 'Peter Jones',
            email: 'peter.jones@example.com',
            contactNumber: '555-123-4567',
            address: '789 Pine Ln, Othertown, USA',
            dateRequested: '2024-07-26',
            requestStatus: 'Rejected',
            petName: 'Rocky',
            petTags: ['Dog', 'Energetic', 'Large'],
            message: 'Hello, I am interested in adopting the pet you posted.',
            inboxViewStatus: 'read',
        },
        {
            id: 4,
            name: 'Mary Brown',
            email: 'mary.brown@example.com',
            contactNumber: '111-222-3333',
            address: '321 Cedar Rd, YetAnotherTown, USA',
            dateRequested: '2024-07-28',
            requestStatus: 'Pending',
            petName: 'Whiskers',
            petTags: ['Cat', 'Playful', 'Medium'],
            message: 'Hello, I am interested in adopting the pet you posted.',
            inboxViewStatus: 'unread'
        },
        {
            id: 5,
            name: 'Robert Miller',
            email: 'robert.miller@example.com',
            contactNumber: '444-555-6666',
            address: '654 Birch St, StillAnotherTown, USA',
            dateRequested: '2024-07-25',
            requestStatus: 'Completed',
            petName: 'Charlie',
            petTags: ['Dog', 'Friendly', 'Small'],
            message: 'Hello, I am interested in adopting the pet you posted.',
            inboxViewStatus: 'read'
        }
    ]);
    const [activeTab, setActiveTab] = useState('Inbox'); // 'Inbox', 'Sent'
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filterStatus, setFilterStatus] = useState('Pending'); // '' for all, or 'Pending', 'Approved', etc.  Changed default to Pending
    const [modalStatus, setModalStatus] = useState('Pending');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedMessage(null); // Clear selected message when changing tabs
    };

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setModalStatus(message.requestStatus); // Initialize modal status
        if (message.inboxViewStatus === 'unread') {
            // Update message status to 'read'
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
        setSelectedMessage(null); // Close modal after saving
    };

    const filteredMessages = filterStatus
        ? messages.filter(message => message.requestStatus === filterStatus)
        : messages;

    const renderMessageList = (messageList) => {
        if (!messageList || messageList.length === 0) {
            return <p className="text-gray-700">No messages to display.</p>;
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
                                {activeTab === 'Inbox' ?
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className={`text-lg ${message.inboxViewStatus === 'unread' ? 'text-purple-600' : 'text-gray-500'}`}
                                    />
                                    :
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-lg text-blue-600" />
                                }
                                <span className="font-semibold text-gray-800">{message.name}</span>
                            </div>
                            <span className={`text-sm ${message.inboxViewStatus === 'unread' ? 'text-purple-600' : 'text-gray-500'}`}>
                                {message.dateRequested}
                            </span>
                        </div>
                        <p className="text-gray-700 truncate">
                            {message.petName} - {message.message}
                        </p>
                        <div className="mt-1">
                            {getStatusBadge(message.requestStatus)}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Inbox':
                return renderMessageList(filteredMessages);
            case 'Sent':
                return renderMessageList(messages.filter(m => m.inboxViewStatus === 'sent')); // Adjust based on your 'sent' logic
            default:
                return null;
        }
    };

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowWidth < 768; // Example breakpoint for mobile

    // Calculate status counts
    const pendingCount = messages.filter(m => m.requestStatus === 'Pending').length;
    const approvedCount = messages.filter(m => m.requestStatus === 'Approved').length;
    const rejectedCount = messages.filter(m => m.requestStatus === 'Rejected').length;
    const completedCount = messages.filter(m => m.requestStatus === 'Completed').length;
    const totalCount = messages.length;


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
                    style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }} // Use the same image or a different one
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">My Inbox</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            View and manage your adoption requests.
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
                                {/* Sent Tab -  adjust logic as needed */}
                                {/* <button
                                    onClick={() => handleTabChange('Sent')}
                                    className={`${activeTab === 'Sent'
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
                                    Sent
                                </button> */}
                            </nav>
                        </div>

                        {/* Filter Dropdown and Counter */}
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
                                <span className="font-semibold">Total:</span> {totalCount} |
                                <span className="font-semibold text-yellow-700"> Pending:</span> {pendingCount} |
                                <span className="font-semibold text-green-700"> Approved:</span> {approvedCount} |
                                <span className="font-semibold text-red-700"> Rejected:</span> {rejectedCount} |
                                <span className="font-semibold text-blue-500"> Completed:</span> {completedCount}
                            </div>
                        </div>

                        {/* Tab Content */}
                        {renderTabContent()}
                    </div>
                </div>

                <footer className="bg-purple-600 py-6 text-white text-center mt-10">
                    <Inner_Footer />
                </footer>
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md overflow-y-auto max-h-[80vh]">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{selectedMessage.petName} - Adoption Request</h2>
                                <p className="text-sm text-gray-500">
                                    Requested By: {selectedMessage.name} | {selectedMessage.dateRequested}
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
                        </div>
                        {/* Add Reply/Forward/Delete buttons here if needed */}
                        <div className="mt-4 flex justify-end gap-2 flex-col items-end">
                            <div className="relative inline-block w-full mb-2">
                                <select
                                    value={modalStatus}
                                    onChange={(e) => setModalStatus(e.target.value)}
                                    className={`block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm
                                                ${['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)
                                            ? 'text-gray-400'  // Change text color
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
                                    {/* You can add an icon here if desired */}
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)) {
                                        handleCloseMessage(); // Close if Done
                                    } else {
                                        handleSaveStatus(); // Otherwise, save
                                    }
                                }}
                                className={`bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow-md text-sm w-full sm:w-auto
                                            ${['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)
                                        ? 'bg-gray-400 text-white cursor-pointer' // Style for "Done" state, make clickable
                                        : 'bg-purple-500 hover:bg-purple-700 text-white'
                                    }`}

                            >
                                {['Approved', 'Rejected', 'Completed'].includes(selectedMessage.requestStatus)
                                    ? 'Done'  // Show "Done" text
                                    : 'Save'    // Show "Save" text
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InboxPage;
