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
