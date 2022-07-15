import styled from 'styled-components'
import { theme } from '@src/theme'
import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'
import { MenuItem } from './MenuItem'
import { MenuType } from '@components/Nav/navStructure'
import { getClickedMenu } from './functions/getClickedMenu'
import { useMenuNavigation } from './functions/useMenuNavigation'
import { useKeyShortcuts } from './functions/useKeyShortcuts'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindowState } from './functions/useIsMenuOutsideWindowState'

// todo: add 'state' postfix after all reactive variables

export function Menu() {
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenu = useSelector(state => getClickedMenu(state.nav.idsToNextMenu))
  const currentMenu = useSelector(state => getClickedMenu(state.nav.idsToCurrentMenu))
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenu.length > 2)
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)
  const { goDownInMenu, goUpInMenu } = useMenuNavigation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, nextMenu })
  useKeyShortcuts({ goUpInMenu })
  useCloseMenuOnClickOutside({ menuContainerRef })
  const isMenuOutsideWindowState = useIsMenuOutsideWindowState()

  return (
      <MenuStyled
        className='drop-down-nav-menu'
        ref={menuContainerRef}
        isMenuOutsideWindowState={isMenuOutsideWindowState}
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

type PropsForSC = {
  isMenuOutsideWindowState: boolean
}

export const MenuStyled = styled.div<PropsForSC>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0px;
  /* if right corner goes over the screen fix the left instead of right */
  left: ${props => props.isMenuOutsideWindowState ? '0' : 'not set'};
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
