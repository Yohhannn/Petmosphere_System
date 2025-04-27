import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

export function meta() {
  return [
    { title: "( ✦ ) PETMOSPHERE - SIGNUP" },
    { name: "description", content: "Create your account and start adopting a pet today!" },
  ];
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
      <div
          className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/main_assets/images/bg_landing_phone.svg')] sm:bg-[url('/main_assets/images/bg_landing.svg')] animate__animated animate__fadeIn"
      >
        <div className="w-full max-w-sm p-8 bg-white bg-opacity-90 rounded-lg shadow-lg space-y-6 mt-16 animate__animated animate__fadeIn">
          {/* Upper-left circle button */}
          <Link
              to="/"
              className="w-12 h-12 flex items-center justify-center bg-[#8E57B2] text-white rounded-full shadow-md hover:bg-[#F69332] transition duration-300 animate__animated animate__rotateIn"
          >
            <img
                src="/main_assets/icons/icon_return.svg"
                alt="Back"
                className="w-6 h-6"
            />
          </Link>

          <h1 className="text-3xl font-bold text-[#8E57B2] mb-6 text-center animate__animated animate__wobble">
            Sign Up
          </h1>

          <form className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-[#626262]">
                Full Name
              </label>

              {/*Auto Fill CSS Format*/}
              <style>
                {`input:-webkit-autofill {
                  -webkit-text-fill-color: black !important;
                  transition: background-color 5000s ease-in-out 0s;
                  }`}
              </style>

              <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-[#626262]">
                Email Address
              </label>

              {/*Auto Fill CSS Format*/}
              <style>
                {`input:-webkit-autofill {
                  -webkit-text-fill-color: black !important;
                  transition: background-color 5000s ease-in-out 0s;
                  }`}
              </style>

              <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight"
              />
            </div>

            {/* Password field with show/hide */}
            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-sm text-[#626262]">
                Password
              </label>

              {/*Auto Fill CSS Format*/}
              <style>
                {`input:-webkit-autofill {
                  -webkit-text-fill-color: black !important;
                  transition: background-color 5000s ease-in-out 0s;
                  }`}
              </style>

              <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight"
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-3 text-[#8E57B2] focus:outline-none animate__animated animate__bounceIn"
              >
                {showPassword ? (
                    <img src="/main_assets/icons/icon_eye_open.png" alt="Hide" className="w-5 h-5" />
                ) : (
                    <img src="/main_assets/icons/icon_eye_closed.png" alt="Show" className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password field with show/hide */}
            <div className="space-y-2 relative">
              <label htmlFor="confirm-password" className="block text-sm text-[#626262]">
                Confirm Password
              </label>

              {/*Auto Fill CSS Format*/}
              <style>
                {`input:-webkit-autofill {
                  -webkit-text-fill-color: black !important;
                  transition: background-color 5000s ease-in-out 0s;
                  }`}
              </style>

              <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight"
              />
              <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-9 right-3 text-[#8E57B2] focus:outline-none animate__animated animate__bounceIn"
              >
                {showConfirmPassword ? (
                    <img src="/main_assets/icons/icon_eye_open.png" alt="Hide" className="w-5 h-5" />
                ) : (
                    <img src="/main_assets/icons/icon_eye_closed.png" alt="Show" className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                  type="submit"
                  className="w-full bg-[#8E57B2] text-white py-2 rounded-md hover:bg-[#F69332] transition duration-300 animate__animated animate__zoomIn"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#626262]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8E57B2] hover:text-[#F69332]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignUp;
