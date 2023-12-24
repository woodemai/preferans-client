import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "@/pages/home/HomePage";
import AuthPage from "@/pages/auth";
import Spinner from "@/shared/components/ui/spinner";
import CreateGamePage from "@/pages/create-game/CreateGamePage";

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
                path: '/create-game',
                element: <CreateGamePage/>,
            }
        ]
    }
])

export default router;