import {
    createBrowserRouter,
  } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Share/Menu";
import Order from "../Pages/OrderPage/Order";
import Login from "./Login";
import Register from "./Register";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart";
import AllUsers from "../Pages/AdMin/AllUsers";
import AdminHome from "../Pages/AdMin/AdminHome";
import AdItem from "../Pages/Dashboard/AddItem/AdItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
        },
        {
            path:'menu',
            element:<Menu></Menu>,
        },
        {
            path:'order/:category',
            element:<Order></Order>,
        },
        {
            path:'order',
            element:<Order></Order>,
        },
        {
            path:'login',
            element:<Login></Login>,
        },
        {
            path:'register',
            element:<Register></Register>,
        },
      ],
    },
    {
      path:'dashboard',
      element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children:[
        {
          path:'mycart',
          element:<MyCart></MyCart>
        },
        {
          path:'userhome',
          element:<UserHome></UserHome>
        },
        {
          path:'adminhome',
          element:<AdminHome><AdminHome></AdminHome></AdminHome>
        },
        {
          path:'allusers',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },
        {
          path:'addItem',
          element:<AdminRoute><AdItem></AdItem></AdminRoute>
        },
        {
          path:'manageitems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
      ],
    },
  ]);
  

