import React from 'react';
import 'animate.css';
import Out_Header from "~/routes/components/out_header";
import Out_Footer from "~/routes/components/out_footer";
import ScrollToTopButton from "~/routes/utility/util_scroll_up";

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - ABOUT" },
        { name: "description", content: "What is PETMOSPHERE?" },
    ];
}

const AboutUs: React.FC = () => {
    return (
        <>
            {/* Sticky Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <Out_Header />
            </div>
            <ScrollToTopButton />
            <div className="bg-gray-100">
                {/* Hero Section */}
                <section
                    className="mt-20 bg-gradient-to-t from-[#8E57B2] to-[#F69332] text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
                    style={{ backgroundImage: "url('main_assets/images/image_about.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">About Petmosphere</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            Learn more about our commitment to connecting people and pets through love and adoption.
                        </p>
                    </div>
                </section>

                <div className="max-w-8xl mx-auto 2xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
                    {/* About Content Section */}
                    <section className="py-12 px-6 bg-white animate__animated animate__fadeIn">
                        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* About Description */}
                            <div className="animate__animated animate__fadeInLeft">
                                <h2 className="text-3xl font-bold mb-6 text-[#8E57B2]">Our Mission</h2>
                                <p className="text-[#626262] mb-6 text-justify">
                                    At Petmosphere, our mission is to create a community-driven platform where pets find their forever homes.
                                    We strive to make adoption easy, accessible, and filled with joy for both pets and their future owners.
                                </p>
                                <h3 className="text-xl font-semibold text-[#F69332] mb-2">Why Petmosphere?</h3>
                                <p className="text-[#626262] text-justify">
                                    Petmosphere is more than just a website — it’s a movement to promote responsible pet ownership and
                                    celebrate the bond between humans and their furry companions. We are passionate about creating
                                    an engaging experience that helps adopters make informed decisions and supports shelters in their efforts.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Additional Features Section */}
                    <section className="py-12 px-6 animate__animated animate__fadeInUp">
                        <div className="container mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6 text-[#8E57B2]">What We Offer</h2>
                            <p className="text-[#626262] mb-6 max-w-3xl mx-auto">
                                Petmosphere provides a platform to browse pets for adoption, learn about their care needs,
                                and connect with shelters and rescues near you. From detailed pet profiles to educational
                                resources, we aim to make every step of the adoption journey as smooth and fulfilling as possible.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Out_Footer />
        </>
    );
};

export default AboutUs;