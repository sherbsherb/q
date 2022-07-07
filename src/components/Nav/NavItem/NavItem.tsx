import { createContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Icon } from './Icon'
import { Menu } from './Menu'
import type { MenuType, MenuTypeInObject } from '../navStructure'

export const ContextNavItem = createContext(null)

/**
* @descriptions
* - menu is placed under navItem (li)
* - navItems are elements on top of navStructure array
* - navItem gets its menu object (menuO) from navStructure via props
* - and we can open corresponding menu on click event
*/
export function NavItem({ menuO }: MenuTypeInObject) {
  /**
   * @constant
   * - Reference to menu item <li> to pass it into menu
   * - to let it know where to put set left:0 or right:0
   * - to avoid going over the window if window is narrow
   */
  const liRef = useRef()
  const [menuState, setMenuState] = useState({ menu: [], openedId: '', prevMenus: [] })
  const contextValue = { menuState, setMenuState, showMenu, hideMenu, menuO, liRef }

  function showMenu(menuO: MenuType) {
    setMenuState({ menu: menuO.menu, openedId: menuO.id, prevMenus: [] })
  }
  function hideMenu() {
    setMenuState({ ...menuState, openedId: '' })
  }
  function onClickHandler(e) {
    if (menuO.link) return // if a link, just follow it
    e.preventDefault()
    showMenu(menuO)
  }

  return (
    <ContextNavItem.Provider value={contextValue}>
      <LiStyled ref={liRef}>
        <a
          href={menuO.link || '/'}
          onClick={onClickHandler}
        >
          {menuO.icon && <Icon icon={menuO.icon} />}
          {menuO.text && <span className='nav-item-text'>{menuO.text}</span>}
        </a>

        {/* show only specific menu for navItemId, otherwise all existing menus are shown */}
        {menuState.openedId === menuO.id && <Menu />}
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
