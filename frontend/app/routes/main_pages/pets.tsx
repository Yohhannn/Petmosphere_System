import React, { useState } from 'react';
import ScrollToTopButton from "~/routes/utility/util_scroll_up";
import In_Header from "~/routes/components/in_header";
import In_Footer from "~/routes/components/in_footer";
import {posts} from "~/routes/main_pages/postsData";
import 'animate.css';

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - PETS" },
        { name: "description", content: "See posts from other pet lovers who are looking for a home for their furry friends." },
    ];
}

const Pets = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filtering posts based on search query
    const filteredPets = posts.filter(
        (post) =>
            post.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Sticky Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <In_Header />
            </div>

            <ScrollToTopButton />

            <div className="bg-gray-100 mt-20 min-h-screen animate__animated animate__fadeIn">
                {/* Hero Section */}
                <section
                    className="mt-20 bg-gradient-to-t from-[#8E57B2] to-[#F69332] text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
                    style={{ backgroundImage: "url('main_assets/images/image_main_banner2.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">Adopt and Make a Difference</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            See posts from other pet lovers who are looking for a home for their furry friends.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-6 py-10">
                    <div className="mb-6 text-center">
                        <input
                            type="text"
                            placeholder="Search for a pet..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F69332]"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPets.map((post) => (
                            <div
                                key={post.id}
                                className="card bg-white shadow-md border border-[#8E57B2]/20 rounded-xl p-6 transform transition-transform hover:scale-105 animate__animated animate__fadeInUp"
                            >
                                <img
                                    src={post.img}
                                    alt={post.petName}
                                    className="w-full h-48 object-cover rounded-lg mb-4 border-4 border-[#F69332]"
                                />
                                <h3 className="text-lg font-bold text-[#8E57B2] mb-1">{post.petName}</h3>
                                <p className="text-[#F69332] font-semibold mb-2">{post.breed}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{post.description}</p>
                                <button className="mt-4 px-4 py-2 bg-[#8E57B2] text-white rounded-lg shadow hover:bg-[#F69332] transition-colors">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredPets.length === 0 && (
                        <p className="text-center text-gray-600 mt-10 animate__animated animate__fadeIn">
                            No pets found. Try adjusting your search!
                        </p>
                    )}
                </div>

                <footer className="bg-[#8E57B2] py-6 text-white text-center mt-10">
                    <In_Footer />
                </footer>
            </div>
        </>
    );
};

export default Pets;
