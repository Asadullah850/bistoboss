import {
    createBrowserRouter,
  } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Share/Menu";
import Order from "../Pages/OrderPage/Order";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart";

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
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'mycart',
          element:<MyCart></MyCart>
        },
      ],
    },
  ]);
  

