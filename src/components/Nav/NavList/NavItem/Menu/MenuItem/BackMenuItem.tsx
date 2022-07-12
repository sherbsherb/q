import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { goUpInMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped } from '@store/storeHooks'

export function BackMenuItem() {
  const dispatch = useDispatchTyped()

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        dispatch(goUpInMenu())
      }}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color: '#858383' }}>Back</span>} />
    </MenuItemStyled>
  )
}
