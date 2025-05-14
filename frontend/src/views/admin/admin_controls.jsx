import React from 'react';
import Admin_Header from '../../components/admin_header'; 

const AdminControls = () => {
  return (
    <>
      <Admin_Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Controls</h2>
          <p className="text-gray-600">Welcome to the administration area.</p>
        </div>
      </div>
    </>
  );
};

export default AdminControls;