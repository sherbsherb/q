import styled from 'styled-components'
import { Fade as HamburgerIcon } from 'hamburger-react'
// https://hamburger-react.netlify.app/

export function Hamburger() {
  return (
    <HamburgerContainer>
      <HamburgerIcon size={20} color='white'/>
    </HamburgerContainer>
  )
}

const HamburgerContainer = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00aaff;
`
