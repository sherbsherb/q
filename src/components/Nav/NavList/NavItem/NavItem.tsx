import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Icon } from './Icon'
import { Menu } from './Menu'

export const ContextNavItem = createContext(null)

// icons w/o text on the navbar
export function NavItem(props) {
  const { menuO } = props

  const [showMenuState, setShowMenuState] = useState(false)
  const [openedMenuState, setOpenedMenuState] = useState(null)

  function showMenu(o) {
    const menu = o.menu
    setShowMenuState(true)
    setOpenedMenuState({
      ...menu,
      navItemId: o.id,
      prevMenu: []
    })
  }

  const contextValue = {
    openedMenuState,
    setOpenedMenuState,
    showMenuState,
    setShowMenuState,
    showMenu,
    menuO
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
          {menuO.text && <SpanStyled>{menuO.text}</SpanStyled>}
        </a>

        {/* show only specific menu for navItemId, otherwise all existing menus are shown */}
        {showMenuState && openedMenuState?.navItemId === menuO.id && <Menu />}
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

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover {
      filter: brightness(1.2);
    }
  }

  @media screen and (max-width: 480px) {
    position: static;
  }
`

const SpanStyled = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  color: grey;
  white-space: nowrap;
`
