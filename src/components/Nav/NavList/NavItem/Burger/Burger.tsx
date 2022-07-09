import styled from 'styled-components'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useDispatchTyped, useSelectorTyped } from '@src/redux/store/storeHooks'
import { toggleBurger } from '@src/redux/slices/navSlice'
// https://hamburger-react.netlify.app/

export function Burger() {
  const isOpen = useSelectorTyped(state => state.nav.burger.isOpen)
  const dispatch = useDispatchTyped()

  return (
    <BurgerContainer>
      <BurgerIcon
        toggled={isOpen}
        toggle={() => dispatch(toggleBurger())}
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
