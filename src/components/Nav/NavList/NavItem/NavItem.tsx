// import Link from 'next/link'
import styled from 'styled-components'
import { setNavItemRightPos, openMenu, closeMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { navStructure } from '../../navStructure'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { store } from '@src/redux/store'

type NavItemType = {
  children?: React.ReactNode,
  id: string
}

/**
* @descriptions
* - navItem gets 'menu' object from 'navStructure' array and passed in props
* - menu is placed under navItem (li)
* - and we can open corresponding menu on click event
*/

export function NavItem({ children, id }: NavItemType) {
  /**
   * @constant
   * - reference to menu item <li> to pass it into menu
   * - needs to calculate how NavIte' is far from the screen to understand how to place Menu
   * - Menu can be placed with style left:0 or right:0
   * - required to avoid Menu to go over the narrow window
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

    // if we click on NavItem for which Menu is opened, then close it, otherwise it closes and opens immediately
    const currentMenuId = store.getState().nav.idsToCurrentMenu.at(-1)
    const isMenuOpenedUnderThisNavItem = currentMenuId === id && currentMenuId !== 'top'
    if (isMenuOpenedUnderThisNavItem) {
      console.log('why???')
      dispatch(closeMenu())
      return
    }

    // handle separately burger click
    const isBurger = store.getState().nav.idsToCurrentMenu.includes('burger')
    if (isBurger) {
      dispatch(closeMenu())
      return
    }

    // open the menu and determine its position (right: 0 OR left: 0)
    const navItemRightPos = navItemRef.current.getBoundingClientRect().right
    dispatch(setNavItemRightPos(navItemRightPos))
    dispatch(openMenu(id))
  }

  return (
    <LiStyled ref={navItemRef} className='nav-item'>
      <a href={link || '/'} onClick={onClickHandler}>
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
