import { createBrowserRouter } from "react-router";
import RootLayout from "./router/RootLayout";
import Home from "./page/home/Home";
import ScholarshipDetails from "./component/ScholarshipDetails";
import Register from "./component/Register";
import Login from "./component/Login";
import Scholarship from "./component/Scholarship";
import Checkout from "./component/Checkout";
import Dashboard from "./component/Dashboard";
import MyProfile from "./component/MyProfile";
import ManegeUser from "./component/ManegeUser";
import AddScholarship from "./component/AddScholarship";
import Analytics from "./component/Analytics";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path: "/scholarshipDetail/:id",
          element: <ScholarshipDetails></ScholarshipDetails>
        },
        {
          path: "/register",
          element: <Register>,</Register>
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/Scholarship",
          element: <Scholarship></Scholarship>,

        },
        {
          path: "/checkout",
          element: <Checkout></Checkout>,
        },
        {
          path: "/dashboard",
          element: <Dashboard></Dashboard>,
        },
        {
          path: "/myProfile",
          element: <MyProfile></MyProfile>
        },
        {
          path: "/dashboard/manegeUser",
          element: <ManegeUser></ManegeUser>
        },
        {
          path: "/dashboard/add-scholarship",
          element: <AddScholarship></AddScholarship>
        },
        {
          path: "/dashboard/analytics",
          element: <Analytics></Analytics>
        }

    ]
  },
]);