import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "@/pages/home/HomePage";
import AuthPage from "@/pages/auth";

const router = createBrowserRouter([
    {
        element: <AuthPage/>,
        path: "/auth",
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                id: "Home"
            },
        ]
    }
])

export default router;