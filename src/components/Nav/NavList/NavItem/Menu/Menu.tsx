import styled from 'styled-components'
import { gsap } from 'gsap'
import { theme } from '@src/theme'
import { store } from '@src/redux/store'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { closeMenu, goDownInCurrentMenu, goDownInNextMenu, goUpInCurrentMenu, goUpInNextMenu } from '@src/redux/slices/navSlice'
import { useEffect, useRef } from 'react'
import { useIsInitRender } from '@hooks/useIsInitRender'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { elementHeight } from '@functions/elementHeight'
import { MenuType } from '@components/Nav/navStructure'
import { isClickInsideThisElement } from '@functions/isClickInsideThisElement'
import { getClickedMenu } from './getClickedMenu'

export function Menu() {
  const dispatch = useDispatchTyped()
  const isInitRender = useIsInitRender()
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenu = useSelector(state => getClickedMenu(state.nav.idsToNextMenu))
  const currentMenu = useSelector(state => getClickedMenu(state.nav.idsToCurrentMenu))
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenu.length > 2)
  const navItemRightPos = useSelector(state => state.nav.navItemRightPos)
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)

  // #region ANIMATION

  const duration = 0.5

  /**
   * @descriptions
   * - we have 2 menus for animation of nested menus change
   * - when we click on menu we update content in 'nextMenuRef' with 'nextMenu' state update
   * - then we make animation moving 'nextMenuRef' into the view
   * - at the same time 'currentMenuRef' is moved away from the view
   * - when animation is finished we change moved away 'currentMenuRef' content with 'currentMenu' state update
   */

  function goDownInMenuAnimate(id: string) {
    type Function = () => void
    const cb: Function = () => dispatch(goDownInCurrentMenu(id))
    dispatch(goDownInNextMenu(id))
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration, xPercent: -100 })
    gsap.fromTo(nextMenuRef.current, { xPercent: 0 }, { duration, xPercent: -100, onComplete: cb })
  }

  function goUpInMenuAnimate() {
    dispatch(goUpInNextMenu())
    type Function = () => void
    const cb: Function = () => dispatch(goUpInCurrentMenu())
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration, xPercent: 100 })
    gsap.fromTo(nextMenuRef.current, { xPercent: -200 }, { duration, xPercent: -100, onComplete: cb })
  }

  /**
  * height animation on menu change
  * @descriptions
  * - on menu change we gradually adjust its height
  * - height is calculated by measuring 'fakeMenuRef' menu with css height: 'auto'
  * - we keep 'fakeMenuRef' in synch with 'nextMenuRef'
  * - 'fakeMenuRef' is absolutely positioned far way out of the view
  * - on initial render we do not animate height (duration: 0)
  * - if we navigate inside menu then we animate height (duration: 0.5)
  * - height animation is triggered every time 'nextMenuRef' is updated
  */

  function animateMenuHeight() {
    gsap.to(menuContainerRef.current, {
      duration: isInitRender ? 0 : duration,
      height: elementHeight(fakeMenuRef.current) + theme.menu.paddingTop + theme.menu.paddingBottom
    })
  }

  useEffect(animateMenuHeight, [nextMenu])

  // #endregion

  // #region KEYBOARD

  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  function navKeyboardHandler(e: KeyboardEvent) {
    const isNestedMenu = store.getState().nav.idsToCurrentMenu.length > 2

    if (isNestedMenu && e.key === 'Backspace') {
      goUpInMenuAnimate()
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
      <MenuStyled className='drop-down-nav-menu' ref={menuContainerRef} isMenuOutsideWindow={isMenuOutsideWindow}>

        <div className='non-slidable'>
          {isNestedMenu ? <BackMenuItem goUpInMenuAnimate={goUpInMenuAnimate}/> : <CloseMenuItem />}
        </div>

        <div ref={currentMenuRef} className='slidable current'>
          {currentMenu.map((menu: MenuType) => {
            const isVisible = !hiddenItemNames.includes(menu.name || '')
            return isVisible && (
            <MenuItem
              menu={menu}
              key={menu.id}
              goDownInMenuAnimate={goDownInMenuAnimate}
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
              goDownInMenuAnimate={goDownInMenuAnimate}
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
    transform: translateX(100%)
  }

  .measurable-div {
    position: fixed;
    right: 1000px;
  }
`

// #endregion
