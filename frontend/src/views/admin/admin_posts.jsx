import React, { useEffect, useState } from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';

const AdminPosts = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [declineReason, setDeclineReason] = useState('');
    const [showDeclineReasonFor, setShowDeclineReasonFor] = useState(null);
    const [actionModal, setActionModal] = useState({ open: false, postId: null, action: null });
    const [pendingPosts, setPendingPosts] = useState([]);
    const [approvedPosts, setApprovedPosts] = useState([]);
    const [userId, setUserId] = useState(null);

    const PendingPost = async () => {
        const response = await fetch.getPosts();
        const pendingPost = response.data.filter((x) => x.post_status === 'Pending');
        const approvedPost = response.data.filter((x) => x.post_status === 'Available');
        setPendingPosts(pendingPost);
        setApprovedPosts(approvedPost);
    };

    useEffect(() => {
        PendingPost();
    }, []);

    const handleViewMore = (post) => {
        setSelectedPost(post);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    const handleToggleDropdown = (postId) => {
        setDropdownOpen(dropdownOpen === postId ? null : postId);
        setShowDeclineReasonFor(null);
    };

    const handleAction = (action, postId, user_id) => {
        setUserId(user_id);
        if (action === 'Approve') {
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

    const handleConfirmAction = async () => {
        const { postId, action } = actionModal;
        const post = pendingPosts.find((p) => p.post_id === postId);

        if (!post) {
            setActionModal({ open: false, postId: null, action: null });
            setDeclineReason('');
            setShowDeclineReasonFor(null);
            return;
        }

        try {
            if (action === 'Approve') {
                await send.updatePostStatus(post.pet_id, { post_status: 'Available' });
            } else if (action === 'Decline') {
                const alertPost = {
                    alert_type: 'post_rejected',
                    alert_title: 'Post Rejected',
                    alert_message: `Your post is rejected due to ${declineReason}`,
                    user_id: userId,
                    admin_id: 6,
                };
                await send.updatePostStatus(post.pet_id, { post_status: 'Rejected' });
                await send.sendAlert(alertPost);
            }
            await PendingPost();
        } catch (error) {
            console.error('Error updating post status:', error);
        }

        setActionModal({ open: false, postId: null, action: null });
        setDeclineReason('');
        setShowDeclineReasonFor(null);
    };

    return (
        <>
            {/* Sticky Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Admin_Header />
            </div>

            <ScrollToTopButton />

            {/* Banner */}
            <section className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center"
                     style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}>
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4">Posts Controls</h1>
                    <p className="text-lg max-w-2xl mx-auto">View the Overview of the System.</p>
                </div>
            </section>

            <div className="bg-white min-h-screen px-10 py-8">
                {/* Pending Posts */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pending Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pendingPosts.length === 0 && (
                        <p className="text-center col-span-full text-gray-600">No pending posts</p>
                    )}
                    {pendingPosts.map((post) => (
                        <div key={post.post_id} className="bg-purple-400 rounded-lg shadow-md overflow-hidden relative">
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center space-x-3">
                                    <img src={post.user.user_prof_pic} alt="User" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="text-white font-semibold text-sm">{post.user.user_name}</p>
                                        <p className="text-white text-xs">{post.user.user_email}</p>
                                        <p className="text-white text-xs">{post.post_date}</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <button onClick={() => handleToggleDropdown(post.post_id)} className="text-black text-xl">⋮</button>
                                    {dropdownOpen === post.post_id && (
                                        <div className="absolute right-0 top-6 bg-white text-sm rounded shadow-lg z-10 w-48 p-2">
                                            <div className="flex justify-end">
                                                <button onClick={() => setDropdownOpen(null)} className="text-gray-500 hover:text-red-600 text-lg font-bold">&times;</button>
                                            </div>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                                                    onClick={() => handleAction('Approve', post.post_id, post.user_id)}>Approve</button>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                                                    onClick={() => handleAction('Decline', post.post_id, post.user_id)}>Decline</button>
                                            {showDeclineReasonFor === post.post_id && (
                                                <textarea
                                                    className="mt-2 w-full border rounded p-2 text-black text-sm bg-white"
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

                            <img src={post.post_img} alt="Post" className="w-full h-40 object-cover" />
                            <div className="bg-white px-4 py-2 flex justify-between items-center">
                                <p className="text-gray-700 text-sm font-bold">{post.pet.pet_name}</p>
                                <p className="text-gray-700 text-sm">{post.pet.pet_description}</p>
                                <button onClick={() => handleViewMore(post)} className="text-purple-600 text-sm hover:text-orange-500">
                                    ↗
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Approved Posts */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-7">Approved Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {approvedPosts.length === 0 && (
                        <p className="text-center col-span-full text-gray-600">No approved posts yet</p>
                    )}
                    {approvedPosts.map((post) => (
                        <div key={post.post_id} className="bg-green-400 rounded-lg shadow-md overflow-hidden relative">
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center space-x-3">
                                    <img src={post.user.user_prof_pic} alt="User" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="text-white font-semibold text-sm">{post.user.user_name}</p>
                                        <p className="text-white text-xs">{post.user.user_email}</p>
                                        <p className="text-white text-xs">{post.post_date}</p>
                                    </div>
                                </div>
                            </div>
                            <img src={post.post_img} alt="Post" className="w-full h-40 object-cover" />
                            <div className="bg-white px-4 py-2">
                                <p className="text-gray-700 text-sm font-bold">{post.pet.pet_name}</p>
                                <p className="text-gray-700 text-sm">{post.pet.pet_description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* View More Modal */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
                        <button onClick={handleCloseModal} className="absolute top-2 right-3 text-gray-600 text-xl font-bold">
                            &times;
                        </button>
                        <h2 className="text-lg font-semibold mb-2 text-black">{selectedPost.pet.pet_name}</h2>
                        <img src={selectedPost.post_img} alt="Pet" className="w-full h-40 object-cover rounded mb-3" />
                        <p className="text-sm text-black"><strong>Description:</strong> {selectedPost.post_descrip}</p>
                        <p className="text-sm mt-1 text-black"><strong>Characteristics:</strong> {selectedPost.pet.pet_tag}</p>
                    </div>
                </div>
            )}

            {/* Confirm Modal */}
            {actionModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
                        <button onClick={() => setActionModal({ open: false, postId: null, action: null })}
                                className="absolute top-2 right-3 text-gray-600 text-xl font-bold">
                            &times;
                        </button>
                        <h3 className="text-lg font-semibold mb-4 text-black">
                            {actionModal.action === 'Approve' ? 'Approve Post' : 'Decline Post'}
                        </h3>
                        {actionModal.action === 'Decline' && (
                            <p className="mb-4 text-black">Reason: <em>{declineReason || "(No reason provided)"}</em></p>
                        )}
                        <p className="mb-6 text-black">
                            Are you sure you want to <strong>{actionModal.action.toLowerCase()}</strong> this post (ID: {actionModal.postId})?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setActionModal({ open: false, postId: null, action: null })}
                                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                                Cancel
                            </button>
                            <button onClick={handleConfirmAction}
                                    className={`px-4 py-2 rounded text-white ${actionModal.action === 'Approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
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
