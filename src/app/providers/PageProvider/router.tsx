import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "@/pages/home/HomePage";
import AuthPage from "@/pages/auth";
import Spinner from "@/shared/components/ui/spinner";
import GamePage from "@/pages/game/GamePage";

const router = createBrowserRouter([
    {
        element: <AuthPage/>,
        path: "/auth",
        loader: () => <Spinner/>
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                loader: () => <Spinner/>
            },
            {
                path: `/game/:id`,
                element: <GamePage/>,
            }
        ]
    }
])

export default router;