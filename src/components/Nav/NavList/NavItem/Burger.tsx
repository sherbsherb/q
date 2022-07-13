import styled from 'styled-components'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@src/redux/store/storeHooks'
import { toggleBurger } from '@src/redux/slices/navSlice'
// https://hamburger-react.netlify.app/

export function Burger() {
  const isOpen = useSelector(state => state.nav.burger.isOpen)
  const dispatch = useDispatchTyped()
  const screenWidthWhenShowBurger = useSelector(state => state.nav.mediaQueryWidth.burger)

  return (
    <BurgerContainer screenWidthWhenShowBurger={screenWidthWhenShowBurger}>
      <BurgerIcon
        toggled={isOpen}
        toggle={() => dispatch(toggleBurger())}
        size={20}
        color='#bcbcbc'
        rounded
        label='Show menu'
        onToggle={toggled => {
          // if (toggled) console.log('menu opened')
          // if (!toggled) dispatch(closeMenu())
        }}
      />
    </BurgerContainer>
  )
}
type PropsForSC = {
  screenWidthWhenShowBurger: number
}

const BurgerContainer = styled.div<PropsForSC>`
  display: none;

  @media (max-width: ${props => props.screenWidthWhenShowBurger}px) {
    display: block;
  }
`