import React, { useEffect, useState } from 'react';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import * as fetch from '../fetchRequest/fetch.js';
import Cookies from 'js-cookie';

export function meta() {
    return [
        { title: '( ✦ ) PETMOSPHERE - HOME' },
        {
            name: 'description',
            content:
                'Discover your perfect pet match and make a difference by giving them a loving home.',
        },
    ];
}

const Home = () => {
    const [posts, setPost] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [verified, setVerified] = useState(false);

    const userCookie = Cookies.get('userCredentials');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const loggedInUserId = user?.user?.user_id;

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch.getPosts();
            const filteredPost = response.data.filter(
                (post) => post.post_status === 'Available'
            );
            setPost(filteredPost);
        };
        getPost();
    }, []);

    useEffect(() => {
        const checkVerificationStatus = async () => {
            if (loggedInUserId) {
                const userData = await fetch.getUserBy(loggedInUserId);
                setVerified(userData?.data?.user_verified === 0); // Set the state
            } else {
                setVerified(false);
            }
        };
        checkVerificationStatus();
    }, [loggedInUserId]);

    const handlePostPetClick = () => {
        if (verified) {
            navigate('/post_pet');
        } else {
            setIsModalOpen(true);
        }
    };

    const handleVerifyNowClick = () => {
        setIsModalOpen(false);
        navigate('/account/verify/:accId');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <Inner_Header />
            </div>

            <ScrollToTopButton />

            <div className="bg-gray-100 mt-20 min-h-screen animate__animated animate__fadeIn">
                <section
                    className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-16 text-center bg-cover bg-center animate__animated animate__fadeIn"
                    style={{
                        backgroundImage: "url('main_assets/images/image_main_banner.png')",
                    }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate__animated animate__bounceIn">
                            Welcome to PETMOSPHERE
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto mb-6">
                            Discover adorable pets looking for their forever homes and connect with their current owners.
                        </p>
                        <button
                            onClick={handlePostPetClick}
                            className="inline-block bg-orange-400 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeInUp"
                        >
                            Post a Pet for Adoption
                        </button>
                    </div>
                </section>

                <div className="container mx-auto px-6 py-8">
                    <div className="space-y-6">
                        {posts.map((post, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg overflow-hidden animate__animated animate__fadeInUp md:flex md:flex-row md:max-w-2xl md:mx-auto"
                            >
                                <div className="w-full md:w-1/2">
                                    {(
                                        <img
                                            src={post.pet.pet_img}
                                            alt={post.pet.pet_name}
                                            className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                                        />
                                    )}
                                </div>

                                <div className="p-4 md:w-1/2 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={post.user.user_prof_pic}
                                                alt={post.user.user_name}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-800">
                                                    <Link to={`/account/${post.user.user_id}`} className="text-gray-800 hover:underline">
                                                        {post.user.user_name}
                                                    </Link>
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    Posted {moment(post.post_date).fromNow()}
                                                </p>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-bold text-purple-600 mb-2 animate__animated animate__fadeInLeft flex items-center">
                                            <img src="/main_assets/icons/icon_pet.png" className="w-5 h-5 mr-2" alt="petname" />
                                            <Link to={`/pet/${post.post_id}/details`}>{post.pet.pet_name}</Link>
                                        </h2>

                                        <p className="text-orange-400 font-semibold mb-2">{post.pet.breed.breed_name} ({post.pet.type.type_name})</p>
                                        <p className="text-gray-700 leading-relaxed mb-3 line-clamp-3">{post.pet.pet_description}</p>
                                        <div className="mt-2">
                                            {post.pet.pet_tag.split(',').map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {post.post_descrip && (
                                            <p className="text-gray-600 text-sm mt-3">{post.post_descrip}</p>
                                        )}
                                    </div>

                                    <div className="border-t border-gray-200 pt-2 mt-4">
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            {post.user_id === loggedInUserId ? (
                                                <Link
                                                    to="/inbox"
                                                    className="bg-purple-600 hover:bg-orange-400 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300"
                                                >
                                                    View Adoption Requests
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={`/chat/${post.user_id}`}
                                                    className="bg-orange-400 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300"
                                                >
                                                    <img src="/main_assets/icons/icon_chat_owner.png" alt="chat_with_owner" className='w-5 h-5' />
                                                </Link>
                                            )}
                                            <Link to={`/pet/${post.post_id}/details`} className="text-purple-600 hover:underline font-semibold">
                                                View More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {posts.length === 0 && (
                            <p className="text-center text-gray-600 mt-10 animate__animated animate__fadeIn">
                                No available pets matching your search.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center shadow-lg animate__animated animate__zoomIn">
                        <h2 className="text-xl font-semibold mb-4 text-purple-600">Verify Your Account</h2>
                        <p className="text-gray-700 mb-6">
                            To post a pet for adoption, you need to verify your account.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleVerifyNowClick}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 mr-2"
                            >
                                Verify Now!
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
