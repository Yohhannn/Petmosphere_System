import React, {useEffect, useState} from 'react';
import Inner_Footer from '../../components/inner_footer';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import 'animate.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
import moment from 'moment'; // For formatting time
import * as fetch from '../fetchRequest/fetch.js';

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
    const [posts,setPost] = useState([]);
    const [type,setType] = useState([]);
    const [breed,setBreed] = useState([]);
    useEffect(()=>{
        const getPost = async() => {
            const response = await fetch.getPosts();
            setPost(response.data);
            setType(response.type);
            setBreed(response.breed);
        }
        getPost();
    });
    const filteredPost = posts.filter(
        (post) =>
            post.post_status === 'Available' // Added this condition to filter by status
    );

    return (
        <>
            {/* Sticky Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <Inner_Header />
            </div>

            <ScrollToTopButton />

            <div className="bg-gray-100 mt-20 min-h-screen animate__animated animate__fadeIn">
                {/* Hero Section (remains mostly the same) */}
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
                        <Link
                            to="/post-pet"
                            className="inline-block bg-orange-400 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeInUp"
                        >
                            Post a Pet for Adoption
                        </Link>
                    </div>
                </section>

                {/* Main Feed Area */}
                <div className="container mx-auto px-6 py-8">
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <div
                                key={post.pet.pet_id}
                                className="bg-white shadow-md rounded-lg overflow-hidden animate__animated animate__fadeInUp md:flex md:flex-row md:max-w-2xl md:mx-auto"
                            >
                                {/* Image Section (Left on wider screens) */}
                                <div className="w-full md:w-1/2">
                                    { (
                                        <img
                                            src={post.pet.pet_img}
                                            alt={post.pet.pet_name}
                                            className="w-full h-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                                        />
                                    )}
                                </div>

                                {/* Information Section (Right on wider screens) */}
                                <div className="p-4 md:w-1/2 flex flex-col justify-between">
                                    <div>
                                        {/* Owner Info (Always shown at the top) */}
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={post.user.user_prof_pic}
                                                alt={post.user.user_name}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-800">{post.CurrentOwnerFullName}</h3>
                                                <p className="text-xs text-gray-500">
                                                    Posted {moment(post.post_date).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-bold text-purple-600 mb-1">{post.pet.pet_name}</h4>
                                        <p className="text-orange-400 font-semibold mb-2">{post.pet.breed.breed_name} ({post.pet.type.type_name})</p>
                                        <p className="text-gray-700 leading-relaxed mb-3 line-clamp-3">{post.pet.pet_description}</p>
                                        <div className="mt-2"> {/* Container for tags */}
                                            {post.pet.pet_tag.split(',').map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {/* Display Post Description below tags */}
                                        {post.post_descrip && (
                                            <p className="text-gray-600 text-sm mt-3">{post.post_descrip}</p>
                                        )}
                                    </div>

                                    {/* Post Actions */}
                                    <div className="border-t border-gray-200 pt-2 mt-4">
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <Link
                                                to={`/chat/${post.user_id}`}
                                                className="bg-orange-400 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-300"
                                            >
                                                Contact Owner
                                            </Link>
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

                <footer className="bg-purple-600 py-6 text-white text-center mt-10">
                    <Inner_Footer />
                </footer>
            </div>
        </>
    );
};

export default Home;
