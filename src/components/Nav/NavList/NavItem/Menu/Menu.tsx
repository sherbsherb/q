// idea is taken from https://www.youtube.com/watch?v=IF6k0uZuypA
import React, { useContext, useEffect, useRef, useState, useCallback, createContext } from 'react'
import styled from 'styled-components'
import { BackItem } from './BackItem'
import { CloseItem } from './CloseItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem } from '../NavItem'
import { CSSTransition } from 'react-transition-group'
import { elementHeight } from '@functions/elementHeight'
import { gsap } from 'gsap'

export const ContextMenu = createContext(null)

export function Menu() {
  const context = useContext(ContextNavItem)
  const { openedMenuState, menuO, showMenuState, setShowMenuState, setOpenedMenuState } = context
  const [prevMenuState, setPrevMenuState] = useState({ ...menuO.menu, navItemId: menuO.id, prevMenu: [] })
  const [whereToSlidState, setWhereToSlidState] = useState('nowhere')
  const [menuTransitionState, setMenuTransitionState] = useState(true)

  const swapMenu = () => setMenuTransitionState(!menuTransitionState)
  const swapMenuMemoized = useCallback(swapMenu, [setMenuTransitionState, menuTransitionState])

  function closeMenu(e) {
    // e?.stopPropagation();
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }
  const closeMenuMemoized = useCallback(closeMenu, [showMenuState, setShowMenuState, setOpenedMenuState, setPrevMenuState])

  function changeMenu(o) {
    const isSubMenu = o.menu
    if (!isSubMenu) return
    const subMenu = o.menu
    setPrevMenuState(openedMenuState)
    setOpenedMenuState({
      ...subMenu,
      navItemId: openedMenuState.navItemId,
      prevMenu: [...openedMenuState.prevMenu, openedMenuState]
    })
  }
  const changeMenuMemoized = useCallback(goBack, [setWhereToSlidState, setPrevMenuState, openedMenuState, setOpenedMenuState, swapMenuMemoized])

  function goBack(e) {
    // e?.stopPropagation();
    setWhereToSlidState('forward')
    setPrevMenuState(openedMenuState)
    setOpenedMenuState(openedMenuState.prevMenu.pop())
    swapMenuMemoized()
  }

  function navKeyboardHandler(e) {
    if (!openedMenuState) return
    const isNestedMenu = openedMenuState?.prevMenu?.length > 0
    isNestedMenu && e.key === 'Backspace' && changeMenuMemoized()
    !isNestedMenu && e.key === 'Backspace' && closeMenuMemoized()
    e.key === 'Escape' && closeMenuMemoized()
  }
  const navKeyboardHandlerMemoized = useCallback(navKeyboardHandler, [openedMenuState, changeMenuMemoized, closeMenuMemoized])

  const fakeMenuRef = useRef()
  const menuRef = useRef()

  const [menuHeightState, setMenuHeightState] = useState() // can be 0 if we want slide initial menu

  useEffect(() => {
    setMenuHeightState(elementHeight(fakeMenuRef.current) + 85)
    return () => { setMenuHeightState(0) }
  }, [openedMenuState, navKeyboardHandlerMemoized, closeMenuMemoized, setMenuHeightState])

  useEffect(() => {
    window.addEventListener('keydown', navKeyboardHandlerMemoized)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemoized) }
  }, [openedMenuState, navKeyboardHandlerMemoized, closeMenuMemoized, setMenuHeightState])

  useEffect(() => {
    const navItem = menuRef.current.parentElement

    function isClickedElOutsideThisEl(clickedEl, thisEl) {
      return !thisEl.contains(clickedEl)
    }

    function closeModalOnClickOutside(e) {
      const clickedEl = e.target
      if (!navItem) return
      if (isClickedElOutsideThisEl(clickedEl, navItem)) closeMenuMemoized()
    }

    document.addEventListener('mousedown', closeModalOnClickOutside)
    return () => {
      document.removeEventListener('mousedown', closeModalOnClickOutside)
    }
  }, [closeMenuMemoized])

  const isNestedMenu = openedMenuState?.prevMenu?.length > 0
  const menuItemsDivStyle = { position: 'absolute', right: '0px', left: '0px', height: 'auto' }

  const contextValue = { prevMenuState, setPrevMenuState, whereToSlidState, setWhereToSlidState, menuTransitionState, setMenuTransitionState, swapMenu, closeMenu, changeMenu, goBack, navKeyboardHandler }

  return (
    <ContextMenu.Provider value={contextValue}>
      <Div style={{ height: menuHeightState }} ref={menuRef}>
        {isNestedMenu ? <BackItem /> : <CloseItem />}

        {/*
          we have 2 divs with transition
          one div keeps previous menu items, another keeps current menu items
          one div enters, another exists with transition
          div is unmounted after transition (not necessary actually)
          transitions is triggered via 'in' prop
        */}

        {/* main or previous menu */}
        <CSSTransition
          in={menuTransitionState}
          classNames={whereToSlidState}
          timeout={350}
          unmountOnExit
        >
          <div className={whereToSlidState} style={menuItemsDivStyle}>
            {/* if transition enters, current menu renders
            if transition exists, pervious menu renders */}
            {menuTransitionState && openedMenuState.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
            {!menuTransitionState && prevMenuState?.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
          </div>
        </CSSTransition>

        {/* main or previous menu */}
        <CSSTransition
          in={!menuTransitionState}
          classNames={whereToSlidState}
          timeout={350}
          unmountOnExit
        >
          <div className={whereToSlidState} style={menuItemsDivStyle}>
            {!menuTransitionState && openedMenuState.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
            {menuTransitionState && prevMenuState?.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
          </div>
        </CSSTransition>

        {/* fake div to measure menu height for animation */}
        <div style={{ position: 'fixed', right: '1000px' }} ref={fakeMenuRef}>
          {openedMenuState.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
        </div>
      </Div>
    </ContextMenu.Provider>
  )
}

export const Div = styled.div`
  position: absolute;
  top: 110%;
  right: 0px;
  width: 300px;
  background: rgb(52 52 52 / 98%);
  backdrop-filter: blur(4px);

  border: 1px solid #474a4d;
  border-radius: 8px;
  overflow: hidden;
  z-index: 666;

  transition-property: height;
  transition-duration: .35s;
  transition-timing-function: ease-out;

  @media screen and (max-width: 480px) {
    left: 0px;
    right: 0px;
    width: auto;
  }

  .forward-appear {
    transform: translateX(-110%);
  }
  .forward-appear-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .forward-appear-done {
    transform: translateX(0%);
  }
  .forward-enter {
    transform: translateX(-110%);
  }
  .forward-enter-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .forward-enter-done {
    transform: translateX(0%);
  }
  .forward-exit {
    transform: translateX(0%);
  }
  .forward-exit-active {
    transform: translateX(110%);
    transition: all 350ms linear;
  }
  .forward-exit-done {
    transform: translateX(110%);
  }

  .backward-appear {
    transform: translateX(110%);
  }
  .backward-appear-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .backward-appear-done {
    transform: translateX(0%);
  }
  .backward-enter {
    transform: translateX(110%);
  }
  .backward-enter-active {
    transform: translateX(0%);
    transition: all 350ms linear;
  }
  .backward-enter-done {
    transform: translateX(0%);
  }
  .backward-exit {
    transform: translateX(0%);
  }
  .backward-exit-active {
    transform: translateX(-110%);
    transition: all 350ms linear;
  }
  .backward-exit-done {
    transform: translateX(-110%);
  }
`
