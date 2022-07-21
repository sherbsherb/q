import styled from 'styled-components'
import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { store } from '@redux/store'
import { useWindowSize } from 'react-use'
import { Link } from 'react-router-dom'
import { clickOnNavItem } from './functions/clickOnNavItem'

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
  const shouldDisplayIconState = windowWidthState < widthWhenIconsAreShown
  /**
  * needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  */
  const shouldOpenThisMenuState = useSelector(state => state.nav.idsToCurrentMenuItems.at(1) === id)
  /**
  * get navItem details
  */
  const navStructure = useSelector(state => state.nav.navStructure)
  const navItem = navStructure[0].menuItems!.find(menuItem => menuItem.id === id)
  const isNestedMenu = !!navItem?.menuItems
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link

  return (
    <LiStyled
      ref={navItemRef}
      className='nav-item'
    >
      <Link
        to={link || '/'}
        onClick={(e) => clickOnNavItem({ e, navItem, id, navItemRef })}
      >
        {icon && <Icon icon={icon} />}
        {!icon && shouldDisplayIconState && <Icon icon={name && name[0]} />}
        {name && <span className='nav-item-name'>{name}</span>}
        {isNestedMenu && <span className='arrow-for-nested-menu'>▼</span>}
        {children}
      </Link>
      {shouldOpenThisMenuState && <Menu />}
    </LiStyled>
  )
}

const LiStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 5px;
  margin-left: 10px;
  margin-right: 10px;
  user-select: none;

  & > a {
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    -webkit-user-drag: none;

    &:hover,
    &:focus,
    &:active {
      filter: brightness(1.2);
    }

    .nav-item-name {
      margin-left: 5px;
      margin-right: 5px;
      color: #bcbcbc;
      white-space: nowrap;
    }
    
    .arrow-for-nested-menu {
      display: none;
      position: absolute;
      top: calc(50% + 2px);
      transform: translateY(-50%);
      right: -8px;
      color: grey;
      font-size: 8px;
    }
  
    &:hover > .arrow-for-nested-menu {
      display: block;
    }
  }


  @media screen and (max-width: 480px) {
    position: static;
  }
`
