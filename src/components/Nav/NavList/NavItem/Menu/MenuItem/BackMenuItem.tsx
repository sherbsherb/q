import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { goUpInCurrentMenu, goUpInNextMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped } from '@store/storeHooks'
import { theme } from '@src/theme'

type BackMenuItemType = {
  goUpInMenuAnimate: (arg: () => void) => void
}

export function BackMenuItem({ goUpInMenuAnimate }: BackMenuItemType) {
  const dispatch = useDispatchTyped()
  const color = theme.colors.closeAndBackMenuItems

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(goUpInNextMenu())
    goUpInMenuAnimate(() => { dispatch(goUpInCurrentMenu()) })
  }

  return (
    <MenuItemStyled href="/" onClick={onClickHandler} >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
