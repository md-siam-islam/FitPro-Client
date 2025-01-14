import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 px-8">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         <NavLink><li><a>Home</a></li> </NavLink>
        <NavLink><li><a>All Trainer</a></li> </NavLink>
        <NavLink to={'/classes'}><li><a>All Classes</a></li> </NavLink>
        <NavLink><li><a>Community</a></li> </NavLink>
        <NavLink><li><a>Dashboard</a></li> </NavLink>
      </ul>
    </div>
    <a className="btn btn-ghost text-2xl"><span className='text-[#FFA500]'>Fit</span>Pro</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        <NavLink to={"/"} className={({isActive}) => isActive ? "bg-[#FFA500] text-white font-semibold rounded":"font-semibold"}><li><a>Home</a></li> </NavLink>
        <NavLink><li><a>All Trainer</a></li> </NavLink>
        <NavLink to={'/classes'} className={({isActive}) => isActive ? "bg-[#FFA500] text-white font-semibold rounded":"font-semibold"}><li><a>All Classes</a></li> </NavLink>
        <NavLink><li><a>Community</a></li> </NavLink>
        <NavLink><li><a>Dashboard</a></li> </NavLink>
    </ul>
  </div>
  <div className="navbar-end gap-3">
    <a className="btn bg-[#FFA500] text-white font-semibold">Login</a>
    <a className="btn bg-[#FFA500] text-white font-semibold">Sign Up</a>
  </div>
</div>
    );
};

export default Navbar;