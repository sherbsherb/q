import { openMenuXXX, closeBurger, openMenu, closeMenuXXX, setNavItemRightPos } from '@src/redux/slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { createContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { MenuType, MenuTypeInObject, navStructure } from '../../navStructure'
// import Link from 'next/link'
import { Icon } from './Icon'
import { Menu } from './Menu'

// #region CONTEXT NAV ITEM
export type MenuStateType = {
  menu: MenuType[]
  openedId: string
  prevMenus: MenuStateType[]
}
export type ContextNavItemType = {
  menuState: MenuStateType
  setMenuState: React.Dispatch<React.SetStateAction<MenuStateType>>
  hideMenu: () => void
  menu: MenuType
  navItemRef: React.MutableRefObject<HTMLLIElement>
}
export const ContextNavItem = createContext<ContextNavItemType | null>(null)
// #endregion

/**
* @descriptions
* - menu is placed under navItem (li)
* - navItems are elements on top of navStructure array
* - navItem gets its menu object (menu) from navStructure via props
* - and we can open corresponding menu on click event
*/

type NavItemType = {
  children?: React.ReactNode,
  id: string
} & MenuTypeInObject

export function NavItem({ menu, children, id }: NavItemType) {
  /**
   * @constant
   * - Reference to menu item <li> to pass it into menu
   * - to let it know where to put set left:0 or right:0
   * - to avoid going over the window if window is narrow
   */
  const navItemRef = useRef() as React.MutableRefObject<HTMLLIElement>
  const [menuState, setMenuState] = useState<MenuStateType>({ menu: [], openedId: '', prevMenus: [] })
  const dispatch = useDispatchTyped()
  const menuIdsChain = useSelector(state => state.nav.menuIdsChain)

  function showMenu(menu: MenuType) {
    // setMenuState({ menu: menu.menu || [], openedId: menu.id, prevMenus: [] })
    const navItemRightPos = navItemRef.current.getBoundingClientRect().right
    dispatch(setNavItemRightPos(navItemRightPos))
    dispatch(openMenuXXX(id))
  }

  function hideMenu() {
    // setMenuState({ ...menuState, openedId: '' })
    dispatch(closeMenuXXX())
    dispatch(closeBurger())
  }

  function onClickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    if (menu.link) return // if a link, just follow it
    e.preventDefault() // to avoid link navigation
    const isThisMenuAlreadyOpened = menuState.openedId === menu.id
    if (isThisMenuAlreadyOpened) {
      hideMenu()
      return
    }
    showMenu(menu)
  }

  const contextValue = { menuState, setMenuState, hideMenu, menu }

  const navItem = navStructure.find(menu => menu.id === id)
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link

  return (
    <ContextNavItem.Provider value={contextValue}>
      <LiStyled ref={navItemRef}>
        <a
          href={link || '/'}
          onClick={onClickHandler}
        >
          {icon && <Icon icon={icon} />}
          {name && <span className='nav-item-name'>{name}</span>}
          {children}
        </a>

        {/* show only specific menu for navItemId, otherwise all existing menus are shown */}
        {menuIdsChain.at(1) === id && <Menu />}
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
    -webkit-user-drag: none;

    &:hover {
      filter: brightness(1.2);
    }

    .nav-item-name {
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
