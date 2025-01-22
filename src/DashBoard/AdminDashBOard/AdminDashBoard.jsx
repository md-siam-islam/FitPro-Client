import { NavLink } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <div className="px-6 min-h-screen">
      <ul className="list-none space-y-4">
        <li>
          <NavLink
            to={"/dashboard/newsletter"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            Newsletter Subscribers
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/alltrainer"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            All Trainers
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/appliedtrainer"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            Applied Trainer
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/balance"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            Balance
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/addnewclass"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            Add new Class
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/addnewporum"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
           Add New Forum
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashBoard;
