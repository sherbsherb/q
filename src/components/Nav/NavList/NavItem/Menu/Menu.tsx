// idea is taken from https://www.youtube.com/watch?v=IF6k0uZuypA
import React, { useContext, useEffect, useRef, useState, useCallback, createContext } from 'react'
import styled from 'styled-components'
import { BackItem } from './BackItem'
import { CloseItem } from './CloseItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem } from '../NavItem'
import { elementHeight } from '@functions/elementHeight'
import { gsap } from 'gsap'

export const ContextMenu = createContext(null)

export function Menu() {
  const context = useContext(ContextNavItem)
  const { nextMenuState, menuO, showMenuState, setShowMenuState, setOpenedMenuState } = context
  const [currentMenuState, setPrevMenuState] = useState({ ...menuO.menu, navItemId: menuO.id, prevMenu: [] })

  const nextMenuRef = useRef(null)
  const currentMenuRef = useRef(null)

  function closeMenu(e) {
    // e?.stopPropagation();
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }
  const closeMenuMemoized = useCallback(closeMenu, [showMenuState, setShowMenuState, setOpenedMenuState, setPrevMenuState])

  const animationDuration = 0.35
  const animationSlideOffset = 100

  function changeMenu(o) {
    const isSubMenu = o.menu
    if (!isSubMenu) return
    const subMenu = o.menu
    setPrevMenuState(nextMenuState)
    setOpenedMenuState({
      ...subMenu,
      navItemId: nextMenuState.navItemId,
      prevMenu: [...nextMenuState.prevMenu, nextMenuState]
    })
    gsap.to(menuRef.current, { duration: animationDuration, height: elementHeight(fakeMenuRef.current) + 85 })
    gsap.fromTo(nextMenuRef.current, { xPercent: animationSlideOffset }, { duration: animationDuration, xPercent: 0 })
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration: animationDuration, xPercent: -animationSlideOffset })
  }
  const changeMenuMemoized = useCallback(goBack, [setPrevMenuState, nextMenuState, setOpenedMenuState])

  function goBack(e) {
    setPrevMenuState(nextMenuState)
    setOpenedMenuState(nextMenuState.prevMenu.pop())

    gsap.to(menuRef.current, { duration: animationDuration, height: elementHeight(fakeMenuRef.current) + 85 })
    gsap.fromTo(nextMenuRef.current, { xPercent: -animationSlideOffset }, { duration: animationDuration, xPercent: 0 })
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration: animationDuration, xPercent: animationSlideOffset })
  }

  function navKeyboardHandler(e) {
    if (!nextMenuState) return
    const isNestedMenu = nextMenuState?.prevMenu?.length > 0
    isNestedMenu && e.key === 'Backspace' && changeMenuMemoized()
    !isNestedMenu && e.key === 'Backspace' && closeMenuMemoized()
    e.key === 'Escape' && closeMenuMemoized()
  }
  const navKeyboardHandlerMemoized = useCallback(navKeyboardHandler, [nextMenuState, changeMenuMemoized, closeMenuMemoized])

  const fakeMenuRef = useRef()
  const menuRef = useRef()

  const [menuHeightState, setMenuHeightState] = useState() // can be 0 if we want slide initial menu

  useEffect(() => {
    setMenuHeightState(elementHeight(fakeMenuRef.current) + 85)
    return () => { setMenuHeightState(0) }
  }, [nextMenuState, navKeyboardHandlerMemoized, closeMenuMemoized, setMenuHeightState])

  useEffect(() => {
    window.addEventListener('keydown', navKeyboardHandlerMemoized)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemoized) }
  }, [nextMenuState, navKeyboardHandlerMemoized, closeMenuMemoized, setMenuHeightState])

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

  const isNestedMenu = nextMenuState?.prevMenu?.length > 0
  const menuItemsDivStyle = { position: 'absolute', right: '0px', left: '0px', height: 'auto' }

  const contextValue = { currentMenuState, setPrevMenuState, closeMenu, changeMenu, goBack, navKeyboardHandler }

  return (
    <ContextMenu.Provider value={contextValue}>
      <Div style={{ height: '800px' }} ref={menuRef}>
        {isNestedMenu ? <BackItem /> : <CloseItem />}

        <div ref={currentMenuRef} style={{ ...menuItemsDivStyle }}>
          {currentMenuState?.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
        </div>

        <div ref={nextMenuRef} style={{ ...menuItemsDivStyle }}>
          {nextMenuState.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
        </div>

        <div style={{ position: 'fixed', right: '1000px' }} ref={fakeMenuRef}>
          {nextMenuState.menuItems.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)}
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
`
