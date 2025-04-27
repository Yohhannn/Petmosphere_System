import React, { useState } from 'react';
import In_Header from "~/routes/components/in_header";
import In_Footer from "~/routes/components/in_footer";
import ScrollToTopButton from "~/routes/utility/util_scroll_up";
import 'animate.css';
import { posts } from "~/routes/main_pages/postsData";

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - HOME" },
        { name: "description", content: "Discover your perfect pet match and make a difference by giving them a loving home." },
    ];
}

const Home = () => {
    const [searchQuery] = useState('');

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
                    style={{ backgroundImage: "url('main_assets/images/image_main_banner.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">Welcome to PETMOSPHERE</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            Discover your perfect pet match and make a difference by giving them a loving home.
                        </p>
                    </div>
                </section>
                <div className="container mx-auto px-6 py-10">
                    <div className="space-y-8">
                        {filteredPets.map((post) => (
                            <div
                                key={post.id}
                                className="card bg-white shadow-md border rounded-lg p-4 animate__animated animate__fadeInUp"
                            >
                                {/* Post Header */}
                                <div className="flex items-center mb-4">
                                    <img
                                        src={`https://via.placeholder.com/50?text=${post.owner[0]}`} // Placeholder avatar
                                        alt={post.owner}
                                        className="w-12 h-12 rounded-full border border-gray-300 mr-3"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{post.owner}</h3>
                                        <p className="text-sm text-gray-500">{post.contact}</p>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div>
                                    <img
                                        src={post.img}
                                        alt={post.petName}
                                        className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-300"
                                    />
                                    <h3 className="text-xl font-bold text-[#8E57B2] mb-1">{post.petName}</h3>
                                    <p className="text-[#F69332] font-semibold mb-2">{post.breed}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.description}</p>
                                </div>

                                {/* Call to Action */}
                                <div className="flex justify-end">
                                    <button className="px-4 py-2 bg-[#8E57B2] text-white rounded-lg shadow hover:bg-[#F69332] transition-colors">
                                        Contact Owner
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredPets.length === 0 && (
                            <p className="text-center text-gray-600 mt-10 animate__animated animate__fadeIn">
                                No posts available. Be the first to share a pet for adoption!
                            </p>
                        )}
                    </div>
                </div>

                <footer className="bg-[#8E57B2] py-6 text-white text-center mt-10">
                    <In_Footer />
                </footer>
            </div>
        </>
    );
};

export default Home;
