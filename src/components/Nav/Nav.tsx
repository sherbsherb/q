import styled from 'styled-components'
import { Logo } from './Logo'
import { NavList } from './NavList/NavList'

export function Nav() {
  return (
    <NavStyled>
      <Logo />
      <NavList />
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  position: sticky;
  top: 0px;
  margin: 5px;
  /* padding: 0 10px; */
  /* margin: 0px 0px 5px 0px; */
  height: 60px;
  border-radius: 4px;
  background: rgb(52 52 52 / 98%);
  z-index: 2;
`
