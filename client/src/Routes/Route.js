import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import CheckAuth from "../utils/CheckAuth";
import Guest from "../utils/Guest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home></Home>
          </CheckAuth>
        ),
        // element: token ? (
        //   <Home></Home>
        // ) : (
        //   <Navigate to="/login" replace={true} />
        // ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login></Login>
          </Guest>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
