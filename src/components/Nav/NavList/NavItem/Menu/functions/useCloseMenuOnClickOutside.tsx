import { isClickInsideThisElement } from '@src/functions/isClickInsideThisElement'
import { useDispatchTyped } from '@store/storeHooks'
import { useEffect } from 'react'
import { closeMenu } from '@slices/navSlice'

type Props = {
  menuContainerRef: React.MutableRefObject<HTMLDivElement>
}

export function useCloseMenuOnClickOutside({ menuContainerRef }: Props) {
  const dispatch = useDispatchTyped()

  /**
   * @descriptions
   * - menu is absolutely positioned inside NavItem li element
   * - if click outside menu - close
   * - if click on navItem do not close, but close it in NavItem onClick handler, otherwise it closes and opens immediately
   */

  function mouseDownHandler(e: MouseEvent) {
    const menu = menuContainerRef.current
    if (!menu) return
    const navItem = menuContainerRef.current.parentElement
    if (!navItem) return
    const clickedEl = e.target as HTMLElement
    const isClickOnOpenedNavItem = isClickInsideThisElement(clickedEl, navItem) && !isClickInsideThisElement(clickedEl, menu)
    if (isClickOnOpenedNavItem) return
    if (!isClickInsideThisElement(clickedEl, menu)) {
      dispatch(closeMenu())
    }
  }

  function hideMenuOnClickOutside() {
    document.addEventListener('mousedown', mouseDownHandler)
    return () => { document.removeEventListener('mousedown', mouseDownHandler) }
  }

  useEffect(hideMenuOnClickOutside, [])
}
