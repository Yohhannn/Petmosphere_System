import React, { useState } from 'react';
import In_Header from "~/routes/components/in_header";
import In_Footer from "~/routes/components/in_footer";
import ScrollToTopButton from "~/routes/utility/util_scroll_up";
import 'animate.css';

export function meta() {
    return [
        { title: "( ✦ ) PETMOSPHERE - ACCOUNT" },
        { name: "description", content: "Manage and update your personal details below." },
    ];
}

const AccountInfo = () => {
    const account = {
        profile: 'https://via.placeholder.com/100', // Replace with actual profile pic if available
        name: 'John Doe',
        email: 'john@example.com',
        accountId: 'JD12345', // Example account ID
        dateCreated: 'January 15, 2023', // Example account creation date
        phone: '0917-123-4567',
        address: '123 Main St, Cebu City',
        bio: 'Loving pet owner and adopter. Passionate about providing homes for rescued animals.',
    };

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true);
    };

    const handleConfirmLogout = () => {
        // Perform logout logic here (e.g., clearing session, local storage)
        setIsLogoutModalOpen(false);
        // Redirect to the home page
        window.location.href = "/";
    };

    const handleCancelLogout = () => {
        setIsLogoutModalOpen(false);
    };

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
                    style={{ backgroundImage: "url('main_assets/images/image_main_banner3.png')" }}
                >
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">My Account Information</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            Manage and update your personal details below.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-6 py-10">
                    <div className="bg-white shadow-md border rounded-lg p-6 max-w-3xl mx-auto animate__animated animate__fadeInUp">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src={account.profile}
                                alt={account.name}
                                className="w-50 h-50 rounded-full border-4 border-[#8E57B2] mb-4"
                            />
                            <h2 className="text-2xl font-bold text-[#8E57B2]">{account.name}</h2>
                            <p className="text-gray-500">{account.email}</p>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <div>
                                <h3 className="font-semibold">Account ID:</h3>
                                <p>{account.accountId}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Date Created:</h3>
                                <p>{account.dateCreated}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Phone:</h3>
                                <p>{account.phone}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Address:</h3>
                                <p>{account.address}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Bio:</h3>
                                <p>{account.bio}</p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6 space-x-4">
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>
                            <button className="px-6 py-2 bg-[#8E57B2] text-white rounded-lg shadow hover:bg-[#F69332] transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="bg-[#8E57B2] py-6 text-white text-center mt-10">
                    <In_Footer />
                </footer>
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-20 flex justify-center items-center animate__animated animate__fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                onClick={handleCancelLogout}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                onClick={handleConfirmLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountInfo;