import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import moment from 'moment';
import 'animate.css';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';
import Cookies from "js-cookie";

const PetDetails = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [pet_id, setPetId] = useState(0);
    const [user_id, setUserId] = useState(0);
    const [verify, setVerification] = useState(false);
    const navigate = useNavigate();
    const [showAdoptionDialog, setShowAdoptionDialog] = useState(false);
    const [adoptionMessage, setAdoptionMessage] = useState('');
    const [adoptionVerify, setAdoptionVerify] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isButton,setIsButton] = useState(false);
    const userCookie =  Cookies.get('userCredentials');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const loggedInUserId = user.user.user_id;

    useEffect(() => {
        const foundPet = async () => {
            const numericId = parseInt(petId);
            const response = await fetch.getPostsByPet(numericId);
            setPet(response.data[0]);
        };
        foundPet();
    }, [petId]);

    const handleVerifyNowClick = () => {
        setIsModalOpen(false);
        navigate('/account/verify');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const AdoptionObject = () => {
        return {
            "req_status": "Pending",
            'req_date': new Date().toISOString().split('T')[0],
            'user_id': user_id,
            'pet_id': pet_id,
            'req_message': adoptionMessage,
        };
    };

    const handleAdoptionButtonClick = async (pet_id) => {
        setPetId(pet.pet_id); // Save pet ID for request
        const userDetails = await fetch.getUserBy(loggedInUserId);
        const isVerified = userDetails.data.user_verified !== 0;
        setUserId(userDetails.data.user_id);
        const adoptionCheck = await send.checkAdoption({user_id:loggedInUserId,pet_id:pet_id});
        console.log(pet_id);
        if (adoptionCheck.data) {
            setError('You already made a request for this pet.');
            setAdoptionVerify(true); // Already requested
            setVerification(true);   // So we hide the verify button
            setIsModalOpen(true);
        } else if (!isVerified && loggedInUserId.user_valid_id_pic) {
            setVerification(false); // Not verified, show verify button
            setAdoptionVerify(false);
            setIsModalOpen(true);
            setIsButton(false);
            setError('Your verification request is still reviewed by an administrator. Verification takes up to 1-3 days process.');
        } else if(!isVerified){
            setError('Please verify your account first.');
            setVerification(false); // Not verified, show verify button
            setAdoptionVerify(false);
            setIsModalOpen(true);
            setIsButton(true);
        }else {
            setVerification(true); // Verified
            setAdoptionVerify(false);
            setShowAdoptionDialog(true);
        }
    };

    const handleAdoptionRequest = async () => {
        const alertPetRequest = {
            alert_type: "adoption_request",
            user_id : user.user.user_id,
            admin_id : null,
            alert_title : "New Adoption Request",
            alert_message : "New Adoption Request by " +user.user.user_name
        }
        const response = await send.sendAdoptionRequest(AdoptionObject());
        if (response.message.includes('successfully')) {
            await send.sendAlert(alertPetRequest);
            setShowAdoptionDialog(false);
            setAdoptionMessage('');
            console.log(response.message);
        } else {
            console.log(response.message);
        }
    };

    const handleCancelAdoption = () => {
        setShowAdoptionDialog(false);
        setAdoptionMessage('');
    };

    if (!pet) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <img src="/main_assets/gifs/dog.gif" alt="loading" className="w-32 h-32 mb-4" />
                <div className="text-purple-500 text-xl font-bold">Loading Pet Details...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 animate__animated animate__fadeIn">
            <Inner_Header />
            <ScrollToTopButton />
            <div className="container mx-auto py-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden md:flex animate__animated animate__fadeInUp">
                    <div className="md:w-1/2">
                        {pet.post_img &&(
                            <img
                                src={pet.post_img}
                                alt={pet.pet.pet_name}
                                className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                            />
                        )}
                    </div>

                    <div className="p-6 md:w-1/2">
                        <div className="absolute top-2 right-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-purple-600 hover:bg-purple-500 text-purple-600 rounded-full p-2 transition-colors"
                            >
                                <img src="/main_assets/icons/icon_return.svg" alt="return" className='w-5 h-5' />
                            </button>
                        </div>

                        <p className={pet.pet.pet_status === "Adopted" ? "text-red-500" : "text-green-500"}>
                            <b>{pet.pet.pet_status}</b>
                        </p>

                        <h2 className="text-2xl font-bold text-purple-600 mb-2">{pet.pet.pet_name}</h2>
                        <p className="text-orange-400 font-semibold mb-4">{pet.pet.breed.breed_name} ({pet.pet.type.type_name})</p>
                        <p className="text-gray-700 mb-4">{pet.pet.pet_description}</p>

                        <ul className="list-disc text-gray-600 mb-4">
                            <li>Age: {pet.pet.pet_age}</li>
                            <li>Reason for Adoption: {pet.post_reason}</li>
                            <li>Medical: {pet.pet.pet_medical || "None"}</li>
                        </ul>

                        <div className="mb-4">
                            {pet.pet.pet_tag.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                Name: <Link to={`/account/${pet.user.user_id}`} className="text-blue-600 hover:underline">{pet.user.user_name}</Link>
                            </p>
                            <p className="text-gray-600">Contact: {pet.user.user_phone}</p>
                            <p className="text-gray-600">Email: {pet.user.user_email}</p>
                            <p className="text-gray-600">Posted: {moment(pet.post_date).format('MMMM D, h:mm A')}</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {pet.user_id === loggedInUserId && pet.pet.pet_status !== "Adopted" ? (
                                <Link
                                    to="/inbox"
                                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-full shadow-md"
                                >
                                    <span>View Adoption Requests</span>
                                </Link>
                            ) : (
                                pet.pet.pet_status !== "Adopted" &&(
                                <button
                                    onClick={async ()=>handleAdoptionButtonClick(pet.pet.pet_id)}
                                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-full shadow-md"
                                >
                                    <img src="/main_assets/icons/icon_heart.png" alt="Adopt" className='w-5 h-5' />
                                    <span>Make Adoption Request</span>
                                </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for errors */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center shadow-lg animate__animated animate__zoomIn">
                        <h2 className="text-xl font-semibold mb-4 text-purple-600">You cannot make an adoption request. </h2>
                        <p className="text-gray-700 mb-6">{error}</p>

                        {adoptionVerify ? (
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
                            >
                                Close
                            </button>
                        ) : (
                            <div className="flex justify-center">
                                {(isButton &&
                                <button
                                    onClick={handleVerifyNowClick}
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 mr-2"
                                >
                                    Verify Now!
                                </button>)}
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal for confirming adoption */}
            {showAdoptionDialog && (
                <div className="fixed inset-0 bg-green-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Adoption Request</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to send an adoption request for {pet.pet.pet_name}?</p>
                        <textarea
                            value={adoptionMessage}
                            onChange={(e) => setAdoptionMessage(e.target.value)}
                            placeholder="Enter your message to the owner..."
                            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:outline-none"
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                onClick={handleCancelAdoption}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAdoptionRequest}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetDetails;
