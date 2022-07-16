import { createElement } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { CgClose as CloseIcon } from 'react-icons/cg'
import { MenuItemStyled } from './MenuItemStyled'
import { closeMenu, setMenuItemHoverIndex } from '@slices/navSlice'
import { theme } from '@src/theme'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'

const closeIcon = createElement(CloseIcon, {})

export function CloseMenuItem() {
  const color = theme.colors.closeAndBackMenuItems
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === 1)

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(closeMenu())
  }

  return (
    <MenuItemStyled
      href="/"
      onClick={onClickHandler}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(1))}
      isHovered={isHovered}
    >
      <Icon icon={closeIcon} />
      <TextInMenu name={<span style={{ color }}>Close</span>} />
    </MenuItemStyled>
  )
}
