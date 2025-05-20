import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as send from '../../postRequest/send.js';
import * as fetch from '../../fetchRequest/fetch.js';
import PromptVerificationSuccess from '../../../prompt/prompt_verification_success.jsx';

const AccountVerify = () => {
  const [validId, setValidId] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [success,setSuccess] = useState(false);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(''); // State to store the filename
    const [fileError, setFileError] = useState('');
    const userCookie =  Cookies.get('userCredentials');
    const user = userCookie ? JSON.parse(userCookie) : null;
  const handleValidIdChange = (event) => {
    const file = event.target.files[0];
        setFileError(''); // Clear any previous error

    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setValidId(file);
        setFileName(file.name); // Store the filename
      } else {
                setFileError('Invalid file type. Please upload a .png or .jpeg image.');
        setValidId(null);
        setFileName('');
      }
    } else {
      setValidId(null);
      setFileName(''); // Clear filename if no file
    }
  };

  const handleConfirmClick = () => {
        if (!validId) {
            setFileError('Please upload a valid ID.');
            return;
        }
    setIsConfirmModalOpen(true);
    console.log('Valid ID:', validId);
  };

  const handleYesConfirm = async() => {
    const image = await send.uploadImage(validId);
    const response = await send.updateUserVerification(user.user.user_id,{user_valid_id_pic : image.secure_url});
    if(response.message.includes('successfully')) {
        setSuccess(true);
        const userDetail = await fetch.getUserBy(user.user.user_id);
        Cookies.set('userCredentials',JSON.stringify({user: userDetail.data}),{expires: 7});
        console.log('ID uploaded! Waiting for admin approval.');
        setIsConfirmModalOpen(false);
    }else {
        console.log("error");
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
  };

    const handleBack = () => {
        navigate(-1);
    };

  const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
  };

  return (
    <>
      <div className="bg-orange-100 min-h-screen flex items-center justify-center py-12 animate__animated animate__fadeIn">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg animate__animated animate__fadeInUp animate__faster"> {/* Changed max-w-md to max-w-lg */}
          <h2 className="text-2xl font-bold text-purple-600 mb-6 animate__animated animate__slideInDown animate__faster">
            Verify Account
          </h2>
          <div className="mb-6 flex flex-col items-center">
            <div className="w-24 h-24  overflow-hidden border-2 border-purple-400">
              <img
                src={validId ? URL.createObjectURL(validId) : "#"}
                alt="ID Preview"
                className="w-full h-full object-cover"
              />
            </div>
             <div className="relative overflow-hidden rounded-md shadow-sm mt-4" onClick={triggerFileInput}>
                            <input
                                type="file"
                                id="validId"
                                className="file-input file-input-bordered w-full max-w-xs bg-white text-gray-800 border border-gray-300"
                                onChange={handleValidIdChange}
                                style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                ref={fileInputRef}
                                accept="image/png, image/jpeg"
                            />
                            <div className="px-4 py-2 bg-purple-400 text-orange-100 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-500 transform hover:scale-105 active:scale-95">
                                Upload Valid ID
                            </div>
                        </div>
            <p className="text-gray-600 mt-4">Upload a valid ID to verify your account.</p>
            {fileName && <p className="text-gray-700 text-sm mt-2">Selected file: {fileName}</p>} {/* Display filename */}
             <p className="text-gray-500 text-sm mt-4 italic">
              <strong>Note:</strong> Please ensure the image is clear and the details are easily readable. Only .png and .jpeg files are accepted.
            </p>
                        {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
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
            <p className="py-4 text-gray-700">Do you want to submit your ID for verification?</p>
            <div className="modal-action">
              <button className="btn btn-secondary bg-gray-300 hover:bg-gray-400 text-gray-800" onClick={handleCancelConfirm}>
                Cancel
              </button>
                <button className="btn btn-primary bg-purple-500 hover:bg-purple-700 border-none text-orange-100" onClick={handleYesConfirm}>
                  Yes
                </button>
            </div>
          </div>
        </div>
      )}
        {success&&(
            <>
                <PromptVerificationSuccess/>
            </>
        )}
    </>
  );
};

export default AccountVerify;
