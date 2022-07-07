import styled from 'styled-components'
import { useSelectorTyped } from '@store/storeHooks'
import { NavItem } from './NavItem'
import { MenuType } from './navStructure'

export function Nav() {
  const nav = useSelectorTyped(state => state.nav)
  return (
    <NavStyled>
      {/* <Logo /> */}
      <ul>
        {nav.map(
          (menuO: MenuType) => menuO.visible && <NavItem menuO={menuO} key={menuO.id} />
        )}
      </ul>
      {/* <Hamburger /> */}
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  margin: 0px 0px 5px 0px;
  border-radius: 4px;
  background: rgb(52 52 52 / 98%);
  height: 60px;
  padding: 0 1rem;
  position: sticky;
  top: 0px;
  margin: 5px;
  z-index: 2;

  ul {
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }
`
