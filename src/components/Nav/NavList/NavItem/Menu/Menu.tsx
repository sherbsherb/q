import { useContext, useEffect, useRef, useCallback, createContext } from 'react'
import { useIsInitRender } from '@hooks/useIsInitRender'
import styled from 'styled-components'
import { theme } from '@src/theme'
import { gsap } from 'gsap'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem, ContextNavItemType, MenuStateType } from '../NavItem'
import { elementHeight } from '@functions/elementHeight'
import { slideHorizontally } from '@functions/slideHorizontally'
import type { MenuType } from '@components/Nav/navStructure'
import { isClickInsideThisElement } from '@functions/isClickInsideThisElement'

// #region MENU CONTEXT
export type MenuContextType = {
  menuState: MenuStateType
  setMenuState: React.Dispatch<React.SetStateAction<MenuStateType>>
  hideMenu: () => void
  goInside: (menuO: MenuType) => void
  goOutside: () => void
  navKeyboardHandler: (e: KeyboardEvent) => void
}
export const ContextMenu = createContext<MenuContextType | null>(null)
// #endregion

export function Menu() {
  const { menuState, setMenuState, navItemRef, hideMenu } = useContext(ContextNavItem) as ContextNavItemType
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const isInitRender = useIsInitRender()
  const isNestedMenu = menuState.prevMenus.length > 0

  // #region GO INTO NESTED MENU
  function goInside(menuO: MenuType) {
    const subMenu = menuO.menu
    if (!subMenu) return
    setMenuState({ ...menuState, menu: [...subMenu], prevMenus: [...menuState.prevMenus, menuState] })
    slideHorizontally({ el: nextMenuRef.current!, where: 'from right' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to left' })
  }
  // #endregion

  // #region GO TO PREVIOUS MENU
  function goOutside() {
    setMenuState({ ...menuState, menu: menuState.prevMenus?.at(-1)?.menu || [], prevMenus: menuState.prevMenus.slice(0, -1) })
    slideHorizontally({ el: nextMenuRef.current!, where: 'from left' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to right' })
  }
  const goOutsideMemo = useCallback(goOutside, [menuState, setMenuState])
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
  useEffect(animateMenuHeight, [menuState])
  // #endregion

  // #region KEYBOARD SHORTCUTS
  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandlerMemo)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemo) }
  }
  function navKeyboardHandler(e: KeyboardEvent) {
    isNestedMenu && e.key === 'Backspace' && goOutsideMemo()
    !isNestedMenu && e.key === 'Backspace' && hideMenu()
    e.key === 'Escape' && hideMenu()
  }
  const navKeyboardHandlerMemo = useCallback(navKeyboardHandler, [menuState, goOutsideMemo, hideMenu])

  useEffect(keyShortcutsForMenu, [menuState, navKeyboardHandlerMemo, hideMenu])
  // #endregion

  // #region CLOSE MENU ON CLICK OUTSIDE
  function hideMenuOnClickOutside() {
    /**
     * @descriptions
     * - menu is positioned inside navItem li element
     * - if we clicked on navItem (menu or li) do not close
     * - if clicked outside - close
     */
    function mouseDownHandler(e: MouseEvent) {
      const menu = menuContainerRef.current
      if (!menu) return
      const navItem = menuContainerRef.current.parentElement
      if (!navItem) return
      const clickedEl = e.target as HTMLElement
      if (isClickInsideThisElement(clickedEl, navItem) && !isClickInsideThisElement(clickedEl, menu)) {
        // will handle it in openMenu function
        return
      }
      if (!isClickInsideThisElement(clickedEl, menu)) {
        hideMenu()
      }
    }

    document.addEventListener('mousedown', mouseDownHandler)
    return () => { document.removeEventListener('mousedown', mouseDownHandler) }
  }
  useEffect(hideMenuOnClickOutside, [])
  // #endregion

  // #region CHECK IF MENU GOES OUTSIDE WINDOW
  /**
  * @summary distance from the left side of the window to right side of nav menu item
  * @descriptions
  * - menu is absolute positioned below <li> and has same right position
  * - if window is narrow menu can go over the screen's left side
  * - if so, we can fix right side of the menu
  */
  const distanceToLiRightSide = navItemRef.current.getBoundingClientRect().right
  const menuWidth = theme.menu.width
  const isMenuOutsideWindow = menuWidth > distanceToLiRightSide
  // #endregion

  const menuContext = { menuState, setMenuState, hideMenu, goInside, goOutside, navKeyboardHandler }
  return (
    <ContextMenu.Provider value={menuContext}>
      <MenuStyled className='drop-down-nav-menu' ref={menuContainerRef} isMenuOutsideWindow={isMenuOutsideWindow}>
        <div className='non-slidable'>
          {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
        </div>

        <div ref={currentMenuRef} className='slidable'>
          {menuState.menu.map(
            (menuO: MenuType) => !menuO.hidden && <MenuItem menuO={menuO} key={menuO.id} />
          )}
        </div>

        <div ref={nextMenuRef} className='slidable'>
          {menuState.menu.map(
            (menuO: MenuType) => !menuO.hidden && <MenuItem menuO={menuO} key={menuO.id} />
          )}
        </div>

        <div ref={fakeMenuRef} className='measurable-div'>
          <CloseMenuItem />
          {menuState.menu.map(
            (menuO: MenuType) => !menuO.hidden && <MenuItem menuO={menuO} key={menuO.id} />
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
