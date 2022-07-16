import { store } from '@src/redux/store'
import { useDispatchTyped } from '@src/redux/store/storeHooks'
import { useEffect } from 'react'
import { closeMenu, setMenuItemHoverIndex } from '@src/redux/slices/navSlice'
import { getClickedMenu } from './getClickedMenu'

type Props = {
  goUpInMenu: () => void
}

export function useKeyShortcuts({ goUpInMenu }: Props) {
  const dispatch = useDispatchTyped()

  function navKeyboardHandler(e: KeyboardEvent) {
    const currentMenu = getClickedMenu(store.getState().nav.idsToCurrentMenu)
    const menuItemsQty = currentMenu.length + 1
    const hoveredMenuItemIndex = store.getState().nav.menuItemHoverIndex
    const isTopMenuItem = hoveredMenuItemIndex === 1
    const isLastMenuItem = hoveredMenuItemIndex === menuItemsQty

    if (e.key === 'ArrowDown') {
      e.preventDefault() // do not scroll window while navigating menu
      if (isLastMenuItem) {
        dispatch(setMenuItemHoverIndex(1))
        return
      }
      dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex + 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault() // do not scroll window while navigating menu
      if (isTopMenuItem) {
        dispatch(setMenuItemHoverIndex(menuItemsQty))
        return
      }
      dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex - 1))
      return
    }
    if (e.key === 'ArrowRight') {
      return
    }
    if (e.key === 'ArrowRight') {
      return
    }
    if (e.key === 'Enter') {
      return
    }
    const isNestedMenu = store.getState().nav.idsToCurrentMenu.length > 2
    if (isNestedMenu && e.key === 'Backspace') {
      goUpInMenu()
      return
    }
    if (isNestedMenu && e.key === 'ArrowLeft') {
      goUpInMenu()
      return
    }
    if ((!isNestedMenu && e.key === 'Backspace')) {
      dispatch(closeMenu())
      return
    }
    if ((!isNestedMenu && e.key === 'ArrowLeft')) {
      dispatch(closeMenu())
      return
    }
    if (e.key === 'Escape') {
      dispatch(closeMenu())
    }
  }

  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  useEffect(keyShortcutsForMenu, [])
}
