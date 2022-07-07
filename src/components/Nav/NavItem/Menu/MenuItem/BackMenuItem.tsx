import { useContext } from 'react'
import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { ContextMenu } from '../Menu'
import { MenuItemStyled } from './MenuItemStyled'

export function BackMenuItem() {
  const { goOutside } = useContext(ContextMenu)

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        goOutside()
      }}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu text={<span style={{ color: '#858383' }}>Back</span>} />
    </MenuItemStyled>
  )
}
