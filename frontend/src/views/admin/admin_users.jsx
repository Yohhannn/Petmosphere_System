import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';

const Users = () => {
  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      verified: true,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-24',
      warnings: 1,
      active: true,
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@example.com',
      verified: false,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-23',
      warnings: 0,
      active: true,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      verified: false,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-22',
      warnings: 2,
      active: true,
    },
    {
      id: 4,
      name: 'Bob Williams',
      email: 'bob.williams@example.com',
      verified: true,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-21',
      warnings: 0,
      active: true,
    },
    {
      id: 5,
      name: 'Eva Brown',
      email: 'eva.brown@example.com',
      verified: false,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-20',
      warnings: 3,
      active: false,
    },
    {
      id: 6,
      name: 'Michael Davis',
      email: 'michael.davis@example.com',
      verified: true,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-19',
      warnings: 1,
      active: true,
    },
    {
      id: 7,
      name: 'David Lee',
      email: 'david.lee@example.com',
      verified: true,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-18',
      warnings: 5,
      active: true,
    },
    {
      id: 8,
      name: 'Sarah Kim',
      email: 'sarah.kim@example.com',
      verified: false,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-17',
      warnings: 1,
      active: true,
    },
    {
      id: 9,
      name: 'Kevin Chen',
      email: 'kevin.chen@example.com',
      verified: false,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-16',
      warnings: 0,
      active: true,
    },
    {
      id: 10,
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      verified: true,
      idPhotoUrl: 'https://via.placeholder.com/60',
      dateOfRequest: '2024-07-15',
      warnings: 2,
      active: true,
    },
  ]);

  const [modalUser, setModalUser] = useState(null);
  const [modalType, setModalType] = useState(''); // 'warn', 'deactivate', 'activate'
  const [modalMessage, setModalMessage] = useState('');
  const [verificationStatus, setVerificationStatus] = useState({
    approve: false,
    reject: false,
  });
  const [verificationDescription, setVerificationDescription] = useState('');

  const handleVerifyUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, verified: true } : u))
    );
    setModalUser(null);
    setVerificationStatus({ approve: false, reject: false });
    setVerificationDescription('');
  };

  const handleRejectUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, verified: false } : u))
    );
    setModalUser(null);
    setVerificationStatus({ approve: false, reject: false });
    setVerificationDescription('');
  };

  const handleUnverifyUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, verified: false } : user))
    );
  };

  const handleDeactivateUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, active: false } : user)) // Add a new 'active' property
    );
    setModalUser(null);
  };

  const handleActivateUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, active: true } : user))
    );
    setModalUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const unverifiedUsers = users.filter((u) => !u.verified);
  const verifiedUsers = users.filter((u) => u.verified && u.active);
  const deactivatedUsers = users.filter((u) => u.verified && !u.active);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setVerificationStatus((prev) => ({
      approve: false,
      reject: false,
      [name]: checked,
    }));
  };

  const showModal = (user, type, message = '') => {
    setModalUser(user);
    setModalType(type);
    setModalMessage(message);
  };

  const performAction = () => {
    if (!modalUser) return;
    switch (modalType) {
      case 'warn':
        // Implement warn functionality
        alert(`Warn user ${modalUser.name} with message: ${modalMessage}`);
        break;
      case 'deactivate':
        handleDeactivateUser(modalUser.id);
        break;
      case 'activate':
        handleActivateUser(modalUser.id);
        break;
      default:
        break;
    }
    setModalUser(null);
    setModalType('');
    setModalMessage('');
  };

  return (
    <>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
        <Admin_Header />
      </div>

      <ScrollToTopButton />

      <section
        className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
        style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">User Management</h1>
          <p className="text-lg max-w-2xl mx-auto">
            View the Overview of the System.
          </p>
        </div>
      </section>

      <div className="bg-gray-100 min-h-screen px-10 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Pending Verifications
        </h2>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          {unverifiedUsers.length === 0 ? (
            <p className="text-center text-gray-500">
              No unverified users at the moment.
            </p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scroll">
              {unverifiedUsers.map((user) => (
                <li
                  key={user.id}
                  className="border-b border-gray-200 pb-3 flex flex-col md:flex-row md:justify-between items-start md:items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={user.idPhotoUrl}
                      alt={`${user.name}'s Profile`}
                      className="rounded-full w-16 h-16 mr-4 border-2 border-gray-300"
                    />
                    <div className="flex flex-col items-start ">
                      <p className="text-lg text-black">
                        <b className="text-purple-600">{user.name}</b>
                      </p>
                      <p className="text-lg text-black">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Account ID: {user.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        <b>Status: </b>
                        <span className="text-red-500">Unverified</span>
                      </p>
                    </div>
                  </div>
                  <div className="pr-2">
                    {/* Added padding here */}
                    <button
                      onClick={() => setModalUser(user)} // Corrected this line
                      className="bg-[#955CA4] text-white px-3 py-1 rounded hover:bg-[#F9B233] hover:text-[#955CA4] mt-4 md:mt-0 text-xs"
                    >
                      Verify Valid ID
                    </button>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>

        {/* All Verified Accounts Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12 text-center">
          All Verified Accounts
        </h2>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          {verifiedUsers.length === 0 ? (
            <p className="text-center text-gray-500">No verified users.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scroll">
              {verifiedUsers.map((user) => (
                <li
                  key={user.id}
                  className="border-b border-gray-200 pb-3 flex flex-col md:flex-row md:justify-between items-start md:items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={user.idPhotoUrl}
                      alt={`${user.name}'s Profile`}
                      className="rounded-full w-16 h-16 mr-4 border-2 border-gray-300"
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-lg text-black">
                        <b className="text-purple-600">{user.name}</b>
                      </p>
                      <p className="text-lg text-black">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Account ID: {user.id}
                      </p>
                      <p className="text-sm text-green-500">
                        <b>Status:</b> Verified
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>Total Violations:</b> {user.warnings}
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>Is Active:</b>{' '}
                        {user.active ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0 pr-2">
                    {' '}
                    {/* Added padding here */}
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
                      onClick={() => showModal(user, 'warn', 'Enter warning message:')}
                    >
                      Warn
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                      onClick={() => showModal(user, 'deactivate', 'Are you sure you want to deactivate this account?')
                      }
                    >
                      Deactivate
                    </button>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>

        {/* All Deactivated Accounts Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12 text-center">
          All Deactivated Accounts
        </h2>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          {deactivatedUsers.length === 0 ? (
            <p className="text-center text-gray-500">No deactivated users.</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scroll">
              {deactivatedUsers.map((user) => (
                <li
                  key={user.id}
                  className="border-b border-gray-200 pb-3 flex flex-col md:flex-row md:justify-between items-start md:items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={user.idPhotoUrl}
                      alt={`${user.name}'s Profile`}
                      className="rounded-full w-16 h-16 mr-4 border-2 border-gray-300"
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-lg text-black">
                        <b className="text-purple-600">{user.name}</b>
                      </p>
                      <p className="text-lg text-black">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Account ID: {user.id}
                      </p>
                      <p className="text-sm text-green-500">
                        <b>Status:</b> Verified
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>Is Active:</b>
                        <span className="text-red-500"> No</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        <b>Total Violations:</b> {user.warnings}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0 pr-2">
                    {' '}
                    {/* Added padding here */}
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                      onClick={() => showModal(user, 'activate', 'Are you sure you want to activate this account?')}
                    >
                      Activate
                    </button>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>

        {modalUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-3 text-black text-center">
                {modalType === 'warn' && 'Warn User'}
                {modalType === 'deactivate' && 'Deactivate User'}
                {modalType === 'activate' && 'Activate User'}
                {modalType !== 'warn' && modalType !== 'deactivate' && modalType !== 'activate' && 'Verify User'}
              </h2>
              {modalType === 'warn' && (
                <textarea
                  placeholder="Enter warning message"
                  value={modalMessage}
                  onChange={(e) => setModalMessage(e.target.value)}
                  className="mb-4 w-full border border-gray-300 rounded-md p-2 bg-white text-black flex-grow"
                  style={{ minHeight: '100px' }}
                />
              )}
              {modalType === 'deactivate' && (
                <p className="text-gray-700 mb-4">Are you sure you want to deactivate this account?</p>
              )}
              {modalType === 'activate' && (
                <p className="text-gray-700 mb-4">Are you sure you want to activate this account?</p>
              )}
              {(modalType === 'undefined' || !['warn', 'deactivate', 'activate'].includes(modalType)) && (
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left side: Image */}
                  <div className="md:w-1/2">
                    <img
                      src={modalUser.idPhotoUrl}
                      alt="Uploaded ID"
                      className="w-full mb-4 border rounded text-black"
                      style={{ maxHeight: '500px', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Right side: Controls */}
                  <div className="md:w-1/2 flex flex-col">
                    <div className="flex  mb-4 justify-start">
                      <div className="flex items-center space-x-2 mr-4">
                        <input
                          type="checkbox"
                          id="approve"
                          name="approve"
                          checked={verificationStatus.approve}
                          onChange={handleCheckboxChange}
                        />
                        <label className="text-black" htmlFor="approve">
                          Approve
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="reject"
                          name="reject"
                          checked={verificationStatus.reject}
                          onChange={handleCheckboxChange}
                        />
                        <label className="text-black" htmlFor="reject">
                          Reject
                        </label>
                      </div>
                    </div>
                    <textarea
                      placeholder="Add description (optional)"
                      value={verificationDescription}
                      onChange={(e) => setVerificationDescription(e.target.value)}
                      className="mb-4 w-full border border-gray-300 rounded-md p-2 bg-white text-black flex-grow"
                      style={{ minHeight: '100px' }}
                    />
                    <div className="flex justify-end space-x-3 mt-auto">
                      <button
                        className="bg-[#955CA4] text-white px-4 py-2 rounded hover:bg-[#F9B233] hover:text-white disabled:opacity-50 text-xs"
                        onClick={() => {
                          if (verificationStatus.approve) {
                            handleVerifyUser(modalUser.id);
                          } else if (verificationStatus.reject) {
                            handleRejectUser(modalUser.id);
                          }
                        }}
                        disabled={!verificationStatus.approve && !verificationStatus.reject}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-[#955CA4] text-white px-4 py-2 rounded hover:bg-[#F9B233] hover:text-white text-xs"
                        onClick={() => {
                          setModalUser(null);
                          setVerificationStatus({ approve: false, reject: false });
                          setVerificationDescription('');
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {['warn', 'deactivate', 'activate'].includes(modalType) && (
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-xs"
                    onClick={() => {
                      setModalUser(null);
                      setModalType('');
                      setModalMessage('');
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#955CA4] text-white px-4 py-2 rounded hover:bg-[#F9B233] hover:text-white text-xs"
                    onClick={performAction}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: #e0e0e0;
          border-radius: 10px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #955CA4;
          border-radius: 10px;
          border: 2px solid #e0e0e0;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #F9B233;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #955CA4 #e0e0e0;
        }
      `}</style>
    </>
  );
};

export default Users;

