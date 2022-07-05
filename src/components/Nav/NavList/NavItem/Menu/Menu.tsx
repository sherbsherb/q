// idea is taken from https://www.youtube.com/watch?v=IF6k0uZuypA
import React, { useContext, useEffect, useRef, useState, useCallback, createContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { BackItem } from './BackItem'
import { CloseItem } from './CloseItem'
import { MenuItem } from './MenuItem'
import { ContextNavItem } from '../NavItem'
import { elementHeight } from '@functions/elementHeight'
import { gsap } from 'gsap'
import { useIsInitRender } from '@hooks/useIsInitRender'
import { slideHorizontally } from '@functions/slideHorizontally'
import { theme } from '@src/theme'

export const ContextMenu = createContext({})

export function Menu() {
  const context = useContext(ContextNavItem)
  const { nextMenuState, menuO, showMenuState, setShowMenuState, setOpenedMenuState, liRef } = context
  const [currentMenuState, setPrevMenuState] = useState({ ...menuO.menu, navItemId: menuO.id, prevMenu: [] })
  const nextMenuRef = useRef(null)
  const currentMenuRef = useRef(null)
  const isInitRender = useIsInitRender()
  const fakeMenuRef = useRef()
  const menuRef = useRef()

  function closeMenu() {
    if (!showMenuState) return
    setShowMenuState(false)
    setOpenedMenuState(null)
    setPrevMenuState(null)
  }
  const closeMenuMemo = useCallback(closeMenu, [showMenuState, setShowMenuState, setOpenedMenuState, setPrevMenuState])

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
    slideHorizontally({ el: nextMenuRef.current!, where: 'from right' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to left' })
  }
  const changeMenuMemo = useCallback(goBack, [setPrevMenuState, nextMenuState, setOpenedMenuState])

  function goBack() {
    setPrevMenuState(nextMenuState)
    setOpenedMenuState(nextMenuState.prevMenu.pop())
    slideHorizontally({ el: nextMenuRef.current!, where: 'from left' })
    slideHorizontally({ el: currentMenuRef.current!, where: 'to right' })
  }

  useEffect(() => {
    gsap.to(menuRef.current!, {
      duration: isInitRender ? 0 : 0.35,
      height: elementHeight(fakeMenuRef.current!) + 85
    })
  }, [nextMenuState])

  function navKeyboardHandler(e) {
    if (!nextMenuState) return
    const isNestedMenu = nextMenuState?.prevMenu?.length > 0
    isNestedMenu && e.key === 'Backspace' && changeMenuMemo()
    !isNestedMenu && e.key === 'Backspace' && closeMenuMemo()
    e.key === 'Escape' && closeMenuMemo()
  }
  const navKeyboardHandlerMemo = useCallback(navKeyboardHandler, [nextMenuState, changeMenuMemo, closeMenuMemo])

  useEffect(() => {
    window.addEventListener('keydown', navKeyboardHandlerMemo)
    return () => { window.removeEventListener('keydown', navKeyboardHandlerMemo) }
  }, [nextMenuState, navKeyboardHandlerMemo, closeMenuMemo])

  useEffect(() => {
    const navItem = menuRef.current.parentElement

    function isClickedElOutsideThisEl(clickedEl, thisEl) {
      return !thisEl.contains(clickedEl)
    }

    function closeModalOnClickOutside(e) {
      const clickedEl = e.target
      if (!navItem) return
      if (isClickedElOutsideThisEl(clickedEl, navItem)) closeMenuMemo()
    }

    document.addEventListener('mousedown', closeModalOnClickOutside)
    return () => { document.removeEventListener('mousedown', closeModalOnClickOutside) }
  }, [closeMenuMemo])

  const contextValue = { currentMenuState, setPrevMenuState, closeMenu, changeMenu, goBack, navKeyboardHandler }
  const isNestedMenu = nextMenuState?.prevMenu?.length > 0
  const distanceToLiRightSide = liRef.current.getBoundingClientRect().right
  const menuWidth = theme.menu.width
  const isRightCornerBeforeScreen = menuWidth > distanceToLiRightSide

  return (
    <ContextMenu.Provider value={contextValue}>
      <Div ref={menuRef} isRightCornerBeforeScreen={isRightCornerBeforeScreen}>
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
