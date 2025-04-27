import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const In_Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const isActive = (path: string) => location.pathname === path;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="bg-[#8E57B2] text-[#F4F2F2] py-4 relative z-50">
            <div className="container mx-auto px-5">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/alt_about">
                        <h1 className="py-2 px-4 text-2xl font-bold cursor-pointer hover:text-[#fab36e] transition-transform hover:scale-110">
                            <img
                                src="/main_assets/logo/logo_light.png"
                                alt="PETMOSPHERE Logo"
                                width={180}
                                height={120}
                            />
                        </h1>
                    </Link>

                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none text-[#F4F2F2]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex md:items-center md:space-x-6">
                        <li className={`${isActive('/home') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                            <Link to="/home" className="flex flex-col items-center">
                                <img
                                    src={
                                        isActive('/home')
                                            ? '/main_assets/icons/icon_home_active.png'
                                            : '/main_assets/icons/icon_home.png'
                                    }
                                    alt="Pets Icon"
                                    className="w-6 h-6 mb-1"
                                />
                                Home
                            </Link>
                        </li>

                        <li className={`${isActive('/pets') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                            <Link to="/pets" className="flex flex-col items-center">
                                <img
                                    src={
                                        isActive('/pets')
                                            ? '/main_assets/icons/icon_pets_active.png'
                                            : '/main_assets/icons/icon_pets.png'
                                    }
                                    alt="Pets Icon"
                                    className="w-6 h-6 mb-1"
                                />
                                Pets
                            </Link>
                        </li>

                        <li className={`${isActive('/chat') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                            <Link to="/chat" className="flex flex-col items-center">
                                <img
                                    src={
                                        isActive('/chat')
                                            ? '/main_assets/icons/icon_chat_active.png'
                                            : '/main_assets/icons/icon_chat.png'
                                    }
                                    alt="Chat Icon"
                                    className="w-6 h-6 mb-1"
                                />
                                Chat
                            </Link>
                        </li>

                        <li className={`${isActive('/account') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                            <Link to="/account" className="flex flex-col items-center">
                                <img
                                    src={
                                        isActive('/account')
                                            ? '/main_assets/icons/icon_account_active.png'
                                            : '/main_assets/icons/icon_account.png'
                                    }
                                    alt="Account Icon"
                                    className="w-6 h-6 mb-1"
                                />
                                Account
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <ul className="md:hidden absolute right-5 mt-2 bg-[#8E57B2] rounded-lg shadow-lg py-4 px-6 w-48 text-right space-y-4 animate__animated animate__fadeInDown">
                    <li>
                        <Link
                            to="/home"
                            onClick={closeMenu}
                            className={`transition flex justify-between items-center ${isActive('/home') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                        >
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pets"
                            onClick={closeMenu}
                            className={`transition flex justify-between items-center ${isActive('/pets') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                        >
                            <span>Pets</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/chat"
                            onClick={closeMenu}
                            className={`transition flex justify-between items-center ${isActive('/chat') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                        >
                            <span>Chat</span>
                        </Link>

                    </li>
                    <li>
                        <Link
                            to="/account"
                            onClick={closeMenu}
                            className={`transition flex justify-between items-center ${isActive('/account') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                        >
                            <span>Account</span>
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default In_Header;
