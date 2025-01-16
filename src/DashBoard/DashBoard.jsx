
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UserDashBoard from "./UserDashboard/UserDashBoard";
import AdminDashBoard from "./AdminDashBOard/AdminDashBoard";
import useAdmin from "../Hook/UseAdmin/useAdmin";



const DashBoard = () => {
  const [isAdmin] = useAdmin()
  return (
    <div className="flex gap-8 w-11/12 mx-auto">
      <div className=" className='w-64 min-h-screen px-5 py-8 bg-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-center text-white mb-5">FitPro</h1>
        </div>

        <div className="">

            {
                isAdmin? <AdminDashBoard></AdminDashBoard> : <UserDashBoard></UserDashBoard> 
            }
            
        </div>
        {/* <div className="divider"></div> */}

        <div className="px-6">
            <ul>
            <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
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

      <div className="flex-1 py-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
