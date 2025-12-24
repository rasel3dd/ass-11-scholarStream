import { createBrowserRouter } from "react-router";
import RootLayout from "./router/RootLayout";
import Home from "./page/home/Home";
import ScholarshipDetails from "./component/ScholarshipDetails";
import Register from "./component/Register";
import Login from "./component/Login";
import Scholarship from "./component/Scholarship";





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

        }

    ]
  },
]);