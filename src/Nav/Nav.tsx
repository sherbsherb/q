import { Link } from 'react-router-dom'
import styled from 'styled-components'

export function Nav() {
  return (
    <NavStyled>
      <Link to="/">Back</Link>
      <Link to="/linkA">Link A</Link>
      <Link to="/linkB">Link B</Link>
      <Link to="/linkC">Link C</Link>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  & > * {
    margin: 0px 5px;
  }
`
