import React from 'react';
import { Mail, Clock, Heart, Users, CheckCircle, UserX } from 'lucide-react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import { Link } from 'react-router-dom'; // Import Link from React Router

const AdminDashboard = () => {
  const cardData = [
    {
      icon: Mail,
      value: 120,
      label: 'Approved Posts',
      valueColor: 'text-blue-600',
    },
    {
      icon: Clock,
      value: 15,
      label: 'Pending Posts',
      valueColor: 'text-yellow-500',
    },
    {
      icon: Heart,
      value: 85,
      label: 'Adopted Pets',
      valueColor: 'text-green-600',
    },
    {
      icon: Users,
      value: 234,
      label: 'Active Users',
      valueColor: 'text-purple-600',
    },
    {
      icon: CheckCircle,
      value: 180,
      label: 'Verified Users',
      valueColor: 'text-green-500',
    },
    {
      icon: UserX,
      value: 54,
      label: 'Unverified Users',
      valueColor: 'text-red-500',
    },
  ];

  // Dummy data with email and full name
  const generateDummyData = (type, count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const baseData = {
        date: '2024-01-15 09:30:00',
        email: `user${i}@example.com`,
        fullName: `User ${i}`,
      };
      switch (type) {
        case 'post':
          data.push({ ...baseData, petName: `Pet ${i}` });
          break;
        case 'signup':
          data.push(baseData);
          break;
        case 'adoption':
          data.push({ ...baseData, petName: `Pet ${i}` });
          break;
        case 'verification':
          data.push(baseData);
          break;
        default:
          data.push(baseData);
      }
    }
    return data;
  };

  const recentPosts = generateDummyData('post', 15);
  const recentSignUps = generateDummyData('signup', 12);
  const recentAdoptions = generateDummyData('adoption', 18);
  const recentVerifications = generateDummyData('verification', 20);

  return (
    <>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
        <Admin_Header />
      </div>

      <ScrollToTopButton />

      <section
        className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
        style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">Admin Dashboard</h1>
          <p className="text-lg max-w-2xl mx-auto">
            View the Overview of the System.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen px-6 py-12">
        {/* DASHBOARD CARDS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {cardData.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="text-4xl mb-2">
                    <Icon className={card.valueColor} />
                  </div>
                  <p className={`text-4xl font-extrabold ${card.valueColor}`}>{card.value}</p>
                  <p className="mt-2 text-md font-medium text-gray-700 text-center mb-5">{card.label}</p>
                </div>
              );
            }
            )}
          </div>

          {/* Recent Posts */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-black">Recent Posts</h4>
              <Link // Use Link for navigation
                to="/admin/posts" // Set the destination URL
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                View More
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentPosts.slice(0, 10).map((post, index) => (
                  <li key={index}>
                    New Post from {post.email} {post.fullName ? `#${post.fullName}` : ''} <span className="float-right">{post.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Sign-Ups */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-black">Recent Sign-Ups</h4>
              <Link
                to="/admin/users"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                View More
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentSignUps.slice(0, 10).map((signUp, index) => (
                  <li key={index}>
                    New Sign-In: {signUp.email}  {signUp.fullName ? `#${signUp.fullName}` : ''}  <span className="float-right">{signUp.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Adoptions */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-black">Recent Adoptions</h4>
              <Link
                to="/test"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                View More
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentAdoptions.slice(0, 10).map((adoption, index) => (
                  <li key={index}>
                    New Adoption: {adoption.petName} by {adoption.email} {adoption.fullName ? `#${adoption.fullName}` : ''}  <span className="float-right">{adoption.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Verifications */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-black">Recent Verifications</h4>
              <Link
                to="/test"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                View More
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentVerifications.slice(0, 10).map((verification, index) => (
                  <li key={index}>
                    Verification Request: {verification.email} {verification.fullName ? `#${verification.fullName}` : ''}  <span className="float-right">{verification.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;

