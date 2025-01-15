import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Homelayout from "./Components/Homelayout/Homelayout";
import AllClasses from "./Page/AllClassesSection/AllClasses";
import Signup from "./SignUpPage/Signup";
import Login from "./LoginPage/Login";
import AuthProvider from "./AuthProvider/AuthProvider";
import Trainer from "./Page/AllTrainerPage/Trainer";
import TrainerDetails from "./Page/AllTrainerPage/TrainerDetails/TrainerDetails";
import TrainerBookedPage from "./Page/AllTrainerPage/TrainerBookedPage/TrainerBookedPage";
import DashBoard from "./DashBoard/DashBoard";
import ActivityLogpage from "./DashBoard/UserDashBoardSection/ActivityLogpage/ActivityLogpage";
import Profile from "./DashBoard/UserDashBoardSection/UserProfile/Profile";
import Bookedpage from "./DashBoard/UserDashBoardSection/BookedPage/Bookedpage";
import Newslettersubscribers from "./DashBoard/AdminPageSection/Newslettersubscribers/Newslettersubscribers";
import AllTrainers from '../src/DashBoard/AdminPageSection/AllTrainers/AllTrainers'
import Balance from '../src/DashBoard/AdminPageSection/Balance/Balance'
import AppliedTrainer from '../src/DashBoard/AdminPageSection/AppliedTrainer/AppliedTrainer'
import AddnewClass from '../src/DashBoard/AdminPageSection/AddnewClass/AddnewClass'
import ManageSolt from "./DashBoard/TrainerRouteSection/ManageSlots/ManageSolt";
import AddNewSlot from "./DashBoard/TrainerRouteSection/AddNewslot/AddNewSlot";
import AddNewForum from "./DashBoard/TrainerRouteSection/AddnewForum/AddNewForum";
import BecomeAtrainer from "./Page/BecomeAtrainer/BecomeAtrainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/trainer',
        element:<Trainer></Trainer>
      },
      {
        path:'/trainerDetails/:id',
        element:<TrainerDetails></TrainerDetails>
      },
      // trainer booked privet route pore korbo 
      {
        path:'/trainerbooked/:trainername/:solt/:expertise',
        element:<TrainerBookedPage></TrainerBookedPage>
      },
      {
        path: "/classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path:'/becometrainer',
        element:<BecomeAtrainer></BecomeAtrainer>
      }
    ],
  },
  {
    path:'/dashboard',
    element:<DashBoard></DashBoard>,
    children:[
      {
        path:'activity',
        element:<ActivityLogpage></ActivityLogpage>
      },
      {
        path:'profile',
        element:<Profile></Profile>
      },
      {
        path:'booked',
        element:<Bookedpage></Bookedpage>
      },

      // admin dashboard route

      {
        path:'newsletter',
        element:<Newslettersubscribers></Newslettersubscribers>
      },
      {
        path:'alltrainer',
        element:<AllTrainers></AllTrainers>
      },
      {
        path:'balance',
        element:<Balance></Balance>
      },
      {
        path:'appliedtrainer',
        element:<AppliedTrainer></AppliedTrainer>
      },
      {
        path:'addnewclass',
        element:<AddnewClass></AddnewClass>
      },
      // admin route end

      // Trainer route stat
      {
        path:'manageSlot',
        element:<ManageSolt></ManageSolt>
      },
      {
        path:"addnewsolt",
        element:<AddNewSlot></AddNewSlot>
      },
      {
        path:"addnewporum",
        element:<AddNewForum></AddNewForum>
      }


    ]
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-font">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
);
