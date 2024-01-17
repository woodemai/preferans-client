import { Toaster } from "@/shared/components/ui/toaster";
import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/store/hooks";
import { authSlice } from "@/shared/store/reducers/AuthSlice";
import { authApi } from "@/shared/store/services/AuthService";

export default function RootLayout() {
      const userJSON = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      const dispatch = useAppDispatch()
      useEffect(() => {
        if(userJSON && token) {
            const user = JSON.parse(userJSON)
            dispatch(authSlice.actions.handleStorageState({user, token}))
            dispatch(authApi.util.invalidateTags(['Auth']))
        }
      }, [dispatch, token, userJSON])
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