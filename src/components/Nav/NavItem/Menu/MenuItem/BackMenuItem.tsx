import { useContext } from 'react'
import { TextInMenuItemStyled } from './TextInMenuItemStyled'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { ContextMenu } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'

export function BackMenuItem() {
  const { goLevelUp } = useContext(ContextMenu)

  return (
    <MenuItemStyled style={{ color: '#858383', marginTop: '16px' }}
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        goLevelUp()
      }}
    >
      <Icon><LeftArrowIcon /></Icon>
      <TextInMenuItemStyled>Back</TextInMenuItemStyled>
    </MenuItemStyled>
  )
}
