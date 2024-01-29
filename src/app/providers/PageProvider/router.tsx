import { LazyRouteFunction, RouteObject, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { Ref, createRef } from "react";
import ErrorPage from "@/pages/error/error-page";
import AuthPage from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { ProfilePage, Unauth } from "@/pages";
import { GamePage } from "@/pages/game";

type Route = {
    path: string,
    name?: string,
    element?: JSX.Element,
    nodeRef: Ref<HTMLElement>,
    lazy?: LazyRouteFunction<RouteObject>
}
export const routes: Route[] = [
    {
        path: "/",
        name: "Главная",
        nodeRef: createRef(),
        element: <HomePage/>
    },
    {
        path: "/profile",
        name: "Профиль",
        nodeRef: createRef(),
        element: <ProfilePage/>

    },
    {
        path: "/game/:id",
        nodeRef: createRef(),
        element: <GamePage/>

    },
]

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthPage/>
    },
    {
        path: '/unauth',
        element: <Unauth/>
    },
    {
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: routes.map(route => ({
            index: route.path === '/',
            path: route.path === '/' ? undefined : route.path,
            element: route.element,
        }))
    }
])

export default router;