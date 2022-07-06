import { useContext } from 'react'
import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { ContextMenu } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenuItemStyled } from './TextInMenuItemStyled'

export function MenuItem({ menuItem }) {
  const { goLevelDown } = useContext(ContextMenu)
  const isSubMenu = !!menuItem.menu
  const isIcon = !!menuItem.icon

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        if (!isSubMenu) return
        goLevelDown(menuItem)
      }}
    >
      {isIcon && <Icon>{menuItem.icon}</Icon>}
      <TextInMenuItemStyled isSubMenu={isSubMenu}>{menuItem.text}</TextInMenuItemStyled>
      {isSubMenu && <MenuIconRight><ForwardIcon /></MenuIconRight>}
    </MenuItemStyled>
  )
}

const MenuIconRight = styled(Icon)`
  background-color: transparent;
  margin-right: -5px;
  position: absolute;
  right: 15px;
`
