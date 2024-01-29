import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { AuthPage, Unauth, HomePage, ProfilePage, GamePage } from "@/pages";
import { Ref, createRef } from "react";
import ErrorPage from "@/pages/error/error-page";

type Route = {
    path: string,
    name: string,
    element: JSX.Element,
    nodeRef: Ref<HTMLElement>,
}
export const routes: Route[] = [
    {
        path: "/",
        name: "Главная",
        element: <HomePage />,
        nodeRef: createRef(),
    },
    {
        path: "/profile",
        name: "Профиль",
        element: <ProfilePage />,
        nodeRef: createRef(),
    },
    {
        path: "/game/:id",
        name: "Профиль",
        element: <GamePage />,
        nodeRef: createRef(),
    },
]

const router = createBrowserRouter([
    {
        element: <AuthPage />,
        path: "/auth",
    },
    {
        element: <Unauth />,

        path: '/unauth',
    },
    {
        element: <RootLayout />,
        errorElement: <ErrorPage/>,
        children: routes.map(route => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element
        }))
    }
])

export default router;