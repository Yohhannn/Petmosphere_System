import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';

const AdminInfo = () => {
  // Sample editable content state (can be connected to database/API later)
  const [about, setAbout] = useState("Petmosphere is a loving hub for pet adoption.");
  const [terms, setTerms] = useState("Please treat pets and fellow users with respect.");
  const [credits, setCredits] = useState("Developed by Team Petmosphere 2025.");
  const [contact, setContact] = useState("Email us at: contact@petmosphere.com");
  const [announcement, setAnnouncement] = useState("No announcements at the moment.");

  // Editing states
  const [editMode, setEditMode] = useState(null);

  // Save handler (for now, just alerts - connect to backend later)
  const handleSave = (type) => {
    alert(`${type} saved!`);
    setEditMode(null);
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
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Infromation Management</h2>

        {/* About Section */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-2 text-black">About Petmosphere</h3>
          {editMode === 'about' ? (
            <>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4 resize-none bg-gradient-to-b from-white to-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleSave('About')} className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-1 rounded">Save</button>
                <button onClick={() => setEditMode(null)} className="bg-gray-300 text-[#955CA4] px-4 py-1 rounded">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700">{about}</p>
              <button onClick={() => setEditMode('about')} className="text-blue-600 text-sm mt-2">Edit</button>
            </>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-2 text-black">Terms and Conditions</h3>
          {editMode === 'terms' ? (
            <>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4 resize-none bg-gradient-to-b from-white to-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows={3}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleSave('Terms')} className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-1 rounded">Save</button>
                <button onClick={() => setEditMode(null)} className="bg-gray-300 text-[#955CA4] px-4 py-1 rounded">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700">{terms}</p>
              <button onClick={() => setEditMode('terms')} className="text-blue-600 text-sm mt-2">Edit</button>
            </>
          )}
        </div>

        {/* Developer Credits */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-2 text-black">Developer Credits</h3>
          <p className="text-gray-700">{credits}</p>
        </div>

        {/* Contact Us Info */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-2 text-black">Contact Us Info</h3>
          {editMode === 'contact' ? (
            <>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4 resize-none bg-gradient-to-b from-white to-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows={2}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleSave('Contact Info')} className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-1 rounded">Save</button>
                <button onClick={() => setEditMode(null)} className="bg-gray-300 text-[#955CA4] px-4 py-1 rounded">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700">{contact}</p>
              <button onClick={() => setEditMode('contact')} className="text-blue-600 text-sm mt-2">Edit</button>
            </>
          )}
        </div>

        {/* Announcements */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-2 text-black">Announcements</h3>
          {editMode === 'announcement' ? (
            <>
              <textarea
                className="w-full border border-gray-300 rounded p-2 mb-4 resize-none bg-gradient-to-b from-white to-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows={2}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleSave('Announcement')} className="bg-[#955CA4] -600 text-[#F9B233] px-4 py-1 rounded">Save</button>
                <button onClick={() => setEditMode(null)} className="bg-gray-300 text-[#955CA4] px-4 py-1 rounded">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700">{announcement}</p>
              <button onClick={() => setEditMode('announcement')} className="text-blue-600 text-sm mt-2">Edit</button>
            </>
          )}
        </div>

        {/* OPTIONAL Logs and Reports (just shown for now, no backend yet) */}
        <div className="bg-white p-5 rounded shadow mb-5">
          <h3 className="text-xl font-semibold mb-2 text-black">Logs</h3>
          <p className="text-gray-600 text-sm italic">This section will track admin actions. (e.g., who approved/edited what)</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 text-black">Reports</h3>
          <p className="text-gray-600 text-sm italic">Reported posts from users will appear here for admin review.</p>
        </div>
      </div>
    </>
  );
};

export default AdminInfo;
