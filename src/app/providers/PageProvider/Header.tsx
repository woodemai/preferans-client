import Logo from "@/shared/components/Logo";
import NavItem from "./NavItem";
import { useAppSelector } from "@/shared/store/hooks";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
interface Link {
    label: string,
    link: string
}
const initialLinks:Link[] = [
    {
        label: "Home",
        link: "/"
    },

]

const Header = () => {
    const [links, setLinks] = useState<Link[]>(initialLinks)
    const { isAuth } = useAppSelector(state => state.authReducer)
    
    useEffect(() => {
        if (!isAuth) {
            setLinks([...initialLinks, {label: 'Auth', link:'/auth'}])
        }else {
            setLinks(initialLinks)
        }
    }, [isAuth])
    return (
        <header className="bg-card shadow-sm flex justify-between items-center p-4 border-b w-full">
            <div className="flex flex-row gap-4">
                <Logo />
                <h1 className="text-3xl font-bold">Preferans</h1>
            </div>
            <nav>
                {links.map(link => <NavItem key={link.label} link={link.link} label={link.label} />)}
                {isAuth && <Button variant={'link'}>Logout</Button>}
            </nav>
        </header>
    )
}

export default Header   