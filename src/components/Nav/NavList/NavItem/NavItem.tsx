import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Icon } from './Icon'
import { Menu } from './Menu'

export const ContextNavItem = createContext(null)

export function NavItem({ menuO }) {
  const [showMenuState, setShowMenuState] = useState(false)
  const [nextMenuState, setOpenedMenuState] = useState(null)
  const contextValue = { nextMenuState, setOpenedMenuState, showMenuState, setShowMenuState, showMenu, menuO }

  function showMenu(o) {
    const menu = o.menu
    setShowMenuState(true)
    setOpenedMenuState({ ...menu, navItemId: o.id, prevMenu: [] })
  }

  // every li get its menuO from navStructure via props and we can open it on click event
  return (
    <ContextNavItem.Provider value={contextValue}>
      <LiStyled>
        <a
          href={menuO.link || '/'}
          onClick={e => {
            console.log(666)
            const isLink = !!menuO.link
            if (isLink) return
            // if not a link, open menu
            e.preventDefault()
            // e.nativeEvent.stopImmediatePropagation();
            showMenu(menuO)
          }}
        >
          {menuO.icon && <Icon>{menuO.icon}</Icon>}
          {menuO.text && <span>{menuO.text}</span>}
        </a>

        {/* show only specific menu for navItemId, otherwise all existing menus are shown */}
        {showMenuState && nextMenuState?.navItemId === menuO.id && <Menu />}
      </LiStyled>
    </ContextNavItem.Provider>
  )
}

const LiStyled = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 5px;
  margin-left: 10px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      filter: brightness(1.2);
    }

    span {
      margin-left: 5px;
      margin-right: 5px;
      color: #bcbcbc;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 480px) {
    position: static;
  }
`
