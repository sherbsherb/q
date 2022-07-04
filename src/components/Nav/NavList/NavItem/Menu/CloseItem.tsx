import React from 'react'
import styled from 'styled-components'
import { SpanStyled } from './SpanStyled'
import { Icon } from '../Icon'
import { MenuLink } from './MenuItem'
import { CgClose as CloseIcon } from "react-icons/cg";


import { ContextMenu } from './Menu'

const closeIcon = React.createElement(CloseIcon, {})

const CloseLink = styled(MenuLink)`
  color: #858383;
  animation: none;
  margin: 0px 16px;
  margin-top: 16px;
  svg {
    stroke-width: 0.5px;
  }
`

export function CloseItem() {
  // console.log('CloseItem')
  const { closeMenu } = React.useContext(ContextMenu)

  return (
    <CloseLink
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        closeMenu()
      }}
    >
        <Icon>{closeIcon}</Icon>
        <SpanStyled>Close</SpanStyled>
    </CloseLink>
  )
}
