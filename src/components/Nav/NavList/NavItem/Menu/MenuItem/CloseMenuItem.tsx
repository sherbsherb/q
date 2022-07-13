import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { useDispatchTyped } from '@store/storeHooks'
import { closeMenu } from '@src/redux/slices/navSlice'
import { theme } from '@src/theme'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const dispatch = useDispatchTyped()
  const color = theme.colors.closeAndBackMenuItems

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(closeMenu())
  }

  return (
    <MenuItemStyled href="/" onClick={onClickHandler} >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemStyled>
  )
}
