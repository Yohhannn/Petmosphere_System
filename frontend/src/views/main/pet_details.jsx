import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Inner_Header from '../../components/inner_header';
import Inner_Footer from '../../components/inner_footer';
import ScrollToTopButton from '../utility/util_scroll_up';
import { posts } from '../../data/postsData';
import moment from 'moment';
import 'animate.css'; // Import animate.css

const PetDetails = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const foundPet = posts.find((p) => p.PetID === petId);
        setPet(foundPet);
    }, [petId]);

    if (!pet) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 animate__animated animate__fadeIn"> {/* Added fadeIn */}
                <Inner_Header />
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-orange-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 animate__animated animate__fadeInUp"> {/* Added fadeInUp */}
                        <h1 className="text-2xl font-bold text-gray-800">Loading Pet Details...</h1>
                    </div>
                </div>
                <Inner_Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 animate__animated animate__fadeIn"> {/* Added fadeIn */}
            <Inner_Header />
            <ScrollToTopButton />
            <div className="container mx-auto py-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden md:flex animate__animated animate__fadeInUp"> {/* Added fadeInUp */}
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        {pet.PetImages && Array.isArray(pet.PetImages) && pet.PetImages.length > 0 ? (
                            <img
                                src={pet.PetImages[0]}
                                alt={pet.PetName}
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
                        <h2 className="text-2xl font-bold text-purple-600 mb-2 animate__animated animate__fadeInLeft">{pet.PetName}</h2> {/* Added fadeInLeft */}
                        <p className="text-orange-400 font-semibold mb-4 animate__animated animate__fadeInLeft">{pet.Breed} ({pet.PetType})</p> {/* Added fadeInLeft */}
                        <p className="text-gray-700 leading-relaxed mb-4 animate__animated animate__fadeInLeft">{pet.PetDescription}</p> {/* Added fadeInLeft */}

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Details</h3> {/* Added fadeInLeft */}
                        <ul className="list-disc list-inside text-gray-600 mb-4 animate__animated animate__fadeInLeft"> {/* Added fadeInLeft */}
                            <li>Age: {pet.PetAge}</li>
                            <li>Reason for Adoption: {pet.Reason}</li>
                            <li>History: {pet.History}</li>
                            <li>Health: {pet.Health}</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Tags</h3> {/* Added fadeInLeft */}
                        <div className="mb-4 animate__animated animate__fadeInLeft"> {/* Added fadeInLeft */}
                            {pet.PetTags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Contact Owner</h3>  {/* Added fadeInLeft */}
                        <div className="mb-4 animate__animated animate__fadeInLeft">  {/* Added fadeInLeft */}
                            <p className="text-gray-600">Name: {pet.CurrentOwnerFullName}</p>
                            <p className="text-gray-600">Username: {pet.CurrentOwnerAccountDisplayName}</p>
                            <p className="text-gray-600">Contact: {pet.ContactNumber}</p>
                            <p className="text-gray-600">Email: {pet.Email}</p>
                            <p className="text-gray-600">Posted: {moment(pet.TimePosted).format('MMMM D, h:mm A')}</p>
                        </div>

                        <Link
                            to={`/chat/${pet.OwnerAccountID}`}
                            className="inline-block bg-orange-400 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeInUp" // Added fadeInUp
                        >
                            Chat with Owner
                        </Link>
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-block ml-4 text-purple-600 hover:underline font-semibold animate__animated animate__fadeInUp"  // Added fadeInUp
                        >
                            Return
                        </button>
                    </div>
                </div>
            </div>
            <Inner_Footer />
        </div>
    );
};

export default PetDetails;
