import React from 'react';
import Admin_Header from '../../components/admin_header'; 

const AdminDashboard = () => {
  return (
    <>
      <Admin_Header />
      {/* You can add any admin-specific content below the header if needed */}
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
          <p className="text-gray-600">Welcome to the administration area.</p>
          {/* Add more dashboard widgets or information here */}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;