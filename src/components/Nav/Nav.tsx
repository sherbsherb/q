import { useEffect, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { setNavMediaQueryWidths } from '@slices/navSlice'
import { calcNavMediaQueryParams } from './functions/calcNavMediaQueryParams'
import { useIsInitRender } from '@src/functions/useIsInitRender'
import { navStructure } from './navStructure'
import { useNavigate } from 'react-router-dom'

export function Nav() {
  const navRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const logoRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const mediaQueryWidthState = useSelector(state => state.nav.mediaQueryWidth)
  const dispatch = useDispatchTyped()
  const isInitRender = useIsInitRender()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
  }, [])

  useEffect(() => {
    if (!isInitRender) return

    type ShortcutsArr = {
      shortcut: string[]
      function: (() => void) | null
      link: string | null
    }
    const shortcuts: ShortcutsArr[] = []
    let arr = navStructure
    function searchForShortcuts() {
      arr.forEach((menuItem) => {
        if (menuItem.shortcut) {
          shortcuts.push({
            shortcut: menuItem.shortcut,
            function: menuItem.func || null,
            link: menuItem.link || null
          })
        }
      })
      arr.forEach((menuItem) => {
        if (menuItem.menuItems) {
          arr = menuItem.menuItems
          searchForShortcuts()
        }
      })
    }
    searchForShortcuts()

    let keysPressed: string[] = []

    window.addEventListener('keydown', (e) => {
      keysPressed.push(e.key.toLowerCase())
    })
    window.addEventListener('keyup', (e) => {
      keysPressed.push(e.key.toLowerCase())
      keysPressed = [...new Set(keysPressed)]
      const shortcutItem = shortcuts.find(o => {
        const shortcutSorted = [...o.shortcut].sort() // do not sort original array
        const shortcutStr = shortcutSorted.join('')
        const pressedKeysStr = keysPressed.sort().join('')
        return shortcutStr === pressedKeysStr
      })

      keysPressed = keysPressed.filter(key => key !== e.key.toLocaleLowerCase())
      if (shortcutItem === undefined) return
      if (shortcutItem.function) {
        shortcutItem.function()
      }
      if (shortcutItem.link) {
        navigate(shortcutItem.link)
      }
    })
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
