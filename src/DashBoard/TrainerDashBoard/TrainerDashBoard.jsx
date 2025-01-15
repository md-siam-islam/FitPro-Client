import { NavLink } from "react-router-dom";

const TrainerDashBoard = () => {
    return (
        <div className="px-6 min-h-screen">
      <ul className="list-none space-y-4">
        <li>
          <NavLink
            to={"/dashboard/manageSlot"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            Manage Slots
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashboard/addnewsolt"}
            className={({ isActive }) =>
              `block py-3 px-6 rounded ${
                isActive
                  ? " text-white font-bold bg-[#FFA500]"
                  : "border text-white"
              } font-bold text-center transition-all`
            }
          >
            Add New Solt
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

export default TrainerDashBoard;