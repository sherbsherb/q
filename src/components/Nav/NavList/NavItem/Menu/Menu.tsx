import styled from 'styled-components'
import { theme } from '@src/theme'
import { store } from '@src/redux/store'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { closeMenu } from '@src/redux/slices/navSlice'
import { useEffect, useRef } from 'react'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { MenuType } from '@components/Nav/navStructure'
import { isClickInsideThisElement } from '@functions/isClickInsideThisElement'
import { getClickedMenu } from './functions/getClickedMenu'
import { useMenuNavigation } from './useMenuNavigation'

export function Menu() {
  const dispatch = useDispatchTyped()
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenu = useSelector(state => getClickedMenu(state.nav.idsToNextMenu))
  const currentMenu = useSelector(state => getClickedMenu(state.nav.idsToCurrentMenu))
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenu.length > 2)
  const navItemRightPos = useSelector(state => state.nav.navItemRightPos)
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)

  const { goDownInMenu, goUpInMenu } = useMenuNavigation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, nextMenu })

  // #region KEYBOARD

  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  function navKeyboardHandler(e: KeyboardEvent) {
    const isNestedMenu = store.getState().nav.idsToCurrentMenu.length > 2

    if (isNestedMenu && e.key === 'Backspace') {
      goUpInMenu()
      return
    }
    if ((!isNestedMenu && e.key === 'Backspace') || e.key === 'Escape') {
      dispatch(closeMenu())
    }
  }

  useEffect(keyShortcutsForMenu, [])

  // #endregion

  // #region CLOSE MENU ON CLICK OUTSIDE

  /**
     * @descriptions
     * - menu is absolutely positioned inside NavItem li element
     * - if click outside menu - close
     * - if click on navItem do not close, but close it in NavItem onClick handler, otherwise it closes and opens immediately
     */

  function mouseDownHandler(e: MouseEvent) {
    const menu = menuContainerRef.current
    if (!menu) return
    const navItem = menuContainerRef.current.parentElement
    if (!navItem) return
    const clickedEl = e.target as HTMLElement
    const isClickOnOpenedNavItem = isClickInsideThisElement(clickedEl, navItem) && !isClickInsideThisElement(clickedEl, menu)
    if (isClickOnOpenedNavItem) return
    if (!isClickInsideThisElement(clickedEl, menu)) {
      dispatch(closeMenu())
    }
  }

  function hideMenuOnClickOutside() {
    document.addEventListener('mousedown', mouseDownHandler)
    return () => { document.removeEventListener('mousedown', mouseDownHandler) }
  }
  useEffect(hideMenuOnClickOutside, [])

  // #endregion

  // #region CHECK IF MENU GOES OUTSIDE WINDOW

  /**
  * check if menu width is more than distance to the left side of the window
  * @descriptions
  * - on NavItem click we store its 'right' position
  * - menu is absolute positioned below <li> and has same 'right' position
  * - if window is narrow, then menu can go over the screen's left side
  * - if so, we can fix 'left' side of the menu, instead of 'right'
  */

  const menuWidth = theme.menu.width
  const isMenuOutsideWindow = menuWidth > navItemRightPos

  // #endregion

  return (
      <MenuStyled
        className='drop-down-nav-menu'
        ref={menuContainerRef}
        isMenuOutsideWindow={isMenuOutsideWindow}
      >

        <div className='non-slidable'>
          {isNestedMenu ? <BackMenuItem goUpInMenu={goUpInMenu}/> : <CloseMenuItem />}
        </div>

        <div ref={currentMenuRef} className='slidable current'>
          {currentMenu.map((menu: MenuType) => {
            const isVisible = !hiddenItemNames.includes(menu.name || '')
            return isVisible && (
            <MenuItem
              menu={menu}
              key={menu.id}
              goDownInMenu={goDownInMenu}
            />)
          })}
        </div>

        <div ref={nextMenuRef} className='slidable next'>
          {nextMenu.map((menu: MenuType) => {
            const isVisible = !hiddenItemNames.includes(menu.name || '')
            return isVisible && (
            <MenuItem
              menu={menu}
              key={menu.id}
              goDownInMenu={goDownInMenu}
            />)
          }
          )}
        </div>

        <div ref={fakeMenuRef} className='measurable-div'>
          <CloseMenuItem />
          {nextMenu.map((menu: MenuType) => {
            const isVisible = !hiddenItemNames.includes(menu.name || '')
            return isVisible && (
            <MenuItem
              menu={menu}
              key={menu.id}
            />)
          }
          )}
        </div>
      </MenuStyled>
  )
}

// #region CSS

type PropsForSC = {
  isMenuOutsideWindow: boolean
}

export const MenuStyled = styled.div<PropsForSC>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0px;
  /* if right corner goes over the screen fix the left instead of right */
  left: ${props => props.isMenuOutsideWindow ? '0' : 'not set'};
  width: ${theme.menu.width}px;
  padding-top: ${theme.menu.paddingTop}px;
  padding-bottom: ${theme.menu.paddingBottom}px;
  background: rgb(52 52 52 / 98%);
  backdrop-filter: blur(4px);
  border: 1px solid #474a4d;
  border-radius: 4px;
  overflow: hidden;
  z-index: 666;

  @media screen and (max-width: 480px) {
    left: 0px;
    right: 0px;
    width: auto;
  }

  .slidable {
    position: absolute;
    right: 0px;
    left: 0px;
    height: auto;
  }

  .next {
    transform: translateX(100%);
  }

  .measurable-div {
    transform: translateX(9999px);
  }
`

// #endregion
