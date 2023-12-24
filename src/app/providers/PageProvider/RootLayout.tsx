import { Toaster } from "@/shared/components/ui/toaster";
import { Outlet } from "react-router";
import Header from "./Header";

export default function RootLayout() {
      
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