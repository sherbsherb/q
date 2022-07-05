// idea is taken from https://www.youtube.com/watch?v=IF6k0uZuypA
import React, { useContext, useEffect, useRef, useState, useCallback, createContext } from 'react'
import styled from 'styled-components'
import { BackItem } from './BackItem'
import { CloseItem } from './CloseItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem } from '../NavItem'
import { elementHeight } from '@functions/elementHeight'
import { gsap } from 'gsap'
import { useIsInitRender } from '@src/hooks/useIsInitRender'

export const ContextMenu = createContext(null)

export function Menu() {
  const context = useContext(ContextNavItem)
  const { nextMenuState, menuO, showMenuState, setShowMenuState, setOpenedMenuState } = context
  const [currentMenuState, setPrevMenuState] = useState({ ...menuO.menu, navItemId: menuO.id, prevMenu: [] })

  const nextMenuRef = useRef(null)
  const currentMenuRef = useRef(null)

  const isInitRender = useIsInitRender()

  function closeMenu(e) {
    // e?.stopPropagation();
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }
  const closeMenuMemoized = useCallback(closeMenu, [showMenuState, setShowMenuState, setOpenedMenuState, setPrevMenuState])

  const duration = 0.35 // animation duration
  
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
    gsap.fromTo(nextMenuRef.current, { xPercent: 100 }, { duration, xPercent: 0 })
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration, xPercent: -100 })
  }
  const changeMenuMemoized = useCallback(goBack, [setPrevMenuState, nextMenuState, setOpenedMenuState])

  function goBack(e) {
    setPrevMenuState(nextMenuState)
    setOpenedMenuState(nextMenuState.prevMenu.pop())
    gsap.fromTo(nextMenuRef.current, { xPercent: -100 }, { duration, xPercent: 0 })
    gsap.fromTo(currentMenuRef.current, { xPercent: 0 }, { duration, xPercent: 100 })
  }

  useEffect(() => {
    gsap.to(menuRef.current, {
      duration: isInitRender ? 0 : duration,
      height: elementHeight(fakeMenuRef.current) + 85
    })
  }, [nextMenuState])

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

  useEffect(() => {
    window.addEventListener('keydown', navKeyboardHandlerMemoized)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemoized) }
  }, [nextMenuState, navKeyboardHandlerMemoized, closeMenuMemoized])

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

  const contextValue = { currentMenuState, setPrevMenuState, closeMenu, changeMenu, goBack, navKeyboardHandler }

  return (
    <ContextMenu.Provider value={contextValue}>
      <Div style={{ height: elementHeight(fakeMenuRef.current) + 85 + 'px' }} ref={menuRef}>

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
  top: 110%;
  right: 0px;
  width: 300px;
  background: rgb(52 52 52 / 98%);
  backdrop-filter: blur(4px);

  border: 1px solid #474a4d;
  border-radius: 8px;
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
