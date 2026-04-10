import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAdmin from "../../Hook/UseAdmin/useAdmin";
import useTrainer from "../../Hook/Usetrainer/useTrainer";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isTrainer] = useTrainer();

  // ড্যাশবোর্ড পাথ নির্ধারণ করার সহজ লজিক
  const getDashboardPath = () => {
    if (isAdmin) return '/dashboard/alltrainer';
    if (isTrainer) return '/dashboard/manageSlot';
    return '/dashboard/profile';
  };

  const navOptions = (
    <>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "text-[#FFA500] font-bold border-b-2 border-[#FFA500] rounded-none" : "font-semibold hover:text-[#FFA500] transition-all"}
        >Home</NavLink>
      </li>
      <li>
        <NavLink 
          to="/trainer" 
          className={({ isActive }) => isActive ? "text-[#FFA500] font-bold border-b-2 border-[#FFA500] rounded-none" : "font-semibold hover:text-[#FFA500] transition-all"}
        >All Trainer</NavLink>
      </li>
      <li>
        <NavLink 
          to="/classes" 
          className={({ isActive }) => isActive ? "text-[#FFA500] font-bold border-b-2 border-[#FFA500] rounded-none" : "font-semibold hover:text-[#FFA500] transition-all"}
        >All Classes</NavLink>
      </li>
      <li>
        <NavLink 
          to="/forum" 
          className={({ isActive }) => isActive ? "text-[#FFA500] font-bold border-b-2 border-[#FFA500] rounded-none" : "font-semibold hover:text-[#FFA500] transition-all"}
        >Community</NavLink>
      </li>
      {user && (
        <li>
          <NavLink 
            to={getDashboardPath()} 
            className={({ isActive }) => isActive ? "text-[#FFA500] font-bold border-b-2 border-[#FFA500] rounded-none" : "font-semibold hover:text-[#FFA500] transition-all"}
          >Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-12 py-3">
      {/* Navbar Start: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FFA500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-box w-64 space-y-2 border border-orange-100">
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-extrabold tracking-tighter italic">
            <span className="text-[#FFA500]">Fit</span>PRO
          </span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          {navOptions}
        </ul>
      </div>

      {/* Navbar End: Auth Buttons & Profile */}
      <div className="navbar-end gap-2 md:gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#FFA500] hover:border-orange-600 transition-all">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co/mJR9Qxc/user.png"} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-base-100 rounded-xl w-56 border border-gray-100">
                <div className="px-2 py-2 mb-2 border-b">
                  <p className="font-bold text-gray-800">{user?.displayName || "Fitness Enthusiast"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <li><Link to={getDashboardPath()} className="hover:text-[#FFA500]">My Profile</Link></li>
                <li><button onClick={userLogout} className="text-red-500 font-semibold hover:bg-red-50">Logout</button></li>
              </ul>
            </div>
            {/* Desktop Logout Button */}
            <button 
              onClick={userLogout} 
              className="btn btn-sm md:btn-md bg-[#FFA500] hover:bg-orange-600 text-white border-none rounded-lg hidden md:flex"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm md:btn-md btn-outline border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:border-[#FFA500] rounded-lg px-6">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm md:btn-md bg-[#FFA500] hover:bg-orange-600 text-white border-none rounded-lg hidden sm:flex">
              Join Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;