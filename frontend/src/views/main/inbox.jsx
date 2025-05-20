import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faInbox, faPaperPlane, faFilter, faCog, faExclamationTriangle, faBullhorn, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';
import Cookies from 'js-cookie';
import {updateAdoptionRequestStatus} from "../postRequest/send.js";

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
        case 'Cancelled':
            badgeClasses += " text-purple-500 bg-purple-100 border border-purple-300";
            return <div className={badgeClasses}>Cancelled</div>;
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
    const [messages, setMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [systemMessages] = useState(systemMessagesData);

    let fetchAdoptionRequestByUser;
    let fetchAllAdoptionRequest;
    const userCookie = Cookies.get('userCredentials');
    const user = userCookie ? JSON.parse(userCookie) : null;
    useEffect(() => {
        fetchAdoptionRequestByUser = async () =>{
            const response = await fetch.getAdoptionRequestByUserId(user.user.user_id);
            setSentMessages(response.data);
            console.log(response.data);
        }
        fetchAllAdoptionRequest = async () =>{
            const response = await fetch.getAdoptionRequest();
            const filteredRequestFromPet = response.data ? response.data.filter(
                m => m.pet.user.user_id === user.user.user_id) : [];
            setMessages(filteredRequestFromPet);
        }
        fetchAdoptionRequestByUser();
        fetchAllAdoptionRequest();
    }, [modalStatus]);
    const updateAdoptionRequestView = async (id,data) =>{
        const response = await send.updateAdoptionRequestView(id,data);
        console.log(response.messages);
    }


    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedMessage(null);
        setFilterStatus('');
        fetchAdoptionRequestByUser;
        fetchAllAdoptionRequest;// Reset filter when tab changes
    };

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        if (activeTab === 'Inbox') {
            setModalStatus(message.req_status);
            if (message.req_view_status === 'unread') {
                updateAdoptionRequestView(message.req_id,{"req_view_status" : 'read'});
                fetchAllAdoptionRequest;
                fetchAdoptionRequestByUser;
            }
        } else if (activeTab === 'Sent') {
            setModalStatus(message.req_status);
        } else if (activeTab === 'System') {
            // No specific modal status for system messages yet
        }
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    const handleSaveStatus = async() => {
        if (selectedMessage && activeTab === 'Inbox') {
            try{
                await updateAdoptionRequestStatus(selectedMessage.req_id,{"req_status" : modalStatus});
                fetchAllAdoptionRequest;
                fetchAdoptionRequestByUser;
            }catch (e){
                console.log("an error occured "+e);
            }


        }
        setSelectedMessage(null);
    };

    const filteredMessages = filterStatus
        ? messages.filter(message => message.req_status === filterStatus)
        : messages;

    const filteredSentMessages = filterStatus
        ? sentMessages.filter(message => message.req_status === filterStatus)
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
                        key={message.req_id}
                        className={`bg-white border rounded-md shadow-sm p-3 cursor-pointer transition-colors duration-200 ${selectedMessage?.req_id === message.req_id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        onClick={() => handleMessageClick(message)}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {tab === 'Inbox' && (
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className={`text-lg ${message.req_view_status === 'unread' ? 'text-purple-600' : 'text-gray-500'}`}
                                    />
                                )}
                                {tab === 'Sent' && (
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-lg text-blue-600" />
                                )}
                                {tab === 'System' && (
                                    <FontAwesomeIcon icon={faCog} className="text-lg text-gray-700" />
                                )}
                                <span className="font-semibold text-gray-800">
                                    {tab === 'Inbox' ? message.user.user_name : tab === 'Sent' ? message.user.user_name : message.sys_admin_name}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {tab === 'Inbox' ? message.req_date : tab === 'Sent' ? message.req_date : message.sys_date_sent}
                            </span>
                        </div>
                        <p className="text-gray-700 truncate">
                            {tab === 'Inbox'
                                ? `${message.pet.pet_name} - ${message.req_message}`
                                : tab === 'Sent'
                                    ? `${message.pet.pet_name} - ${message.req_message}`
                                    : message.sys_message}
                        </p>
                        <div className="mt-1">
                            {tab === 'Inbox' && getStatusBadge(message.req_status)}
                            {tab === 'Sent' && getStatusBadge(message.req_status)}
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
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FontAwesomeIcon icon={faFilter} className="ml-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Total:</span> {messages.length} |
                                <span className="font-semibold text-yellow-700"> Pending:</span> {messages.filter(m => m.req_status === 'Pending').length} |
                                <span className="font-semibold text-green-700"> Approved:</span> {messages.filter(m => m.req_status === 'Approved').length} |
                                <span className="font-semibold text-red-700"> Rejected:</span> {messages.filter(m => m.req_status === 'Rejected').length} |
                                <span className="font-semibold text-blue-500"> Completed:</span> {messages.filter(m => m.req_status === 'Completed').length} |
                                <span className="font-semibold text-violet-500"> Cancelled:</span> {messages.filter(m => m.req_status === 'Cancelled').length}
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
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FontAwesomeIcon icon={faFilter} className="ml-2 text-gray-500" />
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Total:</span> {sentMessages.length} |
                                <span className="font-semibold text-yellow-700"> Pending:</span> {sentMessages.filter(m => m.req_status === 'Pending').length} |
                                <span className="font-semibold text-green-700"> Approved:</span> {sentMessages.filter(m => m.req_status === 'Approved').length} |
                                <span className="font-semibold text-red-700"> Rejected:</span> {sentMessages.filter(m => m.req_status === 'Rejected').length} |
                                <span className="font-semibold text-blue-500"> Completed:</span> {sentMessages.filter(m => m.req_status === 'Completed').length}
                                <span className="font-semibold text-violet-500"> Cancelled:</span> {sentMessages.filter(m => m.req_status === 'Cancelled').length}
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
                                        ? `${selectedMessage.pet.pet_name} - Adoption Request`
                                        : activeTab === 'Sent'
                                            ? `${selectedMessage.pet.pet_name} - Message Details`
                                            : `${selectedMessage.sys_message_type} - System Notification`}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {activeTab === 'Inbox'
                                        ? `Requested By: ${selectedMessage.user.user_name} | ${selectedMessage.req_date}`
                                        : activeTab === 'Sent'
                                            ? `Sent To: ${selectedMessage.user.user_name} | ${selectedMessage.req_date}`
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
                            {activeTab === 'Inbox' || activeTab === 'Sent' ? (
                                <>
                                    <p><span className="font-semibold">Name:</span> {selectedMessage.user.user_name}</p>
                                    <p><span className="font-semibold">Email:</span> {selectedMessage.user.user_email}</p>
                                    <p><span className="font-semibold">Contact Number:</span> {selectedMessage.user.user_phone}</p>
                                    <p><span className="font-semibold">Address:</span> {selectedMessage.user.user_location}</p>
                                    <p><span className="font-semibold">Request Status:</span> {getStatusBadge(selectedMessage.req_status)}</p>
                                    <p><span className="font-semibold">Pet Name:</span> {selectedMessage.pet.pet_name}</p>
                                    <p><span className="font-semibold">Pet Tags:</span> {selectedMessage.pet.pet_tag}</p>
                                    <p><span className="font-semibold">Message:</span></p>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-line pb-5">{selectedMessage.req_message}</p>
                                </>
                             ) //: activeTab === 'Sent' ? (
                            //     <>
                            //         <p><span className="font-semibold">Name:</span> {selectedMessage.user.user_name}</p>
                            //         <p><span className="font-semibold">Email:</span> {selectedMessage.snt_email}</p>
                            //         <p><span className="font-semibold">Contact Number:</span> {selectedMessage.snt_contactNumber}</p>
                            //         <p><span className="font-semibold">Address:</span> {selectedMessage.snt_address}</p>
                            //         <p><span className="font-semibold">Request Status:</span> {getStatusBadge(selectedMessage.snt_req_status)}</p>
                            //         <p><span className="font-semibold">Pet Name:</span> {selectedMessage.snt_petName}</p>
                            //         <p><span className="font-semibold">Pet Tags:</span> {selectedMessage.snt_petTags.join(', ')}</p>
                            //         <p><span className="font-semibold">Message:</span></p>
                            //         <p className="text-gray-800 leading-relaxed whitespace-pre-line pb-5">{selectedMessage.snt_message}</p>
                            //         <p><span className="font-semibold">Date Sent:</span> {selectedMessage.snt_dateRequested}</p>
                            //         <p><span className="font-semibold">Last Updated:</span> {selectedMessage.snt_dateUpdated}</p>
                            //         { selectedMessage.snt_req_status === 'Completed' && (
                            //             <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-sm transition-colors">
                            //                 <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add Review
                            //             </button>
                            //         )}
                            //     </>
                            // )
                                : (
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
                                    <button
                                        onClick={() => {
                                            if (['Approved', 'Rejected', 'Completed'].includes(selectedMessage.req_status)) {
                                                handleCloseMessage();
                                            } else {
                                                handleSaveStatus();
                                            }
                                        }}
                                        className={`bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow-md text-sm w-full sm:w-auto
                                            ${['Approved', 'Rejected', 'Completed'].includes(selectedMessage.req_status)
                                            ? 'bg-gray-400 text-white cursor-pointer'
                                            : 'bg-purple-500 hover:bg-purple-700 text-white'
                                        }`}
                                    >
                                        {['Approved', 'Rejected', 'Completed'].includes(selectedMessage.req_status)
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
