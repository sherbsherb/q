import { TextInMenu } from './TextInMenu'
import { Icon } from '../../Icon'
import { FaChevronLeft as LeftArrowIcon } from 'react-icons/fa'
import { MenuItemStyled } from './MenuItemStyled'
import { goUpInMenu, goUpInNextMenu } from '@src/redux/slices/navSlice'
import { useDispatchTyped } from '@store/storeHooks'

export function BackMenuItem({ goUpMenuAnimate }) {
  const dispatch = useDispatchTyped()

  return (
    <MenuItemStyled
      href=""
      onClick={e => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
        // dispatch(goUpInMenu())
        // dispatch(goUpInNextMenu())




        dispatch(goUpInNextMenu())
        // slide next menu from left to right into view
        // slide current menu to right out of view
        
        goUpMenuAnimate(() => { 
          dispatch(goUpInMenu())
          // gsapReset()
        })
        // dispatch(goDownInMenu(id)) // update current menu
        // reverse animation without duration
      }}
    >
      <Icon icon={<LeftArrowIcon />} />
      <TextInMenu name={<span style={{ color: '#858383' }}>Back</span>} />
    </MenuItemStyled>
  )
}
