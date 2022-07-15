import styled from 'styled-components'
import { theme } from '@src/theme'
import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { MenuType } from '@components/Nav/navStructure'
import { getClickedMenu } from './functions/getClickedMenu'
import { useMenuNavigation } from './useMenuNavigation'
import { useKeyShortcuts } from './useKeyShortcuts'
import { useCloseMenuOnClickOutside } from './useCloseMenuOnClickOutside'

export function Menu() {
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenu = useSelector(state => getClickedMenu(state.nav.idsToNextMenu))
  const currentMenu = useSelector(state => getClickedMenu(state.nav.idsToCurrentMenu))
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenu.length > 2)
  const navItemRightPos = useSelector(state => state.nav.navItemRightPos)
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)
  const { goDownInMenu, goUpInMenu } = useMenuNavigation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, nextMenu })
  useKeyShortcuts({ goUpInMenu })
  useCloseMenuOnClickOutside({ menuContainerRef })
  /**
  * check if menu width is more than distance to the left side of the window
  * @descriptions
  * - on NavItem click we store its 'right' position
  * - menu is absolute positioned below <li> and has same 'right' position
  * - if window is narrow, then menu can go over the screen's left side
  * - if so, we can fix 'left' side of the menu, instead of 'right'
  */
  const isMenuOutsideWindow = theme.menu.width > navItemRightPos

  return (
      <MenuStyled
        className='drop-down-nav-menu'
        ref={menuContainerRef}
        isMenuOutsideWindow={isMenuOutsideWindow}
      >

        <div className='non-slidable'>
          {isNestedMenu ? <BackMenuItem goUpInMenu={goUpInMenu}/> : <CloseMenuItem />}
        </div>

        <div ref={currentMenuRef} className='slidable current'>
          {currentMenu.map((menu: MenuType) => {
            const isVisible = !hiddenItemNames.includes(menu.name || '')
            return isVisible && (
            <MenuItem
              menu={menu}
              key={menu.id}
              goDownInMenu={goDownInMenu}
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
              goDownInMenu={goDownInMenu}
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
    transform: translateX(100%);
  }

  .measurable-div {
    transform: translateX(9999px);
  }
`

// #endregion
