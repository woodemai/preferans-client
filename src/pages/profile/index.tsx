import { Button } from "@/shared/components/ui/button";
import { useAppSelector } from "@/shared/store/hooks";
import { authApi } from "@/shared/store/services/AuthService";

export const ProfilePage = () => {

    const {name, email} = useAppSelector(state => state.authReducer.user)
    const [handleLogout] = authApi.useLogoutMutation()

    return (
        <div className="fixed w-full h-dvh flex justify-center items-center">
            <div className="bg-card p-4 rounded-md shadow-md w-full sm:max-w-sm flex flex-col gap-4">
                <table>
                    <tbody>
                        <tr className="flex gap-4">
                            <td className="font-bold">Имя</td>
                            <td>{name}</td>
                        </tr>
                        <tr className="flex gap-4">
                            <td className="font-bold">Почта</td>
                            <td>{email}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={() => handleLogout()} variant={'secondary'}>Выйти</Button>
            </div>
            
        </div>
    )
}

