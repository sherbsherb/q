import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { useDispatchTyped } from '@store/storeHooks'
import { closeBurger, closeCurrentMenu, closeNextMenu } from '@src/redux/slices/navSlice'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const dispatch = useDispatchTyped()

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        dispatch(closeCurrentMenu())
        dispatch(closeNextMenu())
        dispatch(closeBurger())
      }}
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color: '#858383' }}>Close</span>} />
    </MenuItemStyled>
  )
}
