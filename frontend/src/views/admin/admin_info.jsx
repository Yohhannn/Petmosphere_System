import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';

const AdminInfo = () => {
  // Sample editable content state (can be connected to database/API later)
  const [previousAnnouncements, setPreviousAnnouncements] = useState([
    // { date: "2024-07-28", message: "Content of announcement 1." },
    // { date: "2024-07-27", message: "Content of announcement 2." },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnouncementMessage, setNewAnnouncementMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState('Announcement'); // Default value

  // Editing states
  const [editMode, setEditMode] = useState(null);

  // Save handler (for now, just alerts - connect to backend later)
  const handleSave = (type) => {
    alert(`${type} saved!`);
    setEditMode(null);
  };

  const handleCreateAnnouncement = () => {
    setIsModalOpen(true);
  }

  const handleConfirm = () => {
    if (newAnnouncementMessage.trim()) {
      const newAnnouncement = {
        date: new Date().toLocaleDateString(),
        message: newAnnouncementMessage,
        type: announcementType, // Include the type
      };
      setPreviousAnnouncements(prev => [newAnnouncement, ...prev]);
      setNewAnnouncementMessage(''); // Clear input
      setIsModalOpen(false);
      alert(`${announcementType} created!`); // Use type in alert
    } else {
      alert('Please enter a message.');
    }
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
                  <p><b className="text-gray-600">Type:</b> <span className={getAnnouncementColor(prevAnnouncement.type)}>{prevAnnouncement.type}</span></p>
                  <p><b className="text-gray-600">Date Announced:</b> {prevAnnouncement.date}</p>
                  <p><b className="text-gray-600">Message:</b> {prevAnnouncement.message}</p>
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
