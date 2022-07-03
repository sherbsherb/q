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
  margin: 5px 0px;
  border-radius: 6px;
  background: rgb(52 52 52 / 98%);
  height: 60px;
  padding: 0 1rem;
  position: relative;
  /* position: sticky; */
  /* top: 5px; */
  z-index: 2;
`
