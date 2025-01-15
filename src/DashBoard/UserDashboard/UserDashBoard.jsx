import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const UserDashBoard = () => {
  return (
    <div className="p-6 min-h-screen">
      <ul className="list-none space-y-4">
        <li>
          <NavLink
            to={"/dashboard/activity"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive ? ' text-white font-bold bg-[#FFA500]' : 'border text-white'
              } font-bold text-center transition-all`
            }
          >
            Activity Log
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/profile"}
            className={({ isActive }) =>
                `block py-3 px-6 rounded ${
                  isActive ? ' text-white font-bold bg-[#FFA500]' : 'border text-white'
                } font-bold text-center transition-all`
              }
          >
            <FaUser className="inline-block mr-2" /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/booked"}
            className={({ isActive }) =>
                `block py-3 px-6 rounded ${
                  isActive ? ' text-white font-bold bg-[#FFA500]' : 'border text-white'
                } font-bold text-center transition-all`
              }
          >
            Booked Trainer
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserDashBoard;
