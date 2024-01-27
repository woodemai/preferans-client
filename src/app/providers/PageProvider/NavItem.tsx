import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
    link: string,
    label: string
}

const NavItem:FC<Props> = memo(({link,label}) => {
  return (
    <NavLink className='text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline px-4 py-2' to={link}>{label}</NavLink>
  )
})

export default NavItem