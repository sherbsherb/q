import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { theme } from '@src/theme'
import { menuItemHoverIndexChange } from '@src/redux/slices/navSlice'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'

type BackMenuItemType = {
  goUpInMenu: () => void
}

export function BackMenuItem({ goUpInMenu }: BackMenuItemType) {
  const dispatch = useDispatchTyped()
  const menuItemHoverIndex = useSelector(state => state.nav.menuItemHoverIndex)
  const color = theme.colors.closeAndBackMenuItems

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    goUpInMenu()
  }

  return (
    <MenuItemStyled
      href="/"
      onClick={onClickHandler}
      onMouseEnter={() => dispatch(menuItemHoverIndexChange(1))}
      onMouseLeave={() => dispatch(menuItemHoverIndexChange(0))}
      hovered={menuItemHoverIndex === 1}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
