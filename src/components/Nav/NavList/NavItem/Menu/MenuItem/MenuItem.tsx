import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import { MenuType } from '@src/components/Nav/navStructure'
import { setMenuItemHoverIndex } from '@src/redux/slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'

type MenuItemType = {
  menu: MenuType
  goDownInMenu?: (id: string) => void
  hoveredMenuItemIndex: number
}

export function MenuItem({ menu, goDownInMenu, hoveredMenuItemIndex }: MenuItemType) {
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === hoveredMenuItemIndex)
  const isSubMenu = !!menu.menu
  const isIcon = !!menu.icon

  const onMenuItemClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isSubMenu) return
    goDownInMenu!(menu.id)
  }

  return (
    <MenuItemStyled
      href="/"
      onClick={onMenuItemClickHandler}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex))}
      isHovered={isHovered}
    >
      {isIcon && <Icon icon={menu.icon} />}
      <TextInMenu reserveSpaceForIcon={isSubMenu} name={menu.name} />
      {isSubMenu && <MenuIconRight><ForwardIcon /></MenuIconRight>}
    </MenuItemStyled>
  )
}

const MenuIconRight = styled(RoundSpanForIconStyled)`
  background-color: transparent;
  margin-right: -5px;
  position: absolute;
  right: 10px;
`
