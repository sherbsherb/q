import { isOverflown } from '@functions/isOverflown'
import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useDispatchTyped, useSelectorTyped } from '@store/storeHooks'
import { setScreenWidthWhenDisplayBurger, setScreenWidthWhenHideIcon, setScreenWidthWhenHideLogoExtension, setScreenWidthWhenHideLogoPart, setScreenWidthWhenHideText } from '@src/redux/slices/navSlice'

export function Nav() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const screenWidthWhenHideIcon = useSelectorTyped(state => state.nav.mediaQueryWidth.icon)
  const screenWidthWhenHideText = useSelectorTyped(state => state.nav.mediaQueryWidth.text)
  const screenWidthWhenShowBurger = useSelectorTyped(state => state.nav.mediaQueryWidth.burger)


  const dispatch = useDispatchTyped()

  const shrinkElementSlightly = (element) => { element.style.width = element.offsetWidth - 10 + 'px' }

  function windowWidthWhenHideLogoExtension() {
    const nav = navRef.current
    const logo = logoRef.current
    nav.style.width = 1000 + 'px'

    // get width when hide '.app' from logo
    while (!isOverflown(logo)) shrinkElementSlightly(nav)
    console.log(nav.offsetWidth + 30)
    dispatch(setScreenWidthWhenHideLogoExtension(nav.offsetWidth + 30))
    nav.querySelector('.app-ext').style.display = 'none'
    nav.style.width = nav.offsetWidth + 100 + 'px'

    // get width when hide 'uotation' from logo
    while (!isOverflown(logo)) shrinkElementSlightly(nav)
    console.log(nav.offsetWidth + 30)
    dispatch(setScreenWidthWhenHideLogoPart(nav.offsetWidth + 30))
    nav.querySelector('.uotation').style.display = 'none'
    nav.style.width = nav.offsetWidth + 100 + 'px'

    // get width when hide icons
    while (!isOverflown(logo)) shrinkElementSlightly(nav)
    console.log(nav.offsetWidth + 30)
    dispatch(setScreenWidthWhenHideIcon(nav.offsetWidth + 30))
    Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style.display = 'none' })
    nav.style.width = nav.offsetWidth + 100 + 'px'

    // get width when hide text
    while (!isOverflown(logo)) shrinkElementSlightly(nav)
    console.log(nav.offsetWidth + 30)
    dispatch(setScreenWidthWhenHideText(nav.offsetWidth + 30))
    Array.from(nav.querySelectorAll('.nav-item-text')).forEach((el) => { el.style.display = 'none' })
    Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style = '' })
    nav.style.width = nav.offsetWidth + 100 + 'px'

    // get width when show burger
    while (!isOverflown(logo)) shrinkElementSlightly(nav)
    console.log(nav.offsetWidth + 30)
    dispatch(setScreenWidthWhenDisplayBurger(nav.offsetWidth + 30))

    // show elements back on screen after calculation
    nav.querySelector('.app-ext').style = ''
    nav.querySelector('.uotation').style = ''
    Array.from(nav.querySelectorAll('.icon-round-wrapper')).forEach((el) => { el.style = '' })
    Array.from(nav.querySelectorAll('.nav-item-text')).forEach((el) => { el.style = '' })
    nav.style = ''
  }

  useLayoutEffect(windowWidthWhenHideLogoExtension, [])

  return (
    <NavStyled
      ref={navRef}
      screenWidthWhenHideIcon={screenWidthWhenHideIcon}
      screenWidthWhenHideText={screenWidthWhenHideText}
      screenWidthWhenShowBurger={screenWidthWhenShowBurger}
    >
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
  height: 60px;
  border-radius: 4px;
  background: rgb(52 52 52 / 95%);
  z-index: 2;
  contain: layout inline-size;

  & > ul > li > a > .icon-round-wrapper {
    @media (max-width: ${props => props.screenWidthWhenHideIcon}px) and (min-width: ${props => props.screenWidthWhenHideText}px) {
      display: none;
    }
    @media (max-width: ${props => props.screenWidthWhenShowBurger}px) {
      display: none;
    }
  }

  .nav-item-text {
    @media (max-width: ${props => props.screenWidthWhenHideText}px) {
      display: none;
    }
  }

  li:not(:last-child) {
    @media (max-width: ${props => props.screenWidthWhenShowBurger}px) {
      display: none;
    }
  }

  li:last-child {
    display: none;

    @media (max-width: ${props => props.screenWidthWhenShowBurger}px) {
      display: flex;
    }

  }



`
