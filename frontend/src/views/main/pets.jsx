import React, {useEffect, useState} from 'react';
import Inner_Footer from '../../components/inner_footer';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import { posts } from '../../data/postsData';
import 'animate.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as fetch from '../fetchRequest/fetch.js';
export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - PETS" },
        { name: "description", content: "See posts from other pet lovers who are looking for a home for their furry friends." },
    ];
}

const Pets = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pets,setPets] = useState([]);
    // Filtering posts based on search query (using PetName and Breed)
    useEffect(() => {
        const pets = async() => {
            const response = await fetch.getPosts();
            setPets(response.data);
        }
        pets();
    }, []);
    const filteredPets = pets.filter(
        (post) =>
            post.pet.pet_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.pet.breed.breed_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-16 text-center bg-cover bg-center animate__animated animate__fadeIn"
                    style={{ backgroundImage: "url('main_assets/images/image_main_banner2.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate__animated animate__bounceIn">Adopt Your New Best Friend</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            Browse through our adorable pets waiting for a loving home.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-6 py-8">
                    <div className="mb-6 text-center">
                        <input
                            type="text"
                            placeholder="Search by name or breed..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredPets.map((post,index) => (
                            <div
                                key={index}
                                className="card bg-white shadow-md border border-purple-600/20 rounded-xl p-6 transform transition-transform hover:scale-105 animate__animated animate__fadeInUp"
                            >
                                {/* Pet Image (display the first image if available) */}

                                    <img
                                        src={post.pet.pet_img}
                                        alt={post.pet.pet_name}
                                        className="w-full h-48 object-cover rounded-lg mb-4 border-4 border-orange-400"
                                    />


                                <h3 className="text-lg font-bold text-purple-600 mb-1">{post.pet.pet_name}</h3>
                                <p className="text-orange-400 font-semibold mb-2">{post.pet.breed.breed_name} ({post.pet.type.type_name})</p>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{post.pet.pet_description}</p>
                                <div className="mt-2 flex flex-wrap"> {/* Changed to a flex wrap container */}
                                    {post.pet.pet_tag.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-orange-700 mr-2 mb-2" // Added mr-2 and mb-2 for spacing
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Post Actions */}
                                <div className="mt-4 flex justify-end">
                                    <Link to={`/pet/${post.pet.pet_id}/details`} className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors text-sm font-semibold">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPets.length === 0 && (
                        <p className="text-center text-gray-600 mt-10 animate__animated animate__fadeIn">
                            No pets found matching your search criteria.
                        </p>
                    )}
                </div>

                <footer className="bg-purple-600 py-6 text-white text-center mt-10">
                    <Inner_Footer />
                </footer>
            </div>
        </>
    );
};

export default Pets;
