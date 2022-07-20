import styled from 'styled-components'
import { MenuType } from '../navStructure'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped as useSelector } from '@store/storeHooks'

export function NavList() {
  const navStructure = useSelector(state => state.nav.navStructure)

  return (
    <Ul>
      {
        navStructure[0].menuItems!
          .filter((navItem) => !navItem.isHidden)
          .map((navItem: MenuType) => <NavItem id={navItem.id} key={navItem.id} />)
      }
      <NavItem id={'burger'} key={'burger'}><Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
