import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useDispatchTyped, useSelectorTyped } from '@store/storeHooks'
import { setScreenWidthWhenDisplayBurger, setScreenWidthWhenHideIcon, setScreenWidthWhenHideLogoExtension, setScreenWidthWhenHideLogoPart, setScreenWidthWhenHideText } from '@src/redux/slices/navSlice'
import { calcMediaQueriesParams } from './calcMediaQueriesParams'

export function Nav() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const screenWidthWhenHideIcon = useSelectorTyped(state => state.nav.mediaQueryWidth.icon)
  const screenWidthWhenHideText = useSelectorTyped(state => state.nav.mediaQueryWidth.text)
  const screenWidthWhenShowBurger = useSelectorTyped(state => state.nav.mediaQueryWidth.burger)
  const dispatch = useDispatchTyped()

  useLayoutEffect(() => {
    const {
      screenWidthWhenHideLogoExtension,
      screenWidthWhenHideLogoPart,
      screenWidthWhenHideIcon,
      screenWidthWhenHideText,
      screenWidthWhenDisplayBurger
    } = calcMediaQueriesParams(navRef.current, logoRef.current)

    dispatch(setScreenWidthWhenHideLogoExtension(screenWidthWhenHideLogoExtension))
    dispatch(setScreenWidthWhenHideLogoPart(screenWidthWhenHideLogoPart))
    dispatch(setScreenWidthWhenHideIcon(screenWidthWhenHideIcon))
    dispatch(setScreenWidthWhenHideText(screenWidthWhenHideText))
    dispatch(setScreenWidthWhenDisplayBurger(screenWidthWhenDisplayBurger))
  }, [])

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
