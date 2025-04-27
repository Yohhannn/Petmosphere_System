import React, { useState } from 'react';
import 'animate.css';
import Out_Header from "~/routes/components/out_header";
import Out_Footer from "~/routes/components/out_footer";
import ScrollToTopButton from "~/routes/utility/util_scroll_up";

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - CONTACT" },
        { name: "description", content: "call us here in PETMOSPHERE!" },
    ];
}

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if any field is empty
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all the fields!');
            return;
        }

        // Assuming successful submission
        alert('Your message has been sent successfully!');
        // Reset form data after successful submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

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
                    style={{ backgroundImage: "url('main_assets/images/image_ctu.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animated__animate animate__bounceIn">Contact Us</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            We’d love to hear from you! Reach out with your questions, feedback, or inquiries.
                        </p>
                    </div>
                </section>

                <div className="max-w-8xl mx-auto 2xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
                    {/* Contact Section */}
                    <section className="py-12 px-6 bg-white animate__animated animate__fadeIn">
                        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Details */}
                            <div className="animate__animated animate__fadeIn">
                                <h2 className="text-3xl font-bold mb-6 text-[#8E57B2] animate__animated animate__fadeInDown">Get in Touch</h2>
                                <p className="text-[#626262] mb-6 animate__animated animate__fadeInDown">
                                    Feel free to reach out to us through any of the methods below. We’re here to help!
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <img
                                            src="/main_assets/icons/icon_call.png"
                                            alt="Phone"
                                            className="w-6 h-6 mr-4"
                                        />
                                        <span className="text-[#626262] font-medium">+63 123 456 7890</span>
                                    </li>
                                    <li className="flex items-center">
                                        <img
                                            src="/main_assets/icons/icon_mail.png"
                                            alt="Email"
                                            className="w-6 h-6 mr-4"
                                        />
                                        <span className="text-[#626262] font-medium">info@petmosphere.com</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Form */}
                            <div className="animate__animated animate__fadeIn">
                                <h2 className="text-3xl font-bold mb-6 text-[#8E57B2] animate__animated animate__fadeInDown">Send Us a Message</h2>
                                <form
                                    className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-[#626262] font-medium mb-2"
                                        >
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight text-black"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-[#626262] font-medium mb-2"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight text-black"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-[#626262] font-medium mb-2"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight text-black"
                                            placeholder="Write your message here"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#8E57B2] text-white py-2 rounded-md hover:bg-[#F69332] transition duration-300"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Out_Footer />
        </>
    );
};

export default ContactUs;
