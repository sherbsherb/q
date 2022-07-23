import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { theme } from '@src/theme'
import { setMenuItemHoverIndex } from '@slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { globalObject } from '@src/globalObject'
import { EventType } from '@src/types'

export function BackMenuItem() {
  const dispatch = useDispatchTyped()
  const isHovered = useSelector(state => state.nav.menuItemHoverIndex === 1)
  const color = theme.colors.closeAndBackMenuItems

  const onClickHandler = (e: EventType) => {
    e.preventDefault()
    globalObject.goUpInMenu && globalObject.goUpInMenu()
  }

  return (
    <MenuItemStyled
      to={'/'}
      onClick={onClickHandler}
      onMouseEnter={() => dispatch(setMenuItemHoverIndex(1))}
      $isHovered={isHovered}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
