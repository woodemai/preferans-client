import { Toaster } from "@/shared/components/ui/toaster";
import { Outlet } from "react-router";
import Header from "./Header";
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { useAuth } from "@/shared/hooks/useAuth";
import { useLocation, useOutlet } from "react-router-dom";
import { routes } from "./router";

export default function RootLayout() {
    const location = useLocation()
    const outlet = useOutlet()
    const { nodeRef } = routes.find(route => route.path === location.pathname) ?? {}
    useAuth();

    return (
        <main className="w-full h-screen">
            <Header />
            <SwitchTransition>
                <CSSTransition
                    key={location.pathname}
                    nodeRef={nodeRef}
                    timeout={300}
                    classNames={'page'}
                    unmountOnExit
                >
                    <div ref={nodeRef}>
                        {outlet}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </main>
    )
}