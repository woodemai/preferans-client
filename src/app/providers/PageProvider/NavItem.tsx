import { Button } from '@/shared/components/ui/button'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
    link: string,
    label: string
}

const NavItem:FC<Props> = ({link,label}) => {
  return (
    <Button variant="link" type='button'><NavLink to={link}>{label}</NavLink></Button>
  )
}

export default NavItem