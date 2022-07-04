import styled from 'styled-components'
import { NavItem } from './NavItem/NavItem'
import { navStructure } from '../navStructure'
import { useSelectorTyped } from '@src/redux/store/storeHooks'

export function NavList() {
  const nav = useSelectorTyped(state => state.nav)
  return (
    <UlStyled>
      {/* <Logo /> */}
      {nav.map(
        menuO => menuO.visible && <NavItem menuO={menuO} key={menuO.id} />
      )}
      {/* <Hamburger /> */}
    </UlStyled>
  )
}

const UlStyled = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  padding: 0;
`
