import { createContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Icon } from './Icon'
import { Menu } from './Menu'

export const ContextNavItem = createContext(null)

export function NavItem({ menuO }) {
  /**
   * @constant
   * Reference to menu item <li> to pass it into opening menu to let menu know where to put left or right side to avoid going over the window if window is narrow
   */
  const liRef = useRef()
  const [showMenuState, setShowMenuState] = useState(false)
  const [openedMenuState, setOpenedMenuState] = useState(null)
  const contextValue = { openedMenuState, setOpenedMenuState, showMenuState, setShowMenuState, showMenu, menuO, liRef }

  function showMenu(o) {
    const menu = o.menu
    setShowMenuState(true)
    setOpenedMenuState({ ...menu, navItemId: o.id, prevMenu: [] })
  }

  // every li get its menuO from navStructure via props and we can open it on click event
  return (
    <ContextNavItem.Provider value={contextValue}>
      <LiStyled ref={liRef}>
        <a
          href={menuO.link || '/'}
          onClick={e => {
            console.log(666)
            const isLink = !!menuO.link
            if (isLink) return // if a link, just follow it
            e.preventDefault()
            // e.nativeEvent.stopImmediatePropagation();
            showMenu(menuO)
          }}
        >
          {menuO.icon && <Icon icon={menuO.icon} />}
          {menuO.text && <span className='nav-item-text'>{menuO.text}</span>}
        </a>

        {/* show only specific menu for navItemId, otherwise all existing menus are shown */}
        {showMenuState && openedMenuState?.navItemId === menuO.id && <Menu />}
      </LiStyled>
    </ContextNavItem.Provider>
  )
}

const LiStyled = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 5px;
  margin-left: 10px;
  user-select: none;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      filter: brightness(1.2);
    }

    .nav-item-text {
      margin-left: 5px;
      margin-right: 5px;
      color: #bcbcbc;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 480px) {
    position: static;
  }
`
