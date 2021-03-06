import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import { MenuType } from '@components/Nav/navStructure'
import { setMenuItemHoverIndex } from '@slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { Shortcut } from './Shortcut'
import { clickOnMenuItem } from './function/clickOnMenuItem'

type MenuItemType = {
  menuItem: MenuType
  hoveredMenuItemIndex: number
}

export function MenuItem({ menuItem, hoveredMenuItemIndex }: MenuItemType) {
  const dispatch = useDispatchTyped()
  const isHoveredState = useSelector(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isNextMenuAvailable = !!menuItem.menuItems
  const isIcon = !!menuItem.icon
  const menuId = menuItem.id
  const link = menuItem.link
  const shortcut = menuItem?.shortcut

  return (
    <MenuItemStyled
      to={link || '/'}
      onClick={(e) => clickOnMenuItem(e, menuId)}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))}
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
