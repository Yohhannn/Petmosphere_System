import React from 'react';
import Admin_Header from '../../components/admin_header';

const AdminDashboard = () => {
    
  return (
    <>
      <Admin_Header />
      <div className="bg-gray-50 min-h-screen px-6 py-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-wide">
          Dashboard Overview
        </h2>

        {/* DASHBOARD CARDS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Card */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="text-5xl mb-3">📮</div>
              <p className="text-5xl font-extrabold text-blue-600">120</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Approved Posts</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="text-5xl mb-3">⏳</div>
              <p className="text-5xl font-extrabold text-yellow-500">15</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Pending Posts</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="text-5xl mb-3">❤️</div>
              <p className="text-5xl font-extrabold text-green-600">85</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Adopted Pets</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="text-5xl mb-3">👥</div>
              <p className="text-5xl font-extrabold text-purple-600">234</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Active Users</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-5xl font-extrabold text-green-500">180</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Verified Users</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="text-5xl mb-3">🕵️‍♂️</div>
              <p className="text-5xl font-extrabold text-red-500">54</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Unverified Users</p>
            </div>
          </div>

          {/* Recent Activity & Notifications */}
          <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Recent Activity Card */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-200 text-black">Recent Activity</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
                <li>New pet post: <strong>"Coco"</strong> (Shih Tzu) by Jane Doe</li>
                <li>User Mark adopted <strong>"Max"</strong> (Golden Retriever)</li>
                <li>New account registered: <strong>Sarah</strong> (Adopter)</li>
              </ul>
            </div>

            {/* Notifications Card */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-200 text-red-600">Notifications</h4>
              <ul className="list-disc list-inside space-y-2 text-red-600 text-lg">
                <li>3 pending approvals</li>
                <li>2 new reports submitted</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
