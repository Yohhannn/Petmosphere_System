import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';
import * as send from '../../postRequest/send.js';
import * as fetch from "../../fetchRequest/fetch.js";
const AccountEdit = () => {
    const userCookie =  Cookies.get('userCredentials');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const [name, setName] = useState(user.user.user_name);
    const [contactNumber, setContactNumber] = useState(user.user.user_phone);
    const [address, setAddress] = useState(user.user.user_location);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigate

    const handleProfilePictureChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
    } else {
      setProfilePicture(null);
    }
  };

  const handleConfirmClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleYesConfirm = async() => {
      const image = await send.uploadImage(profilePicture);
     const updatedDetails = {
        user_name : name,
        user_phone : contactNumber,
        user_location : address,
        user_prof_pic : image.secure_url
    }
    const response = await send.updateUser(user.user.user_id,updatedDetails);
    if(response.message.includes('successfully')){
        const userDetail = await fetch.getUserBy(user.user.user_id);
        Cookies.set('userCredentials',JSON.stringify({user: userDetail.data}),{expires: 7});
        setIsConfirmModalOpen(false);
        navigate(`/account/${user.user.user_id}`);
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  const triggerFileInput = () => {
    console.log("triggerFileInput: Click triggered");
    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log("triggerFileInput: Input clicked");
    } else {
      console.error("triggerFileInput: fileInputRef is null");
    }
  };

  const handleBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };

  return (
    <>
      <div className="bg-orange-100 min-h-screen flex items-center justify-center py-12 animate__animated animate__fadeIn">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md animate__animated animate__fadeInUp animate__faster">
          <h2 className="text-2xl font-bold text-purple-600 mb-6 animate__animated animate__slideInDown animate__faster">
            Edit Account
          </h2>
          <div className="mb-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400">
              <img
                src={profilePicture ? URL.createObjectURL(profilePicture) : user.user.user_prof_pic}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-md shadow-sm mt-4" onClick={triggerFileInput}>
              <input
                type="file"
                id="profilePicture"
                accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.svg,.heic,.avif"
                className="file-input file-input-bordered w-full max-w-xs bg-white text-gray-800 border border-gray-300"
                onChange={handleProfilePictureChange}
                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                ref={fileInputRef}
              />
              <div className="px-4 py-2 bg-purple-400 text-orange-100 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-500 transform hover:scale-105 active:scale-95">
                Upload Profile Picture
              </div>
            </div>
          </div>
          <div className="mb-4 animate__animated animate__fadeInLeft animate__delay_200">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="input input-bordered w-full bg-white text-gray-800 border border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 animate__animated animate__fadeInLeft animate__delay-600">
            <label htmlFor="contactNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              className="input input-bordered w-full bg-white text-gray-800 border border-gray-300"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="mb-6 animate__animated animate__fadeInLeft animate__delay-900">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <textarea
              id="address"
              className="textarea textarea-bordered w-full bg-white text-gray-800 border border-gray-300"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between animate__animated animate__fadeInUp animate__delay-500">
            <button
              className="btn border-orange-400 bg-orange-400 text-white hover:bg-orange-300 hover:border-orange-300 transition-colors duration-200"
              onClick={handleBack}
            >
              Back
            </button>
            <button className="btn btn-primary bg-purple-500 hover:bg-purple-700 border-none text-orange-100" onClick={handleConfirmClick}>
              Confirm
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="modal modal-open animate__animated animate__fadeIn">
          <div className="modal-box bg-orange-50 animate__animated animate__zoomIn animate__faster">
            <h3 className="font-bold text-lg text-purple-600">Are you sure?</h3>
            <p className="py-4 text-gray-700">Do you want to save these changes to your account?</p>
            <div className="modal-action">
              <button className="btn btn-secondary border-gray-300 bg-gray-300 hover:bg-gray-400 text-gray-800" onClick={handleCancelConfirm}>
                Cancel
              </button>
                <button className="btn btn-primary bg-purple-500 hover:bg-purple-700 border-none text-orange-100" onClick={handleYesConfirm}>
                  Yes
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountEdit;
