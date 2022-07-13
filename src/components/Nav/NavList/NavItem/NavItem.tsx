// import Link from 'next/link'
import styled from 'styled-components'
import { setNavItemRightPos, openMenu, closeMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { createContext, useRef } from 'react'
import { MenuType, navStructure } from '../../navStructure'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { store } from '@src/redux/store'

// #region CONTEXT NAV ITEM
export type MenuStateType = {
  menu: MenuType[]
  openedId: string
  prevMenus: MenuStateType[]
}
export type ContextNavItemType = {
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
}

export function NavItem({ children, id }: NavItemType) {
  /**
   * @constant
   * - Reference to menu item <li> to pass it into menu
   * - to let it know where to put set left:0 or right:0
   * - to avoid going over the window if window is narrow
   */
  const navItemRef = useRef() as React.MutableRefObject<HTMLLIElement>
  const dispatch = useDispatchTyped()
  const idsToCurrentMenu = useSelector(state => state.nav.idsToCurrentMenu)

  const navItem = navStructure[0].menu!.find(menu => menu.id === id)
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link

  function onClickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    if (link) return
    e.preventDefault()
    const currentMenuId = store.getState().nav.idsToCurrentMenu.at(-1)
    const isMenuOpenedUnderThisNavItem = currentMenuId === id && currentMenuId !== 'top'
    if (isMenuOpenedUnderThisNavItem) {
      // close it, otherwise it closes and opens immediately
      dispatch(closeMenu())
      return
    }
    const isBurger = store.getState().nav.idsToCurrentMenu.includes('burger')
    if (isBurger) {
      dispatch(closeMenu())
      return
    }

    const navItemRightPos = navItemRef.current.getBoundingClientRect().right
    dispatch(setNavItemRightPos(navItemRightPos))
    dispatch(openMenu(id))
  }

  return (
    <LiStyled ref={navItemRef}>
      <a
        href={link || '/'}
        onClick={onClickHandler}
      >
        {name && <span className='nav-item-name'>{name}</span>}
        {icon && <Icon icon={icon} />}
        {children}
      </a>
      {idsToCurrentMenu.at(1) === id && <Menu />}
    </LiStyled>
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
