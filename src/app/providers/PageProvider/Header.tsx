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
    <header className="flex justify-between items-center p-4 border-b">
        <div>
            <h1 className="text-3xl font-bold">Preferans</h1>
        </div>
        <nav>
            {links.map(link => <NavItem key={link.label} link={link.link} label={link.label}/>)}
        </nav>
    </header>
  )
}

export default Header   