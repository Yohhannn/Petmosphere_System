import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const searchedPath = location.pathname;

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <img
        src="main_assets/icons/icon_error_sad.png"
        alt="Page Not Found"
        className="w-24 h-auto mb-8 animate__animated animate__fadeIn"
      />
      <h1 className="text-4xl font-bold text-purple-600 dark:text-orange-400 mb-4 animate__animated animate__bounce">
        Oops! Page Not Found
      </h1>
      <p className="text-2xl font-semibold text-red-400 dark:text-red-400 mb-2 animate__animated animate__shakeX">
        Error 404
      </p>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-md">
        We couldn't find the page you were looking for: <span className="font-semibold text-purple-600">{searchedPath}</span>
      </p>

      <button
        onClick={handleGoBack}
        className="bg-orange-400 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__fadeIn"
      >
        Return
      </button>
    </div>
  );
};

export default NotFound;