import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { closeMenu, menuItemHoverIndexChange } from '@src/redux/slices/navSlice'
import { theme } from '@src/theme'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const color = theme.colors.closeAndBackMenuItems
  const dispatch = useDispatchTyped()
  const menuItemHoverIndex = useSelector(state => state.nav.menuItemHoverIndex)

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(closeMenu())
  }

  return (
    <MenuItemStyled
      href="/"
      onClick={onClickHandler}
      onMouseEnter={() => dispatch(menuItemHoverIndexChange(1))}
      onMouseLeave={() => dispatch(menuItemHoverIndexChange(0))}
      hovered={menuItemHoverIndex === 1}
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemStyled>
  )
}
