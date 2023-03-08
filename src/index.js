import React from "react";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import Basic from "./calctype/Basic";
import LiqAdd from "./calctype/LiqAdd";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BadRoute from "./calctype/BadRoute";
import Navbar from "./components/Navigator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Basic />,
    errorElement: <BadRoute />,
  },
  {
    path: "/Basic",
    element: <Basic />,
  },
  {
    path: "/LiqAdd",
    element: <LiqAdd />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
