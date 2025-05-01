import React, { useState } from 'react';
import Inner_Footer from '../../components/inner_footer';
import Inner_Header from '../../components/inner_header';
import ScrollToTopButton from '../utility/util_scroll_up';
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
                <Inner_Header />
            </div>

            <ScrollToTopButton />

            <div className="bg-gray-100 mt-20 min-h-screen animate__animated animate__fadeIn">
                {/* Hero Section */}
                <section
                    className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
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
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-400">
                                <img
                                    src={account.profile}
                                    alt={account.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-purple-600 mt-4">{account.name}</h2>
                            <p className="text-gray-500">{account.email}</p>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <div>
                                <h3 className="font-semibold text-purple-600">Account ID:</h3>
                                <p>{account.accountId}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-purple-600">Date Created:</h3>
                                <p>{account.dateCreated}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-purple-600">Phone:</h3>
                                <p>{account.phone}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-purple-600">Address:</h3>
                                <p>{account.address}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-purple-600">Bio:</h3>
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
                            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <footer className="bg-purple-600 py-6 text-white text-center mt-10">
                    <Inner_Footer />
                </footer>
            </div>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
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