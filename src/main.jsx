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
