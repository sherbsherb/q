import { useEffect, useRef } from 'react'
import { useIsInitRender } from '@hooks/useIsInitRender'
import styled from 'styled-components'
import { theme } from '@src/theme'
import { gsap } from 'gsap'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { elementHeight } from '@functions/elementHeight'
import { slideHorizontally } from '@functions/slideHorizontally'
import { MenuType, navStructure } from '@components/Nav/navStructure'
import { isClickInsideThisElement } from '@functions/isClickInsideThisElement'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { closeBurger, closeMenu, goUpInMenu } from '@src/redux/slices/navSlice'
import { store } from '@src/redux/store'

export function Menu() {
  const dispatch = useDispatchTyped()
  const isInitRender = useIsInitRender()
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const menu = useSelector(state => getMenu(state.nav.menuIdsChain))
  const isNestedMenu = useSelector(state => state.nav.menuIdsChain.length > 2)

  function getMenu(menuIdsChain: string[]) {
    console.log(menuIdsChain)
    let clicked
    let menu = navStructure
    let prev
    menuIdsChain.forEach((id: string) => {
      prev = menu
      clicked = menu.find((menu) => menu.id === id)?.menu
      menu = clicked
    })
    return { clicked, prev }
  }

  // slideHorizontally({ el: nextMenuRef.current!, where: 'from right' })
  // slideHorizontally({ el: currentMenuRef.current!, where: 'to left' })
  // slideHorizontally({ el: nextMenuRef.current!, where: 'from left' })
  // slideHorizontally({ el: currentMenuRef.current!, where: 'to right' })

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
  useEffect(animateMenuHeight, [menu])
  // #endregion

  // #region KEYBOARD SHORTCUTS
  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  function navKeyboardHandler(e: KeyboardEvent) {
    const isNestedMenu = store.getState().nav.menuIdsChain.length > 2

    if (isNestedMenu && e.key === 'Backspace') {
      dispatch(goUpInMenu())
      return
    }
    if ((!isNestedMenu && e.key === 'Backspace') || e.key === 'Escape') {
      dispatch(closeMenu())
      dispatch(closeBurger())
    }
  }

  useEffect(keyShortcutsForMenu, [])
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
      const isClickOnOpenedNavItem = isClickInsideThisElement(clickedEl, navItem) && !isClickInsideThisElement(clickedEl, menu)
      if (isClickOnOpenedNavItem) return // close it in openMenu function, otherwise it closes and opens immediately
      if (!isClickInsideThisElement(clickedEl, menu)) {
        dispatch(closeMenu())
        dispatch(closeBurger())
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

  const navItemRightPos = useSelector(state => state.nav.navItemRightPos)
  const menuWidth = theme.menu.width
  const isMenuOutsideWindow = menuWidth > navItemRightPos
  // #endregion

  return (
      <MenuStyled className='drop-down-nav-menu' ref={menuContainerRef} isMenuOutsideWindow={isMenuOutsideWindow}>

        <div className='non-slidable'>
          {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
        </div>

        <div ref={currentMenuRef} className='slidable'>
          {menu.clicked.map(
            (menu: MenuType) => <MenuItem menu={menu} id={menu.id} key={menu.id} />
          )}
        </div>

        {/* <div ref={nextMenuRef} className='slidable'>
          {menu.prev.map(
            (menu: MenuType) => <MenuItem menu={menu} id={menu.id} key={menu.id} />
          )}
        </div> */}

        <div ref={fakeMenuRef} className='measurable-div'>
          <CloseMenuItem />
          {menu.clicked.map(
            (menu: MenuType) => !menu.hidden && <MenuItem menu={menu} id={menu.id} key={menu.id} />
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

  .measurable-div {
    position: fixed;
    right: 1000px;
  }
`
// #endregion
