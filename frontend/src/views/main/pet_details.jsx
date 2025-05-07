import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import moment from 'moment';
import 'animate.css'; // Import animate.css
import * as fetch from '../fetchRequest/fetch.js';

const PetDetails = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();
    const [showAdoptionDialog, setShowAdoptionDialog] = useState(false); // State for the dialog
    const [adoptionMessage, setAdoptionMessage] = useState(''); // State for the adoption message

    // Placeholder for the logged-in user's ID.
    // **Replace this with your actual way of getting the logged-in user ID.**
    const loggedInUserId = 8;

    useEffect(() => {
        const foundPet = async () => {
            const numericId = parseInt(petId);
            const response = await fetch.getPostsBy(numericId);
            setPet(response.data);
        };
        foundPet();
    }, [petId]);

    if (!pet) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <img
                    src="/main_assets/gifs/dog.gif"
                    alt="animated-gif"
                    className="w-32 h-32 animate__animated animate__stretch mb-4"
                />
                <div className="text-purple-500 text-xl font-bold">Loading Pet Details...</div>
            </div>
        );
    }

    const handleAdoptionRequest = () => {
        // In a real app, you'd send an API request here.
        console.log('Adoption request sent for:', pet, 'with message:', adoptionMessage);
        setShowAdoptionDialog(false); // Close the dialog
        setAdoptionMessage(''); // Clear the message
        // You might also want to show a success message to the user.
    };

    const handleCancelAdoption = () => {
        setShowAdoptionDialog(false);
        setAdoptionMessage(''); // Also clear message on cancel
    };

    return (
        <div className="min-h-screen bg-gray-100 animate__animated animate__fadeIn">
            <Inner_Header />
            <ScrollToTopButton />
            <div className="container mx-auto py-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden md:flex animate__animated animate__fadeInUp">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        {pet.pet.pet_img && Array.isArray(pet.pet.pet_img) && pet.pet.pet_img.length > 0 ? (
                            <img
                                src={pet.pet.pet_img[0]}
                                alt={pet.pet.pet_name}
                                className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-r-none">
                                <span className="text-gray-500">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="p-6 md:w-1/2">

                        <div className="absolute top-2 right-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-purple-600 hover:bg-purple-500 text-purple-600 rounded-full p-2 transition-colors"
                            >
                                <img src="/main_assets/icons/icon_return.svg" alt="return" className='w-5 h-5' />
                            </button>
                        </div>


                        {/* SHOULD BE "AVAILABLE" or "ADOPTED" ONLY! */}
                        <p className={(
                            pet.pet.pet_status === "Adopted" && "text-red-500",
                            pet.pet.pet_status === "Available" && "text-green-500"
                        )}>
                            <b>{pet.pet.pet_status}</b>
                        </p>

                        <h2 className="text-2xl font-bold text-purple-600 mb-2 animate__animated animate__fadeInLeft flex items-center">
                            <img src="/main_assets/icons/icon_pet.png" className="w-5 h-5 mr-2" alt="petname" />
                            {pet.pet.pet_name}
                        </h2>

                        <p className="text-orange-400 font-semibold mb-4 animate__animated animate__fadeInLeft">{pet.pet.breed.breed_name} ({pet.pet.type.type_name})</p>
                        <p className="text-gray-700 leading-relaxed mb-4 animate__animated animate__fadeInLeft">{pet.pet.pet_description}</p>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Details</h3>
                        <ul className="list-disc list-inside text-gray-600 mb-4 animate__animated animate__fadeInLeft">
                            <li>Age: {pet.pet.pet_age}</li>
                            <li>Reason for Adoption: {pet.post_reason}</li>
                            <li>Medical: {pet.pet.pet_medical ? pet.pet.pet_medical : "None"}</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Tags</h3>
                        <div className="mb-4 animate__animated animate__fadeInLeft">
                            {pet.pet.pet_tag.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Contact Owner</h3>
                        <div className="mb-4 animate__animated animate__fadeInLeft">
                            <p className="text-gray-600">
                                Name:{" "}
                                <Link to={`/account/${pet.user.user_id}`} className="text-blue-600 hover:underline">
                                    {pet.user.user_name}
                                </Link>
                            </p>
                            <p className="text-gray-600">Contact: {pet.user.user_phone}</p>
                            <p className="text-gray-600">Email: {pet.user.user_email}</p>
                            <p className="text-gray-600">Posted: {moment(pet.post_date).format('MMMM D, h:mm A')}</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {pet.user_id !== loggedInUserId && (
                                <Link
                                    to={`/chat/${pet.user.user_id}`}
                                    className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-300 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeInUp"
                                >
                                    <img src="/main_assets/icons/icon_chat_owner.png" alt="chat_with_owner" className='w-5 h-5' />
                                    <span> Chat with Owner</span>
                                </Link>
                            )}

                            {pet.user_id === loggedInUserId ? (
                                <Link
                                    to="/inbox"
                                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeInUp"
                                >
                                    <span>View Adoption Requests</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => setShowAdoptionDialog(true)}
                                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeInUp"
                                >
                                    <img src="/main_assets/icons/icon_heart.png" alt="Make Adoption Request" className='w-5 h-5' />
                                    <span>Make Adoption Request</span>
                                </button>
                            )}
                        </div>


                    </div>
                </div>
            </div>

            {/* Custom Adoption Confirmation Modal */}
            {showAdoptionDialog && (
                <div className="fixed inset-0 bg-green-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Adoption Request</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to send an adoption request for {pet.pet.pet_name}?</p>
                        <textarea
                            value={adoptionMessage}
                            onChange={(e) => setAdoptionMessage(e.target.value)}
                            placeholder="Enter your message to the owner..."
                            className="w-full h-32 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4 text-gray-700"
                        />
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-colors"
                                onClick={handleCancelAdoption}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-400 transition-colors"
                                onClick={handleAdoptionRequest}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetails;