import styled from 'styled-components'
import { NavList } from './NavList'

export function Nav() {
  return (
    <NavStyled>
      <NavList />
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
`
