import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
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
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLink>
              <li>
                <a>Home</a>
              </li>{" "}
            </NavLink>
            <NavLink to={"/trainer"}>
              <li>
                <a>All Trainer</a>
              </li>{" "}
            </NavLink>
            <NavLink to={"/classes"}>
              <li>
                <a>All Classes</a>
              </li>{" "}
            </NavLink>
            <NavLink>
              <li>
                <a>Community</a>
              </li>{" "}
            </NavLink>
            <NavLink>
              <li>
                <a>Dashboard</a>
              </li>{" "}
            </NavLink>
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl">
          <span className="text-[#FFA500]">Fit</span>Pro
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#FFA500] text-white font-semibold rounded"
                : "font-semibold"
            }
          >
            <li>
              <a>Home</a>
            </li>{" "}
          </NavLink>
          <NavLink to={'/trainer'}  className={({ isActive }) =>
              isActive
                ? "bg-[#FFA500] text-white font-semibold rounded"
                : "font-semibold"
            }>
            <li>
              <a>All Trainer</a>
            </li>{" "}
          </NavLink>
          <NavLink
            to={"/classes"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#FFA500] text-white font-semibold rounded"
                : "font-semibold"
            }
          >
            <li>
              <a>All Classes</a>
            </li>{" "}
          </NavLink>
          <NavLink>
            <li>
              <a>Community</a>
            </li>{" "}
          </NavLink>
          <NavLink>
            <li>
              <a>Dashboard</a>
            </li>{" "}
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <>
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full border-2 border-[#FFA500]"
                src={user.photoURL}
                alt="User Avatar"
              />

              <div className="absolute top-full right-0 mt-3 hidden group-hover:flex flex-col   bg-gray-800 text-white text-sm rounded-lg px-5 py-3 shadow-lg z-50">
                {user.displayName ? (
                  <>
                    <p className="font-bold mb-2">{user.displayName}</p>
                    <Link
                      onClick={userLogout}
                      className="btn bg-[#FFA500] text-white font-semibold"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <p className="text-gray-400">User Name Not Found</p>
                )}
              </div>
            </div>

            <Link
              onClick={userLogout}
              className="btn bg-[#FFA500] text-white font-semibold"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn bg-[#FFA500] text-white font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn bg-[#FFA500] text-white font-semibold"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
