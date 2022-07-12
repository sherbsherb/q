// import { useContext } from 'react'
import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import { Icon } from '../../Icon'
import { MenuItemStyled } from './MenuItemStyled'
import { TextInMenu } from './TextInMenu'
import { RoundSpanForIconStyled } from '../../RoundSpanForIconStyled'
import type { MenuTypeInObject } from '@components/Nav/navStructure'
import { goDownInMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped } from '@src/redux/store/storeHooks'

export function MenuItem({ menu, id }: MenuTypeInObject) {
  const dispatch = useDispatchTyped()
  const isSubMenu = !!menu.menu
  const isIcon = !!menu.icon

  return (
    <MenuItemStyled
      href=''
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        if (!isSubMenu) return
        dispatch(goDownInMenu(id))
      }}
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
