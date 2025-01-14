import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Homelayout from "./Components/Homelayout/Homelayout";
import AllClasses from "./Page/AllClassesSection/AllClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    children: [
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'/classes',
        element:<AllClasses></AllClasses>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-font">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
