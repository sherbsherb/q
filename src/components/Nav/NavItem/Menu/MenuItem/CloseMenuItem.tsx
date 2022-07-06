import { useContext, createElement } from 'react'
import { TextInMenuItemStyled } from './TextInMenuItemStyled'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { ContextMenu } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const { closeMenu } = useContext(ContextMenu)

  return (
    <MenuItemStyled style={{ color: '#858383', marginTop: '16px' }}
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        closeMenu()
      }}
    >
      <Icon>{closeIcon}</Icon>
      <TextInMenuItemStyled>Close</TextInMenuItemStyled>
    </MenuItemStyled>
  )
}
