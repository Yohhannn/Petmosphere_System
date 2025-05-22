import React, {useEffect, useState} from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';
import Cookies from "js-cookie";
const AdminInfo = () => {
  // Sample editable content state (can be connected to database/API later)
  const [previousAnnouncements, setPreviousAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnouncementMessage, setNewAnnouncementMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState('Announcement'); // Default value
    const adminCookie = Cookies.get('adminCredentials');
    const admin = adminCookie ? JSON.parse(adminCookie) : null;
    const logInAdmin = admin.admin?.admin_id;
  // Editing states
  const announcementData = async () =>{
      const announcement = await fetch.getAlerts();
      const adminAnnouncement = announcement.data.filter((x) => x.alert_type === 'update' || x.alert_type === 'announcement');
      setPreviousAnnouncements(adminAnnouncement);
  }
    useEffect(() => {
        announcementData();
    }, []);
  // Save handler (for now, just alerts - connect to backend later)


  const handleCreateAnnouncement = () => {
    setIsModalOpen(true);
  }

  const handleConfirm = async () => {
    if (newAnnouncementMessage.trim()) {
      const AlertInfo ={
          alert_type : announcementType.toLowerCase(),
          alert_title : "New "+announcementType.toLowerCase()+" to Admin",
          alert_message: newAnnouncementMessage,
          user_id : null,
          admin_id : logInAdmin
      }
      await send.sendAlert(AlertInfo);
      setNewAnnouncementMessage(''); // Clear input
      setIsModalOpen(false);
      alert(`${announcementType} created!`); // Use type in alert
    } else {
      alert('Please enter a message.');
    }
    await announcementData();
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewAnnouncementMessage('');
  }

  const getAnnouncementColor = (type) => {
    switch (type) {
      case 'Announcement':
        return 'text-blue-600';
      case 'Update':
        return 'text-yellow-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
        <Admin_Header />
      </div>

      <ScrollToTopButton />
      {/* grrr goods */}

      <section
        className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
        style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">Manage Information</h1>
          <p className="text-lg max-w-2xl mx-auto">
            View the Overview of the System.
          </p>
        </div>
      </section>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Make Announcements</h2>

        {/* Create New Announcement Button */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <button
            onClick={handleCreateAnnouncement}
            className="bg-[#955CA4] text-white px-4 py-2 rounded hover:bg-[#F9B233] hover:text-white"
          >
            Create New Announcement
          </button>
        </div>

        {/* Previous Announcements */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-4 text-black">Previous Announcements</h3>
          {previousAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {previousAnnouncements.map((prevAnnouncement, index) => (
                <div key={index} className="text-gray-700">
                  <p><b className="text-gray-600">Type:</b> <span className={getAnnouncementColor(prevAnnouncement.alert_type)}>{prevAnnouncement.alert_type}</span></p>
                  <p><b className="text-gray-600">Date Announced:</b> {prevAnnouncement.created_at.split('T')[0]+" "+prevAnnouncement.created_at.split('T')[1].split('.')[0]}</p>
                  <p><b className="text-gray-600">Message:</b> {prevAnnouncement.alert_message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No previous announcements.</p>
          )}
        </div>
      </div>
      {/* Modal for New Announcement */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Create New Announcement</h2>
            <div className="mb-4">
              <label htmlFor="announcementType" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="announcementType"
                value={announcementType}
                onChange={(e) => setAnnouncementType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-gray-900"
              >
                <option className="text-blue-600">Announcement</option>
                <option className="text-yellow-600">Update</option>
              </select>
            </div>
            <textarea
              value={newAnnouncementMessage}
              onChange={(e) => setNewAnnouncementMessage(e.target.value)}
              placeholder="Enter your announcement message here..."
              className="w-full border border-gray-300 rounded p-2 mb-4 resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleConfirm}
                className="bg-[#955CA4] text-white px-4 py-2 rounded hover:bg-[#F9B233] hover:text-white"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-[#955CA4] px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminInfo;
