import { Toaster } from "@/shared/components/ui/toaster";
import { Outlet } from "react-router";

export default function RootLayout() {
    return (
        <>
            <Toaster/>  
            <Outlet />
        </>
    )
}