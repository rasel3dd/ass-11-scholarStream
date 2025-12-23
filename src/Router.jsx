import { createBrowserRouter } from "react-router";
import RootLayout from "./router/RootLayout";
import Home from "./page/home/Home";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        
    ]
  },
]);