import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { theme } from '@src/theme'

type BackMenuItemType = {
  goUpInMenuAnimate: () => void
}

export function BackMenuItem({ goUpInMenuAnimate }: BackMenuItemType) {
  const color = theme.colors.closeAndBackMenuItems

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    goUpInMenuAnimate()
  }

  return (
    <MenuItemStyled href="/" onClick={onClickHandler} >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color }}>Back</span>} />
    </MenuItemStyled>
  )
}
