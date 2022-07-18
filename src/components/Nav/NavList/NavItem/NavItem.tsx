// import Link from 'next/link'
import styled from 'styled-components'
import { setNavItemRightPos, openMenuWithId, closeMenu } from '@slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { navStructure } from '../../navStructure'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { store } from '@redux/store'
import { useWindowSize } from 'react-use'
import { Link } from 'react-router-dom'

type NavItemType = {
  children?: React.ReactNode,
  id: string
}

/**
* @descriptions
* - navItem gets 'menu id' from 'navStructure'
* - menu is placed under navItem (li)
* - and we can open corresponding menu on click event
* - reference to menu item <li> to pass it into menu
* - needs to calculate how NavItem' is far from the screen to understand how to place Menu
* - Menu can be placed with style left:0 or right:0
* - required to avoid Menu to go over the narrow window
*/

export function NavItem({ children, id }: NavItemType) {
  const dispatch = useDispatchTyped()

  /**
  * required to avoid Menu to go over the narrow window
  */
  const navItemRef = useRef() as React.MutableRefObject<HTMLLIElement>
  /**
  * @descriptions
  * - with media query at some width we hide names and show icons
  * - if icon is not provided in navStructure we may generate it dynamically
  * - do it only for such width when only icons are show
  * - for that reason we track window's width with 'useWindowSize' hook
  */
  const windowWidthState = useWindowSize().width
  const widthWhenIconsAreShown = store.getState().nav.mediaQueryWidth.icon
  const shouldDisplayIcon = windowWidthState < widthWhenIconsAreShown
  /**
  * needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  */
  const shouldOpenThisMenuState = useSelector(state => state.nav.idsToCurrentMenuItems.at(1) === id)
  /**
  * get navItem details
  */
  const navItem = navStructure[0].menuItems!.find(menuItem => menuItem.id === id)
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link
  const menuItems = navItem?.menuItems
  const func = navItem?.func

  function onClickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    (document.activeElement as HTMLElement).blur() // to prevent open an active navItem link on Enter key
    console.log(666)

    if (link) {
      // just follow the link natively
      return
    }

    // all navItems are links and we do not to follow them if they are not really links
    e.preventDefault()

    // handle separately burger click
    const isBurger = store.getState().nav.idsToCurrentMenuItems.includes('burger')
    if (isBurger) {
      dispatch(closeMenu())
      return
    }

    // if click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
    const currentMenuId = store.getState().nav.idsToCurrentMenuItems.at(-1)
    const isMenuOpenedUnderThisNavItem = currentMenuId === id && currentMenuId !== 'top'
    if (isMenuOpenedUnderThisNavItem) {
      dispatch(closeMenu())
      return
    }

    if (func) {
      func()
      return
    }

    if (menuItems) {
      // open the menu and determine its position (right: 0 OR left: 0)
      const navItemRightPos = navItemRef.current.getBoundingClientRect().right
      dispatch(setNavItemRightPos(navItemRightPos))
      dispatch(openMenuWithId(id))
    }
  }

  return (
    <LiStyled
      ref={navItemRef}
      className='nav-item'
    >
      <Link
        to={link || '/'}
        onClick={onClickHandler}
      >
        {icon && <Icon icon={icon} />}
        {!icon && shouldDisplayIcon && <Icon icon={name && name[0]} />}
        {name && <span className='nav-item-name'>{name}</span>}
        {children}
      </Link>
      {shouldOpenThisMenuState && <Menu />}
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

  & > a {
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
