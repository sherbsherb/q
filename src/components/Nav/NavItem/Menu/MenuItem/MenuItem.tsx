import { useContext } from 'react'
import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { ContextMenu } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'

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
      {isIcon && <Icon icon={menuItem.icon} />}
      <TextInMenu reserveSpaceForIcon={isSubMenu} text={menuItem.text} />
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
