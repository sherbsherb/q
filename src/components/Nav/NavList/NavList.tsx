import { useSelectorTyped } from '@redux/store/storeHooks'
import styled from 'styled-components'
import { MenuType, navStructure } from '../navStructure'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'

export function NavList() {
  // const navStructure = useSelectorTyped(state => state.nav.navStructure)
  return (
    <Ul>
      {navStructure.map(
        (menuO: MenuType) => !menuO.hidden && <NavItem menuO={menuO} key={menuO.id} />
      )}
      <NavItem menuO={{ id: 'burgerId', menu: navStructure }} key={'burgerId'}> <Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
