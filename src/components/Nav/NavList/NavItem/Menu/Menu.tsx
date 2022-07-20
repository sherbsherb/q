import styled from 'styled-components'
import { theme } from '@src/theme'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { useRef } from 'react'
import { useMenuNavigation } from './functions/useMenuNavigation'
import { useKeyShortcutsForMenuNavigation } from './functions/useKeyShortcutsForMenuNavigation'
import { useCloseMenuOnClickOutside } from './functions/useCloseMenuOnClickOutside'
import { useIsMenuOutsideWindowState } from './functions/useIsMenuOutsideWindowState'
import { SlidableMenuItemsContainer } from './SlidableMenuItemsContainer'
import { TopMenuItemsContainer } from './TopMenuItemsContainer'
import { setMenuItemHoverIndex } from '@slices/navSlice'
import { globalObject } from '@src/globalObject'

// todo: add shortcuts component and functionality, for whole page, not Nav component only

export function Menu() {
  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const currentMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const nextMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const fakeMenuRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const idsToNextMenuItemsState = useSelector(state => state.nav.idsToNextMenuItems)
  const idsToCurrentMenuItemsState = useSelector(state => state.nav.idsToCurrentMenuItems)
  const { goDownInMenu, goUpInMenu } = useMenuNavigation({ currentMenuRef, nextMenuRef, menuContainerRef, fakeMenuRef, idsToNextMenuItems: idsToNextMenuItemsState })
  globalObject.goDownInMenu = goDownInMenu
  globalObject.goUpInMenu = goUpInMenu
  useKeyShortcutsForMenuNavigation()
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
        idsToMenu={idsToCurrentMenuItemsState}
        className='slidable current'
      />
      <SlidableMenuItemsContainer
        reference={nextMenuRef}
        idsToMenu={idsToNextMenuItemsState}
        className='slidable
        next'
      />
      <SlidableMenuItemsContainer
        reference={fakeMenuRef}
        idsToMenu={idsToNextMenuItemsState}
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
