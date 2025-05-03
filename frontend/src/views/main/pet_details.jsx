import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Inner_Header from '../../components/inner_header';
import Inner_Footer from '../../components/inner_footer';
import ScrollToTopButton from '../utility/util_scroll_up';
import { posts } from '../../data/postsData';
import moment from 'moment';
import 'animate.css'; // Import animate.css
import * as fetch from '../fetchRequest/fetch.js';

const PetDetails = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        const foundPet = async ()=>{
            const numericId = parseInt(petId);
            const response = await fetch.getPostsBy(numericId);
            setPet(response.data);
        }
        foundPet();
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
                        <h2 className="text-2xl font-bold text-purple-600 mb-2 animate__animated animate__fadeInLeft">{pet.pet.pet_name}</h2> {/* Added fadeInLeft */}
                        <p className="text-orange-400 font-semibold mb-4 animate__animated animate__fadeInLeft">{pet.pet.breed.breed_name} ({pet.pet.type.type_name})</p> {/* Added fadeInLeft */}
                        <p className="text-gray-700 leading-relaxed mb-4 animate__animated animate__fadeInLeft">{pet.pet.pet_description}</p> {/* Added fadeInLeft */}

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Details</h3> {/* Added fadeInLeft */}
                        <ul className="list-disc list-inside text-gray-600 mb-4 animate__animated animate__fadeInLeft"> {/* Added fadeInLeft */}
                            <li>Age: {pet.pet.pet_age}</li>
                            <li>Reason for Adoption: {pet.post_reason}</li>
                            <li>Medical: {pet.pet.pet_medical ? pet.pet.pet_medical : "None"}</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 animate__animated animate__fadeInLeft">Tags</h3> {/* Added fadeInLeft */}
                        <div className="mb-4 animate__animated animate__fadeInLeft"> {/* Added fadeInLeft */}
                            {pet.pet.pet_tag.split(',').map((tag, index) => (
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
                            <p className="text-gray-600">Name: {pet.user.user_name}</p>
                            <p className="text-gray-600">Contact: {pet.user.user_phone}</p>
                            <p className="text-gray-600">Email: {pet.user.user_email}</p>
                            <p className="text-gray-600">Posted: {moment(pet.post_date).format('MMMM D, h:mm A')}</p>
                        </div>

                        <Link
                            to={`/chat/${pet.user.user_id}`}
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
