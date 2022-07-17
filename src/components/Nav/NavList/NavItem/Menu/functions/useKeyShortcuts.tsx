import { store } from '@redux/store'
import { useDispatchTyped } from '@store/storeHooks'
import { useEffect } from 'react'
import { closeMenu, setMenuItemHoverIndex } from '@slices/navSlice'
import { getMenuItemByIdsChain } from './getMenuItemByIdsChain'
import { clickOnMenuItem } from '../MenuItem/functions/clickOnMenuItem'
import { g } from '@src/g'

export function useKeyShortcuts() {
  const dispatch = useDispatchTyped()

  function navKeyboardHandler(e: KeyboardEvent) {
    const currentMenuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
    const menuItemsQty = currentMenuItems.length + 1
    const hoveredMenuItemIndex = store.getState().nav.menuItemHoverIndex

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const isLastMenuItem = hoveredMenuItemIndex === menuItemsQty
      if (isLastMenuItem) {
        dispatch(setMenuItemHoverIndex(1))
        return
      }
      dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex + 1))
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const isTopMenuItem = hoveredMenuItemIndex < 2
      if (isTopMenuItem) {
        dispatch(setMenuItemHoverIndex(menuItemsQty))
        return
      }
      dispatch(setMenuItemHoverIndex(hoveredMenuItemIndex - 1))
      return
    }

    const isNestedMenu = store.getState().nav.idsToNextMenuItems.length > 2
    if (isNestedMenu && e.key === 'Backspace') {
      g.goUpInMenu && g.goUpInMenu()
      return
    }

    if ((!isNestedMenu && e.key === 'Backspace')) {
      dispatch(closeMenu())
      return
    }

    if (e.key === 'Escape') {
      dispatch(closeMenu())
      return
    }

    if (e.key === 'Enter') {
      const nextMenu = getMenuItemByIdsChain(store.getState().nav.idsToNextMenuItems)
      const nextMenuId = nextMenu[hoveredMenuItemIndex - 2]?.id || ''
      clickOnMenuItem({ e, menuId: nextMenuId })
      if (hoveredMenuItemIndex === 1 && isNestedMenu) {
        g.goUpInMenu && g.goUpInMenu()
      }
      if (hoveredMenuItemIndex === 1 && !isNestedMenu) {
        dispatch(closeMenu())
      }
    }
  }

  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  useEffect(keyShortcutsForMenu, [])
}
