import styled from 'styled-components'
import { Fade as HamburgerIcon } from 'hamburger-react'
import { useState } from 'react'
// https://hamburger-react.netlify.app/

export function Hamburger() {
  const [isOpen, setOpen] = useState(false)
  // console.log('isOpen', isOpen)
  // setTimeout(() => { setOpen(!isOpen) }, 1000)

  return (
    <HamburgerContainer>
      <HamburgerIcon
        toggled={isOpen}
        toggle={setOpen}
        size={20}
        color='white'
        rounded
        label='Show menu'
        onToggle={toggled => {
          if (toggled) console.log('menu opened')
          if (!toggled) console.log('menu closed')
        }} />
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
