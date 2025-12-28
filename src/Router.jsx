
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
import ManageScholarships from "./component/ManageScholarships";
import AdminRoute from "./component/AdminRoute";
import UpdateScholarship from "./component/UpdateScholarship";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "scholarshipDetail/:id",
        element: <ScholarshipDetails />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "Scholarship",
        element: <Scholarship />
      },
      {
        path: "checkout",
        element: <Checkout />
      },
      
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <MyProfile />
          },
          {
            path: "manage-users",
            element: <AdminRoute><ManegeUser /></AdminRoute>
          },
          {
            path: "add-scholarship",
            element: <AdminRoute><AddScholarship /></AdminRoute>
          },
          {
            path: "analytics",
            element: <AdminRoute><Analytics /></AdminRoute>
          },
          {
            path: "manage-scholarships",
            element: <AdminRoute><ManageScholarships /></AdminRoute>
          },
          {
            path: "update-scholarship/:id",
            element: <AdminRoute><UpdateScholarship /></AdminRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/scholarship/${params.id}`)
          }
        ]
      }
    ]
  },
]);