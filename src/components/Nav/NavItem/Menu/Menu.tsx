import { useContext, useEffect, useRef, useState, useCallback, createContext } from 'react'
import { useIsInitRender } from '@hooks/useIsInitRender'
import styled from 'styled-components'
import { theme } from '@src/theme'
import { gsap } from 'gsap'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem } from '../NavItem'
import { elementHeight } from '@functions/elementHeight'
import { slideHorizontally } from '@functions/slideHorizontally'
import type { MenuType } from '@components/Nav/navStructure'
import { isClickInsideThisElement } from '@functions/isClickInsideThisElement'

export const ContextMenu = createContext({})

export function Menu() {
  const { openedMenuState, menuO, showMenuState, setShowMenuState, setOpenedMenuState, liRef } = useContext(ContextNavItem)
  const isNestedMenu = openedMenuState?.prevMenu?.length > 0
  const [currentMenuState, setPrevMenuState] = useState({ ...menuO.menu, navItemId: menuO.id, prevMenu: [] })
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const currentMenuRef = useRef<HTMLDivElement>(null)
  const nextMenuRef = useRef<HTMLDivElement>(null)
  const fakeMenuRef = useRef<HTMLDivElement>(null)
  const isInitRender = useIsInitRender()

  // #region CLOSE MENU
  function closeMenu() {
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }
  const closeMenuMemo = useCallback(closeMenu, [showMenuState, setShowMenuState, setOpenedMenuState, setPrevMenuState])
  // #endregion

  // #region GO INTO NESTED MENU
  function goInside(o: MenuType) {
    const isSubMenu = o.menu
    if (!isSubMenu) return
    const subMenu = o.menu
    setPrevMenuState(openedMenuState)
    setOpenedMenuState({ ...subMenu, navItemId: openedMenuState.navItemId, prevMenu: [...openedMenuState.prevMenu, openedMenuState] })
    slideHorizontally({ el: nextMenuRef.current!, where: 'from right' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to left' })
  }
  // #endregion

  // #region GO OUT FROM NESTED MENU
  function goOutside() {
    setPrevMenuState(openedMenuState)
    setOpenedMenuState(openedMenuState.prevMenu.pop())
    slideHorizontally({ el: nextMenuRef.current!, where: 'from left' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to right' })
  }
  const goLevelUpMemo = useCallback(goOutside, [setPrevMenuState, openedMenuState, setOpenedMenuState])
  // #endregion

  // #region ANIMATE MENU HEIGHT
  /**
  * @function
  * height animation on menu change
  * @descriptions
  * - on menu change gradually adjust its height
  * - on initial render set height without animation (duration: 0)
  * - height is calculated by measuring fake menu with height: 'auto'
  */
  function animateMenuHeight() {
    gsap.to(menuContainerRef.current!, {
      duration: isInitRender ? 0 : 0.35,
      height: elementHeight(fakeMenuRef.current!) + theme.menu.paddingTop + theme.menu.paddingBottom
    })
  }
  useEffect(animateMenuHeight, [openedMenuState])
  // #endregion

  // #region KEYBOARD SHORTCUTS
  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandlerMemo)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemo) }
  }
  function navKeyboardHandler(e: KeyboardEvent) {
    if (!openedMenuState) return
    const isNestedMenu = openedMenuState?.prevMenu?.length > 0
    isNestedMenu && e.key === 'Backspace' && goLevelUpMemo()
    !isNestedMenu && e.key === 'Backspace' && closeMenuMemo()
    e.key === 'Escape' && closeMenuMemo()
  }
  const navKeyboardHandlerMemo = useCallback(navKeyboardHandler, [openedMenuState, goLevelUpMemo, closeMenuMemo])

  useEffect(keyShortcutsForMenu, [openedMenuState, navKeyboardHandlerMemo, closeMenuMemo])
  // #endregion

  // #region CLOSE MENU ON CLICK OUTSIDE
  function closeMenuOnClickOutside() {
    /**
     * @descriptions
     * - menu is positioned inside navItem li element
     * - if we clicked on navItem (menu or li) do not close
     * - if clicked outside - close
     */
    function closeModalOnClickOutside(e: MouseEvent) {
      if (!menuContainerRef.current) return
      const navItem = menuContainerRef.current.parentElement
      if (!navItem) return
      const clickedEl = e.target as HTMLElement
      if (!isClickInsideThisElement(clickedEl, navItem)) closeMenuMemo()
    }

    document.addEventListener('mousedown', closeModalOnClickOutside)
    return () => { document.removeEventListener('mousedown', closeModalOnClickOutside) }
  }
  useEffect(closeMenuOnClickOutside, [])
  // #endregion

  // #region CHECK IF MENU GOES OUTSIDE WINDOW
  /**
  * @summary distance from the left side of the window to right side of nav menu item
  * @descriptions
  * - menu is absolute positioned below <li> and has same right position
  * - if window is narrow menu can go over the screen's left side
  * - if so, we can fix right side of the menu
  */
  const distanceToLiRightSide = liRef.current.getBoundingClientRect().right
  const menuWidth = theme.menu.width
  const isMenuOutsideWindow = menuWidth > distanceToLiRightSide
  // #endregion

  const menuContext = { currentMenuState, setPrevMenuState, closeMenu, goLevelDown: goInside, goLevelUp: goOutside, navKeyboardHandler }
  return (
    <ContextMenu.Provider value={menuContext}>
      <MenuStyled ref={menuContainerRef} isMenuOutsideWindow={isMenuOutsideWindow}>
        <div className='non-slidable'>
          {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
        </div>

        <div ref={currentMenuRef} className='slidable'>
          {currentMenuState?.menuItems.map(
            (menuO: MenuType) => <MenuItem menuO={menuO} key={menuO.id} />
          )}
        </div>

        <div ref={nextMenuRef} className='slidable'>
          {openedMenuState.menuItems.map(
            (menuO: MenuType) => <MenuItem menuO={menuO} key={menuO.id} />
          )}
        </div>

        <div ref={fakeMenuRef} className='measurable-div'>
          <CloseMenuItem />
          {openedMenuState.menuItems.map(
            (menuO: MenuType) => <MenuItem menuO={menuO} key={menuO.id} />
          )}
        </div>
      </MenuStyled>
    </ContextMenu.Provider>
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

  .measurable-div {
    position: fixed;
    right: 1000px;
  }
`
// #endregion
