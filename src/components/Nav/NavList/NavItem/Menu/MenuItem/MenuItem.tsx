import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import { MenuType } from '@src/components/Nav/navStructure'

type MenuItemType = {
  menu: MenuType
  goDownInMenuAnimate?: (id: string) => void
}

export function MenuItem({ menu, goDownInMenuAnimate }: MenuItemType) {
  const isSubMenu = !!menu.menu
  const isIcon = !!menu.icon

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isSubMenu) return
    goDownInMenuAnimate!(menu.id)
  }

  return (
    <MenuItemStyled href="/" onClick={onClickHandler} >
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
