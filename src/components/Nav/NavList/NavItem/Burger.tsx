import styled from 'styled-components'
import { Fade as BurgerIcon } from 'hamburger-react'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { toggleBurger } from '@slices/navSlice'
// https://hamburger-react.netlify.app/

export function Burger() {
  const dispatch = useDispatchTyped()
  const isOpenState = useSelector(state => state.nav.burger.isOpen)
  const screenWidthWhenShowBurgerState = useSelector(state => state.nav.mediaQueryWidth.burger)

  return (
    <BurgerContainer screenWidthWhenShowBurgerState={screenWidthWhenShowBurgerState}>
      <BurgerIcon
        toggled={isOpenState}
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
  screenWidthWhenShowBurgerState: number
}

const BurgerContainer = styled.div<PropsForSC>`
  display: none;

  @media (max-width: ${props => props.screenWidthWhenShowBurgerState}px) {
    display: block;
  }
`
