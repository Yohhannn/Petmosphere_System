import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'animate.css';
import * as send from '../postRequest/send.js';

export function meta() {
  return [
    { title: "( ✦ ) PETMOSPHERE - SIGNUP" },
    { name: "description", content: "Create your account and start adopting a pet today!" },
  ];
}
const checkPassword = (password) => {
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 8;

    return hasSymbol && hasUppercase && hasMinLength;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState(''); // New state for contact number
  const [address, setAddress] = useState('');             // New state for address
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password doesn't match");
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(''), 3000); // Clear message
      return;
    }
    if(!checkPassword(password)){
        setErrorMessage("Password must be at least 8 characters, include an uppercase letter and a symbol.");
        setTimeout(() => setErrorMessage(''), 3000);
        return;
    }
    const signUpObject = {
      "user_name": fullname,
      "user_email": email,
      "user_pass": password,
      "user_createdate": new Date().toISOString().slice(0, 10),
      "user_phone": contactNumber, // Include contact number
      "user_location": address,     // Include address
    };
    const alertSignUp = {
        alert_type: "sign_up",
        admin_id : null,
        alert_title : "New sign up",
        alert_message : "New Sign-up: " + email
    }
    const response = await send.signUp(signUpObject);
    if (response.message.includes('successfully')) {
      alertSignUp["user_id"] = response.data.user_id;
      await send.sendAlert(alertSignUp);
      navigate('/login');
    }else if(response.message.includes('email')) {
        setErrorMessage(response.message); //show the error message from server
        setTimeout(() => setErrorMessage(''), 3000);
    }
    else {
      setErrorMessage(response.message); //show the error message from server
      setTimeout(() => setErrorMessage(''), 3000); // Clear message
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/main_assets/images/bg_landing_phone.svg')] sm:bg-[url('/main_assets/images/bg_landing.svg')] animate__animated animate__fadeIn"
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg space-y-6 mt-16 animate__animated animate__fadeIn">
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
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate__animated animate__shakeX" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        <form className="w-full space-y-4" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-[#626262]">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-[#626262]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white"
            />
          </div>

          {/* New Contact Number Field */}
          <div className="space-y-2">
            <label htmlFor="contact" className="block text-sm text-[#626262]">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel" // Use type="tel" for phone numbers
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white"
            />
          </div>

          {/* New Address Field */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm text-[#626262]">
              Address
            </label>
            <input
              id="address"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white"
            />
          </div>

          {/* Password field with show/hide */}
          <div className="space-y-2 relative">
            <label htmlFor="password" className="block text-sm text-[#626262]">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white"
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
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white"
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
