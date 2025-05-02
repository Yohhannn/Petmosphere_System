import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'animate.css';
import * as send from '../postRequest/send.js';
export function meta() {
  return [
    { title: "( ✦ ) PETMOSPHERE - LOGIN" },
    { name: "description", content: "Find your perfect pet at PETMOSPHERE!" },
  ];
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

      console.log(email+" "+password);
      const credentials = {
          "user_email" : email,
          "user_pass" : password
      }
      const data = await send.login(credentials);
      if(data.message.includes('Invalid')){
        setErrorMessage(data.message);
        setTimeout(()=>{
            setErrorMessage('');
        },3000);
      }else if(data.message.includes("successfully")){
          console.log(data.message);
          navigate("/home");
      }else{
          setErrorMessage('An error occured');
          setTimeout(()=>{
              setErrorMessage('');
          },3000);
      }
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/main_assets/images/bg_landing_phone.svg')] sm:bg-[url('/main_assets/images/bg_landing.svg')] animate__animated animate__fadeIn"
    >
      {/* Animated GIF at the Top Center Above the Container */}
      <div className="absolute top-0 mt-35 ml-19 left-1/2 transform -translate-x-1/2 mb-8 animate__animated animate__lightSpeedInLeft">
        <img
          src="main_assets/gifs/cat.gif"
          alt="animated-gif"
          className="w-32 h-32 animate__animated animate__stretch"
        />
      </div>

      <div className="w-full max-w-sm p-8 bg-white bg bg-opacity-90 rounded-lg shadow-lg space-y-6 mt-16 animate__animated animate__fadeIn">
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
          Login
        </h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate__animated animate__shakeX" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
            />
          </div>

          {/* Password with Show/Hide */}
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
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
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

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-[#8E57B2] text-white py-2 rounded-md hover:bg-[#F69332] transition duration-300 animate__animated animate__zoomIn"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#626262]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#8E57B2] hover:text-[#F69332]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
