import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { setNavMediaQueryWidths } from '@slices/navSlice'
import { calcNavMediaQueryParams } from './functions/calcNavMediaQueryParams'

export function Nav() {
  const navRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const logoRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const mediaQueryWidthState = useSelector(state => state.nav.mediaQueryWidth)
  const dispatch = useDispatchTyped()

  useLayoutEffect(() => {
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
  }, [])

  return (
    <NavStyled
      ref={navRef}
      mediaQueryWidthState={mediaQueryWidthState}
    >
      <Logo logoRef={logoRef}/>
      <NavList />
    </NavStyled>
  )
}

type PropsForSC = {
  mediaQueryWidthState: {
    icon: number
    name: number
    burger: number
  }
}

const NavStyled = styled.nav<PropsForSC>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  position: sticky;
  top: 5px;
  margin: 5px;
  height: 60px;
  border-radius: 4px;
  background: rgb(52 52 52 / 95%);
  z-index: 2;
  contain: layout inline-size;

  & > ul > li > a > .icon-round-wrapper {
    @media (max-width: ${props => props.mediaQueryWidthState.icon}px) and (min-width: ${props => props.mediaQueryWidthState.name}px) {
      display: none;
    }
    @media (max-width: ${props => props.mediaQueryWidthState.burger}px) {
      display: none;
    }
  }

  .nav-item-name {
    @media (max-width: ${props => props.mediaQueryWidthState.name}px) {
      display: none;
    }
  }

  li:not(:last-child) {
    @media (max-width: ${props => props.mediaQueryWidthState.burger}px) {
      display: none;
    }
  }

  li:last-child {
    display: none;

    @media (max-width: ${props => props.mediaQueryWidthState.burger}px) {
      display: flex;
    }

  }
`
