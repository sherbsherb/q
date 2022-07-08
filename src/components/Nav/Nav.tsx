import styled from 'styled-components'
import { useSelectorTyped } from '@store/storeHooks'
import { NavItem } from './NavItem'
import { MenuType } from './navStructure'
import { Logo } from './Logo'
import { Hamburger } from './Hamburger'

export function Nav() {
  const nav = useSelectorTyped(state => state.nav)
  return (
    <NavStyled>
      <Logo />
      <Ul>
        {nav.map(
          (menuO: MenuType) => !menuO.hidden && <NavItem menuO={menuO} key={menuO.id} />
        )}
      </Ul>
      <Hamburger />
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  display: flex;
  position: sticky;
  top: 0px;
  margin: 5px;
  padding: 0 1rem;
  /* margin: 0px 0px 5px 0px; */
  height: 60px;
  border-radius: 4px;
  background: rgb(52 52 52 / 98%);
  z-index: 2;
  
`

const Ul = styled.ul`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  background: yellow;
`
