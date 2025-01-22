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
import AllTrainers from "../src/DashBoard/AdminPageSection/AllTrainers/AllTrainers";
import Balance from "../src/DashBoard/AdminPageSection/Balance/Balance";
import AppliedTrainer from "../src/DashBoard/AdminPageSection/AppliedTrainer/AppliedTrainer";
import AddnewClass from "../src/DashBoard/AdminPageSection/AddnewClass/AddnewClass";
import ManageSolt from "./DashBoard/TrainerRouteSection/ManageSlots/ManageSolt";
import AddNewSlot from "./DashBoard/TrainerRouteSection/AddNewslot/AddNewSlot";
import AddNewForum from "./DashBoard/TrainerRouteSection/AddnewForum/AddNewForum";
import BecomeAtrainer from "./Page/BecomeAtrainer/BecomeAtrainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Privetroute from "./PrivetRoute/Privetroute";
import AppliedTranierDetails from "./DashBoard/AdminPageSection/AppliedTrainer/AppliedTrainerDetails/AppliedTranierDetails";
import ProfileUpdate from "./UpdateProfile/ProfileUpdate";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Payment from "./Page/PaymentPage/Payment";
import AdminRout from "./Admirout/AdminRout";
import TrainersRout from "./TrainersRout/TrainersRout";
import Forum from "./Page/ForumPage/Forum";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/trainer",
        element: <Trainer></Trainer>,
      },
      {
        path: "/trainerDetails/:id",
        element: <TrainerDetails></TrainerDetails>,
      },
      {
        path: "/trainerbooked/:trainername/:solt/:expertise",
        element: <Privetroute><TrainerBookedPage></TrainerBookedPage></Privetroute>,
      },
      {
        path: "/classes",
        element: <AllClasses></AllClasses>,
      },
      {
        path:'/forum',
        element:<Forum></Forum>
      },
      {
        path: "/becometrainer",
        element: <Privetroute><BecomeAtrainer></BecomeAtrainer></Privetroute>,
      },{
        path:'/payment/:name/:solt/:pkg',
        element:<Privetroute><Payment></Payment></Privetroute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "activity",
        element: <ActivityLogpage></ActivityLogpage>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path:'updateprofile',
        element:<ProfileUpdate></ProfileUpdate>
      },
      {
        path: "booked",
        element: <Bookedpage></Bookedpage>,
      },
      {
        path: "addnewporum",
        element: <AddNewForum></AddNewForum>,
      },
     

      // admin dashboard route

      {
        path: "newsletter",
        element: <AdminRout><Newslettersubscribers></Newslettersubscribers></AdminRout>,
      },
      {
        path: "alltrainer",
        element: <AdminRout><AllTrainers></AllTrainers></AdminRout>,
      },
      {
        path: "balance",
        element: <AdminRout><Balance></Balance></AdminRout>,
      },
      {
        path: "appliedtrainer",
        element: <AdminRout><AppliedTrainer></AppliedTrainer></AdminRout>,
      },
      {
        path: "addnewclass",
        element: <AdminRout><AddnewClass></AddnewClass></AdminRout>,
      },
      // admin route end

      // Trainer route stat
      {
        path: "manageSlot",
        element: <TrainersRout><ManageSolt></ManageSolt></TrainersRout>,
      },
      {
        path: "addnewsolt",
        element: <TrainersRout><AddNewSlot></AddNewSlot></TrainersRout>,
      },
      {
        path: "addnewporum",
        element: <AddNewForum></AddNewForum>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path:'appliedtrainerdetails/:id',
    element:<AppliedTranierDetails></AppliedTranierDetails>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-font">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
