import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useAppSelector } from "@/shared/store/hooks";
import { authApi } from "@/shared/store/services/AuthService";
import {  useEffect, useState } from "react";


export const ProfilePage = () => {

    const { name: initialName, email, id } = useAppSelector(state => state.authReducer.user)
    const [handleLogout] = authApi.useLogoutMutation()
    const [name, setName] = useState(initialName)
    const [isNameChanging, setIsNameChanging] = useState(false)
    const [changeName] = authApi.useChangeNameMutation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleIsNameChanging = () => {
        setIsNameChanging(!isNameChanging)
        if (isNameChanging) {
            changeName({ userId: id, newName: name })
        }
    }
    useEffect(() => {
        setName(initialName)
    }, [initialName])

    return (
        <div className="fixed w-full h-dvh flex justify-center items-center">
            <div className="bg-card p-4 rounded-md shadow-md w-full sm:max-w-sm flex flex-col gap-4">
                <table>
                    <tbody>
                        <tr className="flex gap-4">
                            <td className="font-bold">Имя</td>
                            <td>{isNameChanging ? <Input autoFocus value={name} onChange={handleChange} /> : name}</td>
                        </tr>
                        <tr className="flex gap-4">
                            <td className="font-bold">Почта</td>
                            <td>{email}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={handleIsNameChanging}>{isNameChanging ? 'Готово' : 'Изменить имя'}</Button>
                <Button onClick={() => handleLogout()} variant={'secondary'}>Выйти</Button>
            </div>

        </div>
    )
}


export default ProfilePage