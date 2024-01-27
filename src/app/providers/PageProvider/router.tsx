import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { AuthPage, Unauth, HomePage, ProfilePage, GamePage } from "@/pages";

const router = createBrowserRouter([
    {
        element: <AuthPage/>,
        path: "/auth",
    },
    {
        element: <Unauth/>,
        path: '/unauth',
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: '/profile',
                element: <ProfilePage/>,
            },
            {
                path: `/game/:id`,
                element: <GamePage/>,

            }
        ]
    }
])

export default router;