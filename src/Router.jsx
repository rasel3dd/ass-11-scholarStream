import { createBrowserRouter } from "react-router";
import RootLayout from "./router/RootLayout";
import Home from "./page/home/Home";
import ScholarshipDetails from "./component/ScholarshipDetails";





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
          path: "//scholarship/:id",
          element: <ScholarshipDetails></ScholarshipDetails>
        }
    ]
  },
]);