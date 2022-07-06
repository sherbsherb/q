import { useContext, createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { ContextMenu } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const { closeMenu } = useContext(ContextMenu)

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        closeMenu()
      }}
    >
      <Icon icon={closeIcon} />
      <TextInMenu text={<span style={{ color: '#858383' }}>Close</span>} />
    </MenuItemStyled>
  )
}
