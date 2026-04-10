import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUserCircle, FaEnvelope, FaCalendarAlt, FaEdit, 
  FaDumbbell, FaFire, FaHeartbeat, FaShieldAlt,
  FaMapMarkerAlt, FaPhone, FaCrown, FaCheckCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [imageError, setImageError] = useState(false);

  // Get member since date (example - you can replace with actual data)
  const memberSince = user?.metadata?.creationTime 
    ? new Date(user?.metadata?.creationTime).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      })
    : 'January 2024';

  // Get last login
  const lastLogin = user?.metadata?.lastSignInTime
    ? new Date(user?.metadata?.lastSignInTime).toLocaleString()
    : 'Just now';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full mb-4 shadow-lg">
            <HiSparkles className="text-white text-sm" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">My Profile</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Personal <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Manage your account settings and track your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-8">
              {/* Gradient Header */}
              <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-60"></div>
                    <img
                      src={imageError ? 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') + '&background=FFA500&color=fff&size=128' : (user?.photoURL || 'https://ui-avatars.com/api/?name=' + (user?.displayName || 'User') + '&background=FFA500&color=fff&size=128')}
                      alt="Profile"
                      className="relative w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {user?.displayName || 'Fitness Enthusiast'}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                    <FaFire className="text-orange-500 text-xs" />
                    <span className="text-xs font-medium text-orange-600">Active Member</span>
                  </div>
                </div>


                {/* Action Buttons */}
                <Link to={'/dashboard/updateprofile'}>
                  <button className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <FaEdit className="text-sm" />
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Information */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <FaUserCircle className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Account Information</h3>
                  <p className="text-xs text-gray-500">Your personal details</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-orange-500 text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                    <p className="text-gray-800 font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                  {user?.emailVerified && (
                    <FaCheckCircle className="text-green-500 text-lg" />
                  )}
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-orange-500 text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Member Since</p>
                    <p className="text-gray-800 font-medium">{memberSince}</p>
                  </div>
                </div>

                {/* Last Login */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FaHeartbeat className="text-orange-500 text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 font-medium">Last Active</p>
                    <p className="text-gray-800 font-medium">{lastLogin}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fitness Stats */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <FaDumbbell className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Fitness Journey</h3>
                  <p className="text-xs text-gray-500">Your progress at a glance</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Workout Streak</span>
                    <FaFire className="text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">7 days</div>
                  <div className="w-full bg-white rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Goals Completed</span>
                    <FaCrown className="text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">8/12</div>
                  <div className="w-full bg-white rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-6 md:p-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Ready to level up?</h3>
                  <p className="text-orange-100 text-sm">Join our premium classes and achieve your goals faster</p>
                </div>
                <Link to="/classes">
                  <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Explore Classes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;