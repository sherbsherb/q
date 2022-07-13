import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { goUpInMenu, goUpInNextMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped } from '@store/storeHooks'

type BackMenuItemType = {
  goUpMenuAnimate: (arg: () => void) => void
}

export function BackMenuItem({ goUpMenuAnimate }: BackMenuItemType) {
  const dispatch = useDispatchTyped()

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()

        dispatch(goUpInNextMenu())
        goUpMenuAnimate(() => { dispatch(goUpInMenu()) })
      }}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color: '#858383' }}>Back</span>} />
    </MenuItemStyled>
  )
}
