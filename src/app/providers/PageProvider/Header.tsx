import Logo from "@/shared/components/Logo";
import NavItem from "./NavItem";
import { useAppSelector } from "@/shared/store/hooks";
import { Button } from "@/shared/components/ui/button";
import { memo, useEffect, useState } from "react";
import { authApi } from "@/shared/store/services/AuthService";
import { ModeToggle } from "../ThemeProvider/ModeToggle";
interface Link {
    label: string,
    link: string
}
const initialLinks: Link[] = [
    {
        label: "Главная",
        link: "/"
    },

]

const Header = memo(() => {
    const [links, setLinks] = useState<Link[]>(initialLinks)
    const { isAuth } = useAppSelector(state => state.authReducer)
    const [handleLogout] = authApi.useLogoutMutation()

    useEffect(() => {
        if (!isAuth) {
            setLinks([...initialLinks, { label: 'Войти', link: '/auth' }])
        } else {
            setLinks([...initialLinks, { label: 'Профиль', link: '/profile' }])
        }
    }, [isAuth])

    return (
        <header className="bg-card shadow-sm flex justify-between items-center p-4 border-b w-full">
            <div className="flex flex-row gap-4">
                <Logo />
                <h1 className="text-3xl font-bold">Преферанс</h1>
            </div>
            <div className="flex">
                <ModeToggle />
                <nav >
                    {links.map(link => <NavItem key={link.label} link={link.link} label={link.label} />)}
                    {isAuth && <Button onClick={() => handleLogout()} variant={'link'}>Выйти</Button>}
                </nav>
            </div>

        </header>
    )
})

export default Header   