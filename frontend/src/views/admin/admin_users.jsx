import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';

const Users = () => {
  // Mock user data ONLI HUHU
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      role: 'Adopter',
      active: true,
      banned: false,
      adoptionHistory: ['Golden Retriever', 'Persian Cat'],
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Owner',
      active: true,
      banned: false,
      adoptionHistory: [],
    },
    {
      id: 3,
      name: 'Admin Joe',
      role: 'Admin',
      active: true,
      banned: false,
      adoptionHistory: [],
    },
  ]);

  // filter users by role
  const [filterRole, setFilterRole] = useState('All');
  // which user's adoption history to show
  const [showHistoryFor, setShowHistoryFor] = useState(null);

  // based on selected role
  const filteredUsers =
    filterRole === 'All' ? users : users.filter((u) => u.role === filterRole);

  // (replace with actual logic or API calls)
  const handleViewProfile = (user) => alert(`View profile: ${user.name}`);
  const handleToggleActive = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, active: !u.active } : u
      )
    );
  };
  const handleBanWarn = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, banned: !u.banned } : u
      )
    );
  };

  // OPTIONAL Admin add/remove handlers
  const handleAddAdmin = () => alert('Add new admin (not implemented)');
  const handleRemoveAdmin = (userId) => alert('Remove admin (not implemented)');

  // verify si user muna
  const [modalUser, setModalUser] = useState(null);


  return (
    <>
      <Admin_Header />
      <div className="bg-gray-100 min-h-screen px-10 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Users Management</h2>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-red-700">Unverified Users</h3>
          {users.filter(u => !u.verified).length === 0 ? (
            <p className="text-gray-500">No unverified users at the moment.</p>
          ) : (
            users.filter(u => !u.verified).map(user => (
              <div key={user.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-semibold text-black">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <button
                  onClick={() => setModalUser(user)}
                  className="bg-[#955CA4] text-white px-3 py-1 rounded hover:bg-[#F9B233] hover:text-[#955CA4]"
                >
                  View ID
                </button>
              </div>
            ))
          )}
        </div>

        {modalUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 text-center">
              <h2 className="text-xl font-semibold mb-3 text-black">Verify {modalUser.name}</h2>
              <img
                src={modalUser.idPhotoUrl}
                alt="Uploaded ID"
                className="w-full mb-4 border rounded text-black"
              />
              <div className="flex justify-center space-x-3">
                <button
                  className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-2 rounded hover:bg-[#F9B233] hover:text-[#955CA4]"
                  onClick={() => {
                    setUsers((prev) =>
                      prev.map((u) =>
                        u.id === modalUser.id ? { ...u, verified: true } : u
                      )
                    );
                    setModalUser(null);
                  }}
                >
                  Accept
                </button>
                <button
                  className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-2 rounded hover:bg-[#F9B233] hover:text-[#955CA4]"
                  onClick={() => setModalUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Filter by role */}
        <div className="mb-6 text-center">
          <label className="mr-3 font-semibold text-[#955CA4]">Filter by role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-[#955CA4] rounded px-3 py-1 bg-[#955CA4] text-[#F9B233] font-semibold"
          >
            <option value="All">All</option>
            <option value="Adopter">Adopter</option>
            <option value="Owner">Owner</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Add Admin button (OPTIONAL) */}
        {filterRole === 'Admin' && (
          <div className="mb-6 text-center">
            <button
              onClick={handleAddAdmin}
              className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-2 rounded hover:bg-[#F9B233] hover:text-[#955CA4]"
            >
              + Add Admin
            </button>
          </div>
        )}

        {/* Users list */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No users found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="border-b border-gray-200 pb-3 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-black">{user.name}</p>
                    <p className="text-sm text-gray-600">
                      Role: <strong>{user.role}</strong> | Status:{' '}
                      <span
                        className={`font-semibold ${
                          user.active ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {user.active ? 'Active' : 'Inactive'}
                      </span>{' '}
                      | {user.banned ? (
                        <span className="text-red-600 font-semibold">Banned</span>
                      ) : (
                        <span className="text-gray-500">Not banned</span>
                      )}
                    </p>
                  </div>

                  <div className="mt-3 md:mt-0 space-x-2 flex flex-wrap justify-end">
                    <button
                      onClick={() => handleViewProfile(user)}
                      className="bg-[#955CA4] -600 text-white px-3 py-1 rounded hover:bg-[#F9B233] hover:text-[#955CA4]"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() => handleToggleActive(user.id)}
                      className={`px-3 py-1 rounded ${
                        user.active
                          ? 'bg-[#955CA4] -600 text-white hover:bg-[#F9B233] hover:text-[#955CA4]'
                          : 'bg-[#955CA4] -600 text-white hover:bg-[#F9B233] hover:text-[#955CA4]'
                      }`}
                    >
                      {user.active ? 'Deactivate' : 'Activate'}
                    </button>

                    <button
                      onClick={() => handleBanWarn(user.id)}
                      className={`px-3 py-1 rounded ${
                        user.banned
                          ? 'bg-[#955CA4] -600 text-white hover:bg-[#F9B233] hover:text-[#955CA4]'
                          : 'bg-[#955CA4] -600 text-white hover:bg-[#F9B233] hover:text-[#955CA4]'
                      }`}
                    >
                      {user.banned ? 'Unban' : 'Ban / Warn'}
                    </button>

                    {/* Show remove admin only if user is admin */}
                    {user.role === 'Admin' && (
                      <button
                        onClick={() => handleRemoveAdmin(user.id)}
                        className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
                      >
                        Remove Admin
                      </button>
                    )}

                    {/* Toggle adoption history */}
                    {user.role !== 'Admin' && (
                      <button
                        onClick={() =>
                          setShowHistoryFor(showHistoryFor === user.id ? null : user.id)
                        }
                        className="bg-[#955CA4] -600 text-white hover:bg-[#F9B233] hover:text-[#955CA4] px-3 py-1 rounded mt-2"
                      >
                        {showHistoryFor === user.id
                          ? 'Hide Adoption History'
                          : 'View Adoption History'}
                      </button>
                    )}
                  </div>

                  {/* Adoption history */}
                  {showHistoryFor === user.id && user.adoptionHistory.length > 0 && (
                    <div className="mt-3 bg-gray-50 p-3 rounded text-sm text-gray-700 max-w-md">
                      <strong>Adoption History:</strong>
                      <ul className="list-disc ml-5 mt-1">
                        {user.adoptionHistory.map((pet, idx) => (
                          <li key={idx}>{pet}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {showHistoryFor === user.id && user.adoptionHistory.length === 0 && (
                    <div className="mt-3 bg-gray-50 p-3 rounded text-sm text-gray-700 max-w-md">
                      <em>No adoption history.</em>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
