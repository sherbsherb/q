import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import { MenuType } from '@components/Nav/navStructure'
import { closeMenu, setMenuItemHoverIndex } from '@slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { globalObject } from '@src/globalObject'
import { store } from '@redux/store'
import { getMenuItemByIdsChain } from '../functions/getMenuItemByIdsChain'
import { Shortcut } from './Shortcut'

type MenuItemType = {
  menuItem: MenuType
  hoveredMenuItemIndex: number
}

export function MenuItem({ menuItem, hoveredMenuItemIndex }: MenuItemType) {
  const isHoveredState = useSelector(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isNextMenuAvailable = !!menuItem.menuItems
  const isIcon = !!menuItem.icon
  const menuId = menuItem.id
  const link = menuItem.link
  const shortcut = menuItem?.shortcut

  type EventType = KeyboardEvent | MouseEvent | React.MouseEvent | React.KeyboardEvent

  const clickOnMenuItem = (e: EventType) => {
    const chainToClickedItem = [...store.getState().nav.idsToCurrentMenuItems, menuId]
    const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
    const isNestedMenuAvailable = !!nextMenu.length
    const menuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
    const menuItem = menuItems!.find(menuItem => menuItem.id === menuId)
    const link = menuItem?.link
    const func = menuItem?.func

    if (link) {
      // just follow the link natively
      store.dispatch(closeMenu())
      return
    }

    e.preventDefault()

    if (func) {
      func()
      store.dispatch(closeMenu())
      return
    }

    if (isNestedMenuAvailable) {
      globalObject.goDownInMenu && globalObject.goDownInMenu(menuId)
    }
  }

  const hoverOverMenuItem = () => {
    store.dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))
  }

  return (
    <MenuItemStyled
      to={link || '/'}
      onClick={clickOnMenuItem}
      onMouseEnter={hoverOverMenuItem}
      $isHovered={isHoveredState}
    >
      {isIcon && <Icon icon={menuItem.icon} />}
      <TextInMenu reserveSpaceForIcon={isNextMenuAvailable} name={menuItem.name} />
      {isNextMenuAvailable && <MenuIconRight><ForwardIcon /></MenuIconRight>}
      {shortcut && <Shortcut shortcut={shortcut} $isHovered={isHoveredState} />}
    </MenuItemStyled>
  )
}

const MenuIconRight = styled(RoundSpanForIconStyled)`
  background-color: transparent;
  margin-right: -5px;
  position: absolute;
  right: 10px;
`
