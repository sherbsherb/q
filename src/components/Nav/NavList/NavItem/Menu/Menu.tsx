// idea is taken from https://www.youtube.com/watch?v=IF6k0uZuypA
import React, { useContext, useEffect, useRef, useState, useCallback, createContext } from 'react'
import styled from 'styled-components'
import { BackItem } from './BackItem'
import { CloseItem } from './CloseItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem as navItemContext } from '../NavItem'
import { elementHeight } from '@functions/elementHeight'
import { gsap } from 'gsap'
import { useIsInitRender } from '@hooks/useIsInitRender'
import { slideHorizontally } from '@functions/slideHorizontally'
import { theme } from '@src/theme'

export const ContextMenu = createContext({})

export function Menu() {
  const { nextMenuState, menuO, showMenuState, setShowMenuState, setOpenedMenuState, liRef } = useContext(navItemContext)
  const isNestedMenu = nextMenuState?.prevMenu?.length > 0
  const [currentMenuState, setPrevMenuState] = useState({ ...menuO.menu, navItemId: menuO.id, prevMenu: [] })
  const menuContainerRef = useRef()
  const currentMenuRef = useRef(null)
  const nextMenuRef = useRef(null)
  const fakeMenuRef = useRef()
  const isInitRender = useIsInitRender()

  // #region Close menu
  function closeMenu() {
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }
  const closeMenuMemo = useCallback(closeMenu, [showMenuState, setShowMenuState, setOpenedMenuState, setPrevMenuState])
  // #endregion

  // #region goLevelDown
  function goLevelDown(o) {
    const isSubMenu = o.menu
    if (!isSubMenu) return
    const subMenu = o.menu
    setPrevMenuState(nextMenuState)
    setOpenedMenuState({ ...subMenu, navItemId: nextMenuState.navItemId, prevMenu: [...nextMenuState.prevMenu, nextMenuState] })
    slideHorizontally({ el: nextMenuRef.current!, where: 'from right' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to left' })
  }
  // #endregion

  // #region goLevelUp
  function goLevelUp() {
    setPrevMenuState(nextMenuState)
    setOpenedMenuState(nextMenuState.prevMenu.pop())
    slideHorizontally({ el: nextMenuRef.current!, where: 'from left' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to right' })
  }
  const goLevelUpMemo = useCallback(goLevelUp, [setPrevMenuState, nextMenuState, setOpenedMenuState])
  // #endregion

  // #region animateMenuHeight
  /**
  * @summary
  * on menu navigation animate its height
  * @descriptions
  * - on menu change gradually adjust its height
  * - on initial render set height without animation (duration: 0)
  * - height is calculated by measuring fake menu with height: 'auto'
  */
  function animateMenuHeight() {
    gsap.to(menuContainerRef.current!, {
      duration: isInitRender ? 0 : 0.35,
      height: elementHeight(fakeMenuRef.current!) + 85
    })
  }
  useEffect(animateMenuHeight, [nextMenuState])
  // #endregion

  // #region keyShortcutsForMenu
  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandlerMemo)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemo) }
  }
  function navKeyboardHandler(e) {
    if (!nextMenuState) return
    const isNestedMenu = nextMenuState?.prevMenu?.length > 0
    isNestedMenu && e.key === 'Backspace' && goLevelUpMemo()
    !isNestedMenu && e.key === 'Backspace' && closeMenuMemo()
    e.key === 'Escape' && closeMenuMemo()
  }
  const navKeyboardHandlerMemo = useCallback(navKeyboardHandler, [nextMenuState, goLevelUpMemo, closeMenuMemo])

  useEffect(keyShortcutsForMenu, [nextMenuState, navKeyboardHandlerMemo, closeMenuMemo])
  // #endregion

  // #region close menu on click outside
  function closeMenuOnClickOutside() {
    function isClickedElOutsideThisEl(clickedEl, thisEl) {
      return !thisEl.contains(clickedEl)
    }

    function closeModalOnClickOutside(e) {
      const navItem = menuContainerRef.current.parentElement
      const clickedEl = e.target
      if (!navItem) return
      if (isClickedElOutsideThisEl(clickedEl, navItem)) closeMenuMemo()
    }

    document.addEventListener('mousedown', closeModalOnClickOutside)
    return () => { document.removeEventListener('mousedown', closeModalOnClickOutside) }
  }
  useEffect(closeMenuOnClickOutside, [closeMenuMemo])
  // #endregion

  // #region isMenuOutsideWindow
  /**
  * @summary distance from the left side of the window to right side of nav menu item
  * @descriptions
  * - menu is located inside <li>
  * - menu opens below <li> and has same absolute right position
  * - if window is narrow menu can go over the screen's left side
  * - if so, we can fix right side of the menu
  */
  const distanceToLiRightSide = liRef.current.getBoundingClientRect().right
  const menuWidth = theme.menu.width
  const isMenuOutsideWindow = menuWidth > distanceToLiRightSide
  // #endregion

  const menuContext = { currentMenuState, setPrevMenuState, closeMenu, goLevelDown, goLevelUp, navKeyboardHandler }
  return (
    <ContextMenu.Provider value={menuContext}>
      <Div ref={menuContainerRef} isMenuOutsideWindow={isMenuOutsideWindow}>
        {isNestedMenu ? <BackItem /> : <CloseItem />}

        <div ref={currentMenuRef} className='slidable'>
          {currentMenuState?.menuItems.map(
            menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />
          )}
        </div>

        <div ref={nextMenuRef} className='slidable'>
          {nextMenuState.menuItems.map(
            menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />
          )}
        </div>

        <div ref={fakeMenuRef} className='measurable-div'>
          {nextMenuState.menuItems.map(
            menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />
          )}
        </div>
      </Div>
    </ContextMenu.Provider>
  )
}

export const Div = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0px;
  /* if right corner goes over the screen let's fix left side */
  left: ${props => props.isRightCornerBeforeScreen ? '0' : 'not set'};
  width: ${theme.menu.width}px;
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

  .measurable-div {
    position: fixed;
    right: 1000px;
  }
`
