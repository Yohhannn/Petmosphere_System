import React, {useEffect, useState} from 'react';
import Inner_Footer from '../../components/inner_footer';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faCalendarAlt, faUserCircle, faPlusCircle, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Cookies from 'js-cookie';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';
import {useNavigate, useParams} from "react-router-dom";


export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - ACCOUNT" },
        { name: "description", content: "Manage and update your personal details below." },
    ];
}

const AccountInfo = () => {

    const [loggedInAccount,setAccount] = useState(null);
    const [userReview,setUserReview] = useState([]);
    const [userPost,setUserPost] = useState([]);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Details');
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
    const [newReviewRating, setNewReviewRating] = useState(1);
    const [newReviewDesc, setNewReviewDesc] = useState('');
    const {accId} = useParams();
    const [isMyAcc, setMyAcc] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const userCookie =  Cookies.get('userCredentials');
        const user = userCookie ? JSON.parse(userCookie) : null;
        setUser(user);
        const fetchUserData = async () => {
            try {
                    const response = await fetch.getUserBy(accId);
                    const response2 = await fetch.getReviewByUserId(accId);
                    const response3 = await fetch.getPostByUserId(accId);
                    setAccount(response.data);
                    setUserReview(response2.data);
                    setUserPost(response3.data);
                    setMyAcc(user.user.user_id === parseInt(accId));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [accId]);

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };
    const handleConfirmLogout = () => {
        Cookies.remove('userCredentials');
        // Perform logout logic here (e.g., clearing session, local storage)
        setIsLogoutModalOpen(false);
        // Redirect to the home page
        navigate('/');
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
    const fetchUser = async() =>{
        const response = await fetch.getUserBy(accId);
        setAccount(response.data);
    }
    const fetchReview = async() =>{
        const response = await fetch.getReviewByUserId(accId);
        setUserReview(response.data);
    }
    const fetchPost = async() =>{
        const response = await fetch.getPostByUserId(accId);
        setUserPost(response.data);
    }
    const handleCloseAddReview = () => {
        setIsAddReviewOpen(false);
        setNewReviewRating(1);
        setNewReviewDesc('');
    };

    const handleRatingChange = (rating) => {
        setNewReviewRating(rating);
    };

    const handleDescChange = (event) => {
        setNewReviewDesc(event.target.value);
    };

    const handleSubmitReview = async() => {
        const reviewObject = {
            "rev_rating" : newReviewRating,
            "rev_date" : new Date().toISOString().slice(0, 10),
            "rev_description" : newReviewDesc,
            "rev_rated_by" : user.user.user_id,
            "user_id" : accId
        }
        try{
            const response = await send.sendReview(reviewObject);
            console.log(response.message);
            fetchReview();
        }catch (error){
            console.log("Something went wrong! Error "+error);
        }

        handleCloseAddReview();
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
                            <p>{loggedInAccount.user_id}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Full Name:</h3>
                            <p>{loggedInAccount.user_name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Email:</h3>
                            <p>{loggedInAccount.user_email}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Phone:</h3>
                            <p>{loggedInAccount.user_phone}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Address:</h3>
                            <p>{loggedInAccount.user_location}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-purple-600">Date Created:</h3>
                            <p>{loggedInAccount.user_createdate}</p>
                        </div>
                    </div>
                );
            case 'Reviews':
                console.log(userReview);
                if(userReview.length <= 0){
                    return (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-purple-600">Your Reviews</h3>
                            </div>
                            <p className="text-gray-700">No reviews yet for this account.</p>
                        </div>

                    );
                }
                const totalRating = userReview
                    .map(review => review.rev_rating)
                    .reduce((sum, rating) => sum + rating, 0);
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-purple-600">Your Reviews</h3>
                        </div>

                        {userReview  && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700">
                                    Average Rating: <span className="text-yellow-500">{(totalRating/userReview.length).toFixed(1)}</span> ({userReview.length} reviews)
                                </h4>
                            </div>
                        )}

                        {userReview ? (
                            <ul className="space-y-4">
                                {userReview.map((review) => (
                                    <li key={review.rev_id} className="bg-white border rounded-md shadow-sm p-4">
                                        <div className="flex items-center mb-2 text-gray-700">
                                            <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-xl text-purple-500" />
                                            <span className="font-semibold">{review.review_by.user_name}</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {[...Array(review.rev_rating)].map((_, index) =>(
                                                <FontAwesomeIcon key={index} icon={faStarSolid} className="mr-1 text-yellow-500" />
                                            ))}
                                            <span className="text-yellow-500 font-semibold">{review.rev_rating}</span>
                                        </div>
                                        <p className="text-gray-800 mb-3">{review.rev_description}</p>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                            <span>{review.rev_date}</span>
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
                console.log(userPost);
                // Filter posts where the OwnerAccountID matches the logged-in account ID
                if(userPost.length <= 0){
                    return (
                        <p className="text-gray-700">You haven't posted any pets for adoption yet.</p>
                    );
                }
                return (
                    <div>
                        <h3 className="font-semibold text-purple-600 mb-2">Your Recent Posts</h3>
                        {userPost.length > 0 ? (
                            <ul className="space-y-4">
                                {userPost.map(post => (
                                    <li key={post.pet.pet_id} className="bg-white border rounded-md shadow-sm p-4">
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={post.pet.pet_img}
                                                alt={post.pet.pet_name}
                                                className="w-16 h-16 object-cover rounded mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{post.pet.pet_name}</h4>
                                                <p className="text-sm text-gray-600">{post.pet.breed.breed_name} ({post.pet.type.type_name})</p>
                                                <p className="text-xs text-gray-500">Posted {moment(post.post_date).fromNow()}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed line-clamp-2">{post.pet.pet_description}</p>
                                        {post.post_descrip && (
                                            <p className="text-gray-600 text-sm mt-2 italic">"{post.post_descrip}"</p>
                                        )}
                                        <div className="mt-2">
                                            {post.pet.pet_tag.split(',').map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-orange-200 rounded-full px-2 py-1 text-xs font-semibold text-orange-700 mr-2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${post.pet.pet_status === 'Available' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                                {post.pet.pet_status}
                                            </span>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${post.post_status === 'Approved' ? 'bg-blue-200 text-blue-700' : post.post_status === 'Rejected' ? 'bg-red-200 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
                                                {post.post_status}
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

            case 'History':

                return (
                    <div>
                        <h3 className="font-semibold text-purple-600 mb-2">Adoption History</h3>
                        <p className="text-gray-700">Additional account settings or information will appear here.</p>
                    </div>
                );

            case 'More':
                return (
                    <div>
                        <h3 className="font-semibold text-purple-600 mb-2">More Options</h3>
                        <p className="text-gray-700">Additional account settings or information will appear here.</p>
                        {isMyAcc && (
                            <div className="flex justify-end mt-6 space-x-4">
                                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors">
                                    Edit Profile
                                </button>
                                <button
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
                                    onClick={handleLogoutClick}
                                >
                                    Logout</button>
                            </div>)}
                    </div>
                );
            default:
                return null;
        }
    };
    if (!loggedInAccount) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
            <img
                src="/main_assets/gifs/dog.gif"
                alt="animated-gif"
                className="w-32 h-32 animate__animated animate__stretch mb-4"
            />
            <div className="text-purple-500 text-xl font-bold">Loading account...</div>
            </div>

        );
    }
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
                    style={{ backgroundImage: "url('../main_assets/images/image_main_banner3.png')" }}
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
                                    src={loggedInAccount.user_img}
                                    alt={loggedInAccount.user_name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-purple-600 mt-4">{loggedInAccount.user_name}</h2>
                            <p className="text-gray-500">{loggedInAccount.user_email}</p>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-4">
                                <button
                                    onClick={() => {handleTabChange('Details');fetchUser()}}
                                    className={`${
                                        activeTab === 'Details'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => {handleTabChange('Reviews');fetchReview();}}
                                    className={`${
                                        activeTab === 'Reviews'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Reviews
                                </button>
                                <button
                                    onClick={() => {handleTabChange('Recent Posts');fetchPost()}}
                                    className={`${
                                        activeTab === 'Recent Posts'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Recent Posts
                                </button>

                                {/* Only the logginin account can see */}
                                {isMyAcc && (
                                    <button
                                    onClick={() => handleTabChange('History')}
                                    className={`${
                                        activeTab === 'History'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    History
                                </button>
                                )}

                                {/* Only the logginin account can see */}
                                {isMyAcc && (
                                    <button
                                    onClick={() => handleTabChange('More')}
                                    className={`${
                                        activeTab === 'More'
                                            ? 'border-purple-600 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Settings
                                </button>
                                )}
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

            {/* Add Review Modal - NAA PA DIRI ANG CODE D HAHA */}
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
                                className="w-full h-32 px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"  // Added bg-white here
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
