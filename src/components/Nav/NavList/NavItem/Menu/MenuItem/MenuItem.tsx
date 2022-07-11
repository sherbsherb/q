import { useContext } from 'react'
import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { ContextMenu, MenuContextType } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import type { MenuTypeInObject } from '@components/Nav/navStructure'

export function MenuItem({ menuO }: MenuTypeInObject) {
  const { goInside } = useContext(ContextMenu) as MenuContextType
  const isSubMenu = !!menuO.menu
  const isIcon = !!menuO.icon

  return (
    <MenuItemStyled
      href=''
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        if (!isSubMenu) return
        goInside(menuO)
      }}
    >
      {isIcon && <Icon icon={menuO.icon} />}
      <TextInMenu reserveSpaceForIcon={isSubMenu} name={menuO.name} />
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
