import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Out_Header = () => {
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <header className="bg-[#8E57B2] text-[#F4F2F2] py-4 relative z-50">
        <div className="container mx-auto px-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
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
              <li className={`${isActive('/team') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                <Link to="/team" className="flex flex-col items-center">
                  <img
                      src={
                        isActive('/team')
                            ? '/main_assets/icons/icon_group_active.png'
                            : '/main_assets/icons/icon_group.png'
                      }
                      alt="Team Icon"
                      className="w-6 h-6 mb-1"
                  />
                  Team
                </Link>
              </li>

              <li className={`${isActive('/about') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                <Link to="/about" className="flex flex-col items-center">
                  <img
                      src={
                        isActive('/about')
                            ? '/main_assets/icons/icon_about_active.png'
                            : '/main_assets/icons/icon_about.png'
                      }
                      alt="About Icon"
                      className="w-6 h-6 mb-1"
                  />
                  About
                </Link>
              </li>

              <li className={`${isActive('/contact') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
                <Link to="/contact" className="flex flex-col items-center">
                  <img
                      src={
                        isActive('/contact')
                            ? '/main_assets/icons/icon_contact_active.png'
                            : '/main_assets/icons/icon_contact.png'
                      }
                      alt="Contact Icon"
                      className="w-6 h-6 mb-1"
                  />
                  Contact
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
                    to="/team"
                    onClick={closeMenu}
                    className={`transition flex justify-between items-center ${isActive('/team') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                >
                  <span className="md:hidden">Team</span>
                  <img
                      src={
                        isActive('/team')
                            ? '/main_assets/icons/icon_group_active.svg'
                            : '/main_assets/icons/icon_group_default.svg'
                      }
                      alt="team-icon"
                      className="w-5 h-5"
                  />
                </Link>
              </li>
              <li>
                <Link
                    to="/about"
                    onClick={closeMenu}
                    className={`transition flex justify-between items-center ${isActive('/about') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                >
                  <span className="md:hidden">About</span>
                  <img
                      src={
                        isActive('/about')
                            ? '/main_assets/icons/icon_about_active.svg'
                            : '/main_assets/icons/icon_about_default.svg'
                      }
                      alt="about-icon"
                      className="w-5 h-5"
                  />
                </Link>
              </li>
              <li>
                <Link
                    to="/contact"
                    onClick={closeMenu}
                    className={`transition flex justify-between items-center ${isActive('/contact') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
                >
                  <span className="md:hidden">Contact</span>
                  <img
                      src={
                        isActive('/contact')
                            ? '/main_assets/icons/icon_call_active.svg'
                            : '/main_assets/icons/icon_call_default.svg'
                      }
                      alt="contact-icon"
                      className="w-5 h-5"
                  />
                </Link>
              </li>
            </ul>
        )}
      </header>
  );
};

export default Out_Header;
