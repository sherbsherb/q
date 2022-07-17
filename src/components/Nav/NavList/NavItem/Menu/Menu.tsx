import styled from 'styled-components'
import { theme } from '@src/theme'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { useMenuNavigation } from './functions/useMenuNavigation'
import { useKeyShortcuts } from './functions/useKeyShortcuts'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindowState } from './functions/useIsMenuOutsideWindowState'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { setMenuItemHoverIndex } from '@slices/navSlice'
import { g } from '@src/g'

// todo: add 'state' postfix after all reactive variables
// todo: do not pass menu, just find it based on store ids chain
// todo: on key strike on menu highlight first item in menu
// todo: problem with mediaQuery when we do not have an icon for nav

export function Menu() {
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const idsToNextMenuItems = useSelector(state => state.nav.idsToNextMenuItems)
  const idsToCurrentMenuItems = useSelector(state => state.nav.idsToCurrentMenuItems)
  const { goDownInMenu, goUpInMenu } = useMenuNavigation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, idsToNextMenuItems })
  g.goDownInMenu = goDownInMenu
  g.goUpInMenu = goUpInMenu
  useKeyShortcuts()
  useCloseMenuOnClickOutside({ menuContainerRef })
  const isMenuOutsideWindowState = useIsMenuOutsideWindowState()
  const dispatch = useDispatchTyped()

  return (
    <MenuStyled
      ref={menuContainerRef}
      isMenuOutsideWindowState={isMenuOutsideWindowState}
      onMouseLeave={() => dispatch(setMenuItemHoverIndex(0))}
      className='drop-down-nav-menu'
    >
      <TopMenuItemsContainer />
      <SlidableMenuItemsContainer
        reference={currentMenuRef}
        idsToMenu={idsToCurrentMenuItems}
        className='slidable current'
      />
      <SlidableMenuItemsContainer
        reference={nextMenuRef}
        idsToMenu={idsToNextMenuItems}
        className='slidable
        next'
      />
      <SlidableMenuItemsContainer
        reference={fakeMenuRef}
        idsToMenu={idsToNextMenuItems}
        className='measurable-div'
      />
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
