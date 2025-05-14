import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const Admin_Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => location.pathname === path;
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
          <Link to="/admin/dashboard">
            <h1 className="py-2 px-4 text-2xl font-bold cursor-pointer hover:text-[#fab36e] transition-transform hover:scale-110">
              <img
                src="/main_assets/logo/logo_light.png"
                alt="PETMOSPHERE Admin Logo"
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
            <li className={`${isActive('/admin/dashboard') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
              <Link to="/admin/dashboard" className="flex flex-col items-center">
                <img
                  src={
                    isActive('/admin/dashboard')
                      ? '/main_assets/icons/admin_icons/icon_dashboard_active.png'
                      : '/main_assets/icons/admin_icons/icon_dashboard.png'
                  }
                  alt="Dashboard Icon"
                  className="w-6 h-6 mb-1"
                />
                Dashboard
              </Link>
            </li>
            <li className={`${isActive('/admin/posts') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
              <Link to="/admin/posts" className="flex flex-col items-center">
                <img
                  src={
                    isActive('/admin/posts')
                      ? '/main_assets/icons/admin_icons/icon_posts_active.png'
                      : '/main_assets/icons/admin_icons/icon_posts.png'
                  }
                  alt="Posts Icon"
                  className="w-6 h-6 mb-1"
                />
                Posts
              </Link>
            </li>
            <li className={`${isActive('/admin/controls') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
              <Link to="/admin/controls" className="flex flex-col items-center">
                <img
                  src={
                    isActive('/admin/controls')
                      ? '/main_assets/icons/admin_icons/icon_controls_active.png'
                      : '/main_assets/icons/admin_icons/icon_controls.png'
                  }
                  alt="Controls Icon"
                  className="w-6 h-6 mb-1"
                />
                Controls
              </Link>
            </li>
            <li className={`${isActive('/admin/users') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
              <Link to="/admin/users" className="flex flex-col items-center">
                <img
                  src={
                    isActive('/admin/users')
                      ? '/main_assets/icons/admin_icons/icon_users_active.png'
                      : '/main_assets/icons/admin_icons/icon_users.png'
                  }
                  alt="Users Icon"
                  className="w-6 h-6 mb-1"
                />
                Users
              </Link>
            </li>
            <li className={`${isActive('/admin/info') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'} transition`}>
              <Link to="/admin/info" className="flex flex-col items-center">
                <img
                  src={
                    isActive('/admin/info')
                      ? '/main_assets/icons/admin_icons/icon_info_active.png'
                      : '/main_assets/icons/admin_icons/icon_info.png'
                  }
                  alt="Info Icon"
                  className="w-6 h-6 mb-1"
                />
                Info
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
              to="/admin/dashboard" // Corrected link
              onClick={closeMenu}
              className={`transition flex justify-between items-center ${isActive('/admin/dashboard') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
            >
              <span>Dashboard</span>
              <img
                src={
                  isActive('/admin/dashboard')
                    ? '/main_assets/icons/admin_icons/icon_dashboard_active.png'
                    : '/main_assets/icons/admin_icons/icon_dashboard.png'
                }
                alt="Dashboard Icon"
                className="w-6 h-6 ml-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              onClick={closeMenu}
              className={`transition flex justify-between items-center ${isActive('/admin/users') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
            >
              <span>Users</span>
              <img
                src={
                  isActive('/admin/users')
                    ? '/main_assets/icons/admin_icons/icon_users_active.png'
                    : '/main_assets/icons/admin_icons/icon_users.png'
                }
                alt="Users Icon"
                className="w-6 h-6 ml-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/posts"
              onClick={closeMenu}
              className={`transition flex justify-between items-center ${isActive('/admin/posts') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
            >
              <span>Posts</span>
              <img
                src={
                  isActive('/admin/posts')
                    ? '/main_assets/icons/admin_icons/icon_posts_active.png'
                    : '/main_assets/icons/admin_icons/icon_posts.png'
                }
                alt="Posts Icon"
                className="w-6 h-6 ml-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/controls"
              onClick={closeMenu}
              className={`transition flex justify-between items-center ${isActive('/admin/controls') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
            >
              <span>Controls</span>
              <img
                src={
                  isActive('/admin/controls')
                    ? '/main_assets/icons/admin_icons/icon_controls_active.png'
                    : '/main_assets/icons/admin_icons/icon_controls.png'
                }
                alt="Controls Icon"
                className="w-6 h-6 ml-2"
              />
            </Link>
          </li>
          <li>
            <Link
              to="/admin/info"
              onClick={closeMenu}
              className={`transition flex justify-between items-center ${isActive('/admin/info') ? 'text-[#fab36e]' : 'hover:text-[#fab36e]'}`}
            >
              <span>Info</span>
              <img
                src={
                  isActive('/admin/info')
                    ? '/main_assets/icons/admin_icons/icon_info_active.png'
                    : '/main_assets/icons/admin_icons/icon_info.png'
                }
                alt="Info Icon"
                className="w-6 h-6 ml-2"
              />
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Admin_Header;
