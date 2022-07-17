import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import { MenuType } from '@components/Nav/navStructure'
import { setMenuItemHoverIndex } from '@slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { clickOnMenuItem } from './functions/clickOnMenuItem'

type MenuItemType = {
  menuItem: MenuType
  hoveredMenuItemIndex: number
}

export function MenuItem({ menuItem, hoveredMenuItemIndex }: MenuItemType) {
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isNextMenuAvailable = !!menuItem.menuItems
  const isIcon = !!menuItem.icon
  const menuId = menuItem.id

  return (
    <MenuItemStyled
      href="/"
      onClick={(e: React.MouseEvent) => clickOnMenuItem({ e, menuId }) }
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))}
      isHovered={isHovered}
    >
      {isIcon && <Icon icon={menuItem.icon} />}
      <TextInMenu reserveSpaceForIcon={isNextMenuAvailable} name={menuItem.name} />
      {isNextMenuAvailable && <MenuIconRight><ForwardIcon /></MenuIconRight>}
    </MenuItemStyled>
  )
}

const MenuIconRight = styled(RoundSpanForIconStyled)`
  background-color: transparent;
  margin-right: -5px;
  position: absolute;
  right: 10px;
`
