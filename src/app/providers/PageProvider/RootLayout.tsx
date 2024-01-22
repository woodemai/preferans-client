import { Toaster } from "@/shared/components/ui/toaster";
import { Outlet } from "react-router";
import Header from "./Header";
import { useAuth } from "@/shared/hooks/useAuth";

export default function RootLayout() {
    useAuth();

    return (
        <>
            <Header/>
            <Toaster/>
            <div className="flex flex-col items-center w-full">  
            <Outlet />
            </div>
        </>
    )
}