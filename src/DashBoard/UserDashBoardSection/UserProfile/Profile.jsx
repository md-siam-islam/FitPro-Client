import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('https://via.placeholder.com/1920x1080')",
            }}
        >
            <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center w-96">
                {/* Profile Picture */}
                <div className="flex justify-center">
                    <img
                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
                    />
                </div>

                {/* User Info */}
                <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {user?.displayName || 'Your Name'}
                    </h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-gray-500 mt-2 text-sm">
                        Last Login: {user?.metadata?.lastSignInTime || 'N/A'}
                    </p>
                </div>

                {/* Update Profile Button */}
                <Link to={'/dashboard/updateprofile'}>
                <button
                   
                    className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                    Update Profile
                </button></Link>
            </div>
        </div>
    );
};

export default Profile;
