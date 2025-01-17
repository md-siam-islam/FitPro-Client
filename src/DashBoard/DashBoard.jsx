import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserDashBoard from "./UserDashboard/UserDashBoard";
import AdminDashBoard from "./AdminDashBOard/AdminDashBoard";
import useAdmin from "../Hook/UseAdmin/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full lg:w-11/12 mx-auto">
      {/* Sidebar */}
      <div className="w-full lg:w-64 min-h-screen px-5 py-8 bg-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-center text-white mb-5">
            FitPro
          </h1>
        </div>

        <div>
          {isAdmin ? <AdminDashBoard /> : <UserDashBoard />}
        </div>

        <div className="px-6 mt-6">
          <ul>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `block py-3 px-6 rounded ${
                    isActive
                      ? "text-white font-bold bg-[#FFA500]"
                      : "border text-white"
                  } font-bold text-center transition-all`
                }
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-5 px-4 lg:px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
