import { Toaster } from "@/shared/components/ui/toaster";
import { Outlet } from "react-router";
import Header from "./Header";
import { useAuth } from "@/shared/hooks/useAuth";

export default function RootLayout() {

    //   const userJSON = localStorage.getItem('user')
    //   const token = localStorage.getItem('token')

    //   const dispatch = useAppDispatch()

    //   useEffect(() => {
    //     if(userJSON && token) {
    //         const user = JSON.parse(userJSON)
    //         dispatch(authSlice.actions.handleStorageState({user, token}))
    //         dispatch(authApi.util.invalidateTags(['Auth']))
    //     }
    //   }, [dispatch, token, userJSON])
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