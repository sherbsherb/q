import styled from 'styled-components'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useState } from 'react'
// https://hamburger-react.netlify.app/

export function Burger() {
  const [isOpen, setOpen] = useState(false)
  // console.log('isOpen', isOpen)
  // setTimeout(() => { setOpen(!isOpen) }, 1000)

  return (
    <BurgerContainer>
      <BurgerIcon
        toggled={isOpen}
        toggle={setOpen}
        size={20}
        color='white'
        rounded
        label='Show menu'
        onToggle={toggled => {
          // if (toggled) console.log('menu opened')
          // if (!toggled) console.log('menu closed')
        }} />
    </BurgerContainer>
  )
}

const BurgerContainer = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
`
