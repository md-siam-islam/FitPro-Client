import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfileUpdate = () => {
    const navigate = useNavigate()
  const { user,setUser} = useContext(AuthContext);
  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Updated Name:", name);
    console.log("Updated Profile Picture:", profilePicture);
    setUser({...user,displayName:name,photoURL:profilePicture})
    Swal.fire({
      title: "success",
      text: "Your Profile Update Done",
      icon: "success",
    });
    navigate('/dashboard/profile')

  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Update Profile
          </h1>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-gray-600 mb-1">
                Profile Picture URL
              </label>
              <input
                type="text"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
