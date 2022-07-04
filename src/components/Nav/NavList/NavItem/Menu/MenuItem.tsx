import styled from 'styled-components'
import { FaChevronRight as ForwardIcon } from 'react-icons/fa'
import React, { useContext } from 'react'
import { SpanStyled } from './SpanStyled'
import { Icon } from '../Icon'
import { ContextMenu } from './Menu'

export function MenuItem(props) {
  // console.log('MenuItem')
  const { setWhereToSlidState, swapMenu, changeMenu } = useContext(ContextMenu)
  const { menuItem } = props
  const isSubMenu = !!menuItem.menu
  const isLeftIcon = !!menuItem.iconLeft

  return (
    <MenuLink
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        if (!isSubMenu) return
        setWhereToSlidState('backward')
        swapMenu()
        changeMenu(menuItem)
      }}
    >
        {isLeftIcon && <Icon>{menuItem.iconLeft}</Icon>}
        <SpanStyled>{menuItem.text}</SpanStyled>
        {isSubMenu && (
            <MenuIconRight>
              <ForwardIcon />
            </MenuIconRight>
        )}
    </MenuLink>
  )
}

// var may fix the error 'styled component hot-update Cannot access before initialization'
export const MenuLink = styled.a`
  position: relative;
  height: 50px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0px 16px;
  color: #dadce1;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background-color: #525357;
  }
`

const MenuIconRight = styled(Icon)`
  background-color: transparent;
  margin-right: -5px;
  position: absolute;
  right: 15px;
`
