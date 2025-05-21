import React, {useEffect, useState} from 'react';
import { Mail, Clock, Heart, Users, CheckCircle, UserX } from 'lucide-react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import { Link } from 'react-router-dom'; // Import Link from React Router
import * as fetch from '../fetchRequest/fetch.js';
const AdminDashboard = () => {
    const [approvePost,setApprovedPost] = useState("....");
    const [pendingPost,setPendingPost] = useState("....");
    const [adoptedPet,setAdoptedPet] = useState("....");
    const [users,setUsers] = useState("....");
    const [verifiedUsers,setVerifiedUsers] = useState("....");
    const [unverifiedUsers,setUnverifiedUsers] = useState("....");
    const [Alert,setAlert] = useState([]);
    useEffect(() => {
        const Post = async() =>{
            const posts = await fetch.getCountPost();
            const pet = await fetch.getCountPet();
            const users = await fetch.getCountUser();
            setAdoptedPet(pet.adopted);
            setApprovedPost(posts.approved);
            setPendingPost(posts.pending);
            setUsers(users.users);
            setUnverifiedUsers(users.unverified);
            setVerifiedUsers(users.verified);
        }
        Post();
    }, []);
  const cardData = [
    {
      icon: Mail,
      value: approvePost,
      label: 'Approved Posts',
      valueColor: 'text-blue-600',
    },
    {
      icon: Clock,
      value: pendingPost,
      label: 'Pending Posts',
      valueColor: 'text-yellow-500',
    },
    {
      icon: Heart,
      value: adoptedPet,
      label: 'Adopted Pets',
      valueColor: 'text-green-600',
    },
    {
      icon: Users,
      value: users,
      label: 'Active Users',
      valueColor: 'text-purple-600',
    },
    {
      icon: CheckCircle,
      value: verifiedUsers,
      label: 'Verified Users',
      valueColor: 'text-green-500',
    },
    {
      icon: UserX,
      value: unverifiedUsers,
      label: 'Unverified Users',
      valueColor: 'text-red-500',
    },
  ];

  // Dummy data with email and full name
  const AlertData = async() => {
    const alerts = await fetch.getAlerts();
    setAlert(alerts.data);
    console.log(alerts);
  }
  useEffect(() => {
    AlertData();
  }, []);

  const recentPosts = Alert.filter((x) => x.alert_type === "post_created");
  const recentSignUps = Alert.filter((x) => x.alert_type === "sign_up");
  const recentAdoptions = Alert.filter((x) => x.alert_type?.includes("adoption"));
  const recentVerifications = Alert.filter((x) => x.alert_type === "user_verified");

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
                {recentPosts.map((post, index) => (
                  <li key={index}>
                   {post.alert_message} <span className="float-right">{post.created_at.split('T')[0]+" "+post.created_at.split('T')[1].split('.')[0]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Sign-Ups */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-black">Recent Sign-Ups</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentSignUps.map((signUp, index) => (
                  <li key={index}>
                      {signUp.alert_message}<span className="float-right">{signUp.created_at.split('T')[0]+" "+signUp.created_at.split('T')[1].split('.')[0]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Adoptions */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-black">Recent Adoptions</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentAdoptions.map((adoption, index) => (
                  <li key={index}>
                      {adoption.alert_message} <span className="float-right">{adoption.created_at.split('T')[0]+" "+adoption.created_at.split('T')[1].split('.')[0]}</span>
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
                to="/admin/users"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                View More
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md mt-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm overflow-y-auto max-h-48">
                {recentVerifications.map((verification, index) => (
                  <li key={index}>
                      {verification.alert_message} <span className="float-right">{verification.created_at.split('T')[0]+" "+verification.created_at.split('T')[1].split('.')[0]}</span>
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

