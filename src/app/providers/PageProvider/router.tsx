import { LazyRouteFunction, RouteObject, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { Ref, createRef, lazy } from "react";
import ErrorPage from "@/pages/error/error-page";
const AuthPage = lazy(() => import('@/pages/auth'))
const Unauth = lazy(() => import('@/pages/unauth'))
const HomePage = lazy(() => import('@/pages/home'))
const ProfilePage = lazy(() => import('@/pages/profile'))
const GamePage = lazy(() => import('@/pages/game'))
const InfoPage = lazy(() => import('@/pages/info'))



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
    {
        path: "/info",
        nodeRef: createRef(),
        element: <InfoPage />
    }
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