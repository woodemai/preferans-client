import Logo from "@/shared/components/Logo";
import NavItem from "./NavItem";

const links = [
    {
        label: "Home",
        link: "/"
    },
    {
        label: "Auth",
        link: "/auth"
    },
]

const Header = () => {
  return (
    <header className="bg-card shadow-sm flex justify-between items-center p-4 border-b w-full">
        <div className="flex flex-row gap-4">
            <Logo/>
            <h1 className="text-3xl font-bold">Preferans</h1>
        </div>
        <nav>
            {links.map(link => <NavItem key={link.label} link={link.link} label={link.label}/>)}
        </nav>
    </header>
  )
}

export default Header   