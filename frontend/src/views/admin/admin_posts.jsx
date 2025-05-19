import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';

// Mock posts – replace later with fetched data from backend
const samplePosts = [
  {
    id: 1,
    user: {
      name: 'Olivia Wilson',
      date: '08/10/25',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
    caption: 'Golden retriever',
    description: 'Friendly and active dog.',
    characteristics: 'Playful, Loyal, Gentle',
  },
  {
    id: 2,
    user: {
      name: 'Liam Smith',
      date: '08/09/25',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    image: 'https://images.unsplash.com/photo-1601758123927-196fd3f8a1b3',
    caption: 'Siberian cat',
    description: 'Fluffy and independent.',
    characteristics: 'Quiet, Curious, Elegant',
  },
];

const AdminPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [declineReason, setDeclineReason] = useState(''); // track decline reason
  const [showDeclineReasonFor, setShowDeclineReasonFor] = useState(null); // track which post shows textarea
  const [actionModal, setActionModal] = useState({ open: false, postId: null, action: null });
  const [pendingPosts, setPendingPosts] = useState(samplePosts);
  const [approvedPosts, setApprovedPosts] = useState([]);

  const handleViewMore = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleToggleDropdown = (postId) => {
    setDropdownOpen(dropdownOpen === postId ? null : postId);
    setShowDeclineReasonFor(null); // hide textarea when dropdown closes
  };

  const handleAction = (action, postId) => {
    if (action === 'Approve') {
      // open confirmation modal for approve
      setActionModal({ open: true, postId, action: 'Approve' });
    } else if (action === 'Decline') {
      if (showDeclineReasonFor === postId) {
        setActionModal({ open: true, postId, action: 'Decline' });
      } else {
        setShowDeclineReasonFor(postId);
        return;
      }
    }
    setDropdownOpen(null);
  };

  const handleConfirmAction = () => {
    const { postId, action } = actionModal;
    const post = pendingPosts.find((p) => p.id === postId);

    if (!post) {
      setActionModal({ open: false, postId: null, action: null });
      setDeclineReason('');
      setShowDeclineReasonFor(null);
      return;
    }

    if (action === 'Approve') {
      // move post from pending to approved
      setPendingPosts(pendingPosts.filter((p) => p.id !== postId));
      setApprovedPosts([...approvedPosts, post]);
    } else if (action === 'Decline') {
      // remove post from pending, don't add anywhere
      setPendingPosts(pendingPosts.filter((p) => p.id !== postId));
      setDeclineReason('');
      setShowDeclineReasonFor(null);
    }

    setActionModal({ open: false, postId: null, action: null });
  };

  return (
    <>
      <Admin_Header />
      <div className="bg-white min-h-screen px-10 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pending Posts</h2>
        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pendingPosts.length === 0 && (
            <p className="text-center col-span-full text-gray-600">No pending posts</p>
          )}
          {pendingPosts.map((post) => (
            <div key={post.id} className="bg-purple-400 rounded-lg shadow-md overflow-hidden relative">
              {/* User Info Header */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <img src={post.user.avatar} alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-white font-semibold text-sm">{post.user.name}</p>
                    <p className="text-white text-xs">{post.user.date}</p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="relative">
                  <button onClick={() => handleToggleDropdown(post.id)} className="text-black text-xl">⋮</button>
                  {dropdownOpen === post.id && (
                    <div className="absolute right-0 top-6 bg-white text-sm rounded shadow-lg z-10 w-48 p-2">
                      {/* Exit button */}
                      <div className="flex justify-end">
                        <button
                          className="text-gray-500 hover:text-red-600 text-lg font-bold"
                          onClick={() => setDropdownOpen(null)}
                          title="Close"
                        >
                          &times;
                        </button>
                      </div>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                        onClick={() => handleAction('Approve', post.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                        onClick={() => handleAction('Decline', post.id)}
                      >
                        Decline
                      </button>

                      {/* show textarea if decline was clicked once */}
                      {showDeclineReasonFor === post.id && (
                        <textarea
                          className="mt-2 w-full border rounded p-2 text-black text-sm text-white"
                          rows="3"
                          placeholder="Reason for declining..."
                          value={declineReason}
                          onChange={(e) => setDeclineReason(e.target.value)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Image */}
              <img src={post.image} alt="Post" className="w-full h-40 object-cover" />

              {/* Caption + View Button */}
              <div className="bg-white px-4 py-2 flex justify-between items-center">
                <p className="text-gray-700 text-sm">{post.caption}</p>
                <button
                  onClick={() => handleViewMore(post)}
                  className="text-purple-600 text-sm hover:text-orange-500 transition-colors duration-200" // added hover color
                >
                  ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Approved Posts Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-7">Approved Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {approvedPosts.length === 0 && (
            <p className="text-center col-span-full text-gray-600">No approved posts yet</p>
          )}
          {approvedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-green-400 rounded-lg shadow-md overflow-hidden relative"
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <img src={post.user.avatar} alt="User" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-white font-semibold text-sm">{post.user.name}</p>
                    <p className="text-white text-xs">{post.user.date}</p>
                  </div>
                </div>
              </div>

              <img
                src={post.image}
                alt="Post"
                className="w-full h-40 object-cover"
              />

              <div className="bg-white px-4 py-2">
                <p className="text-gray-700 text-sm">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-2 text-black">{selectedPost.caption}</h2>
            <img src={selectedPost.image} alt="Pet" className="w-full h-40 object-cover rounded mb-3" />
            <p className="text-sm text-black"><strong>Description:</strong> {selectedPost.description}</p>
            <p className="text-sm mt-1 text-black"><strong>Characteristics:</strong> {selectedPost.characteristics}</p>
          </div>
        </div>
      )}

      {/* Confirm Approve/Decline Modal */}
      {actionModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <button
              onClick={() => setActionModal({ open: false, postId: null, action: null })}
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4 text-black">
              {actionModal.action === 'Approve' ? 'Approve Post' : 'Decline Post'}
            </h3>
            {actionModal.action === 'Decline' && (
              <p className="mb-4 text-black">
                Reason: <em>{declineReason || "(No reason provided)"}</em>
              </p>
            )}
            <p className="mb-6 text-black">
              Are you sure you want to <strong>{actionModal.action.toLowerCase()}</strong> this post (ID: {actionModal.postId})?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setActionModal({ open: false, postId: null, action: null })}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded text-white ${
                  actionModal.action === 'Approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPosts;
