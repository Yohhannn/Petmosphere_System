import React, { useState } from 'react';
import Inner_Footer from '../../components/inner_footer';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';
import accountsData from '../../data/accountsData';
import reviewsData from '../../data/reviewsData';
import { posts } from '../../data/postsData'; // Import posts data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faCalendarAlt, faUserCircle, faPlusCircle, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - ACCOUNT" },
        { name: "description", content: "Manage and update your personal details below." },
    ];
}

const AccountInfo = () => {
    // Assuming you want to display the logged-in user's account.
    // You'll need a way to identify the current user (e.g., from context, state, or props).
    // For this example, let's just pick the first account from the array.
    const loggedInAccount = accountsData[1];

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Details');
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [newReviewDesc, setNewReviewDesc] = useState('');

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleConfirmLogout = () => {
        // Perform logout logic here (e.g., clearing session, local storage)
        setIsLogoutModalOpen(false);
        // Redirect to the home page
        window.location.href = "/";
    };

    const handleCancelLogout = () => {
        setIsLogoutModalOpen(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleOpenAddReview = () => {
        setIsAddReviewOpen(true);
    };

    const handleCloseAddReview = () => {
        setIsAddReviewOpen(false);
        setNewReviewRating(0);
        setNewReviewDesc('');
    };

    const handleRatingChange = (rating) => {
        setNewReviewRating(rating);
    };

    const handleDescChange = (event) => {
        setNewReviewDesc(event.target.value);
    };

    const handleSubmitReview = () => {
        // In a real application, you would:
        // 1. Get the ID of the user being reviewed (loggedInAccount.accountID).
        // 2. Get the ID and name of the reviewer (the currently logged-in user).
        // 3. Send the newReviewRating and newReviewDesc to your backend API to save the review.
        // 4. After successfully saving, you would likely refetch the reviews for this account
        //    or update the local state to include the new review.

        console.log('Submitting Review:', {
            ReviewTo: loggedInAccount.accountID,
            Reviewer: 'Current User Name', // Replace with actual current user's name
            ReviewRatings: newReviewRating,
            ReviewDesc: newReviewDesc,
            ReviewDate: new Date().toLocaleDateString(), // Basic date
        });

        // For this example, we'll just close the modal and reset the form.
        handleCloseAddReview();
        // In a real app, you'd likely update the reviewsData or fetch again.
    };

    const renderStarRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={i <= newReviewRating ? faStarSolid : faStarRegular}
                    className={`cursor-pointer text-xl ${i <= newReviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(i)}
                />
            );
        }
        return stars;
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Details':
                return (
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <h3 className="font-semibold text-purple-600">Account ID:</h3>
                            <p>{loggedInAccount.accountID}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Full Name:</h3>
                            <p>{loggedInAccount.accountFullName}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Email:</h3>
                            <p>{loggedInAccount.accountEmail}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Phone:</h3>
                            <p>{loggedInAccount.accountContactNumber}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Address:</h3>
                            <p>{loggedInAccount.accountAddress}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Date Created:</h3>
                            <p>{loggedInAccount.dateCreated}</p>
                        </div>
                    </div>
                );
            case 'Reviews':
                // Find reviews for the logged-in account
                const userReviews = reviewsData.find(
                    (review) => review.ReviewTo === loggedInAccount.accountID
                )?.reviews || [];

                // Calculate total rating
                const totalRating = userReviews.reduce((sum, review) => sum + review.ReviewRatings, 0);
                const averageRating = userReviews.length > 0 ? (totalRating / userReviews.length).toFixed(1) : 0;

                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-purple-600">Your Reviews</h3>
                            <button
                                onClick={handleOpenAddReview}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-sm transition-colors"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Add Review
                            </button>
                        </div>

                        {userReviews.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700">
                                    Average Rating: <span className="text-yellow-500">{averageRating}</span> ({userReviews.length} reviews)
                                </h4>
                            </div>
                        )}

                        {userReviews.length > 0 ? (
                            <ul className="space-y-4">
                                {userReviews.map((review) => (
                                    <li key={review.ReviewID} className="bg-white border rounded-md shadow-sm p-4">
                                        <div className="flex items-center mb-2 text-gray-700">
                                            <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-xl text-purple-500" />
                                            <span className="font-semibold">{review.Reviewer}</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <FontAwesomeIcon icon={faStarSolid} className="mr-1 text-yellow-500" />
                                            <span className="text-yellow-500 font-semibold">{review.ReviewRatings}</span>
                                        </div>
                                        <p className="text-gray-800 mb-3">{review.ReviewDesc}</p>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                            <span>{review.ReviewDate}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">No reviews yet for this account.</p>
                        )}
                    </div>
                );
            case 'Recent Posts':
                // Filter posts where the OwnerAccountID matches the logged-in account ID
                const recentPosts = posts.filter(post => post.OwnerAccountID === loggedInAccount.accountID);

                return (
                    <div>
                        <h3 className="font-semibold text-purple-600 mb-2">Your Recent Posts</h3>
                        {recentPosts.length > 0 ? (
                            <ul className="space-y-4">
                                {recentPosts.map(post => (
                                    <li key={post.PetID} className="bg-white border rounded-md shadow-sm p-4">
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={post.PetImages[0]}
                                                alt={post.PetName}
                                                className="w-16 h-16 object-cover rounded mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{post.PetName}</h4>
                                                <p className="text-sm text-gray-600">{post.Breed} ({post.PetType})</p>
                                                <p className="text-xs text-gray-500">Posted {moment(post.TimePosted).fromNow()}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed line-clamp-2">{post.PetDescription}</p>
                                        {post.PostDescription && (
                                            <p className="text-gray-600 text-sm mt-2 italic">"{post.PostDescription}"</p>
                                        )}
                                        <div className="mt-2">
                                            {post.PetTags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-orange-200 rounded-full px-2 py-1 text-xs font-semibold text-orange-700 mr-2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${post.Status === 'Available' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                {post.Status}
                                            </span>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${post.PostStatus === 'Approved' ? 'bg-blue-200 text-blue-700' : post.PostStatus === 'Rejected' ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                                                {post.PostStatus}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">You haven't posted any pets for adoption yet.</p>
                        )}
                    </div>
                );
            case 'more':
                return (
                    <div>
                        <h3 className="font-semibold text-purple-600 mb-2">More Options</h3>
                        <p className="text-gray-700">Additional account settings or information will appear here.</p>

                        <div className="flex justify-end mt-6 space-x-4">
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>
                            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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
                    style={{ backgroundImage: "url('main_assets/images/image_main_banner3.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">My Account Information</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            Manage and update your personal details below.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-6 py-10">
                    <div className="bg-white shadow-md border rounded-lg p-6 max-w-3xl mx-auto animate__animated animate__fadeInUp">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-400">
                                <img
                                    src={loggedInAccount.profile}
                                    alt={loggedInAccount.accountFullName}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-purple-600 mt-4">{loggedInAccount.accountFullName}</h2>
                            <p className="text-gray-500">{loggedInAccount.accountEmail}</p>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-4">
                                <button
                                    onClick={() => handleTabChange('Details')}
                                    className={`${
                                        activeTab === 'Details'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => handleTabChange('Reviews')}
                                    className={`${
                                        activeTab === 'Reviews'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Reviews
                                </button>
                                <button
                                    onClick={() => handleTabChange('Recent Posts')}
                                    className={`${
                                        activeTab === 'Recent Posts'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Recent Posts
                                </button>
                                <button
                                    onClick={() => handleTabChange('more')}
                                    className={`${
                                        activeTab === 'more'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    More
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        {renderTabContent()}

                    </div>
                </div>

                <footer className="bg-purple-600 py-6 text-white text-center mt-10">
                    <Inner_Footer />
                </footer>
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-colors"
                                onClick={handleCancelLogout}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
                                onClick={handleConfirmLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Review Modal */}
            {isAddReviewOpen && (
                <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Add a Review</h2>
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Rating:</h3>
                            <div className="flex items-center">
                                {renderStarRating()}
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Your Review:</h3>
                            <textarea
                                value={newReviewDesc}
                                onChange={handleDescChange}
                                className="w-full h-32 px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Write your review here..."
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-colors"
                                onClick={handleCloseAddReview}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors"
                                onClick={handleSubmitReview}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountInfo;
