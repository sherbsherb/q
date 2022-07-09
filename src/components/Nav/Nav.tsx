import { isOverflown } from '@functions/isOverflown'
import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { NavList } from './NavList'

export function Nav() {
  const navRef = useRef(null)
  const logoRef = useRef(null)

  useLayoutEffect(() => {
    const nav = navRef.current
    const logo = logoRef.current
    const initNavWidth = nav.offsetWidth

    console.log(navRef)
    console.log(logoRef)

    function shrinkElementSlightly(element) {
      element.style.width = element.offsetWidth - 10 + 'px'
    }

    nav.style.width = 2000 + 'px'

    let screenWidthWhenLogoHasToBeSmaller
    while (!isOverflown(logo)) {
      shrinkElementSlightly(nav)
      console.log(nav.offsetWidth)
    }
    screenWidthWhenLogoHasToBeSmaller = nav.offsetWidth + 10

    nav.style.width = ''
  }, [])

  return (
    <NavStyled ref={navRef}>
      <Logo logoRef={logoRef}/>
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
  background: rgb(52 52 52 / 95%);
  z-index: 2;
`
