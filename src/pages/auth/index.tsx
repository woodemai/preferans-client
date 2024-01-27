import { useAppSelector } from "@/shared/store/hooks"
import AuthForm from "./components/AuthForm"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/shared/components/Logo";

export const AuthPage = () => {
  const { isAuth } = useAppSelector(state => state.authReducer);
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])  
  

  return (
    <div className="w-full h-screen flex flex-col gap-y-8 justify-center items-center">
      <Logo/>
      <h1 className="text-3xl font-bold">Преферанс Онлайн</h1>
      <AuthForm />
    </div>
  )
}