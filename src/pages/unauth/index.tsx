import { Button } from "@/shared/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const Unauth = () => {

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex justify-center  flex-col gap-4 bg-card p-4 rounded-lg shadow-md">
                <div className="flex items-end gap-4">
                    <AlertTriangle size={30} color="red" />
                    <h1 className="text-xl font-bold tracking-tight">Вы не авторизованы</h1>
                </div>
                <p className="font-lighter text-sm">Чтобы продолжить играть вам необходимо войти в аккаунт</p>
                <div className="flex w-full justify-end"><Link to={'/auth'}><Button>Войти</Button></Link></div>
            </div>
        </div>
    )
}