import { store } from '@redux/store'
import { useDispatchTyped } from '@store/storeHooks'
import { useEffect } from 'react'
import { closeMenu, setMenuItemHoverIndex } from '@slices/navSlice'
import { getMenuItemByIdsChain } from './getMenuItemByIdsChain'
import { clickOnMenuItem } from '../MenuItem/functions/clickOnMenuItem'
import { globalObject } from '@src/globalObject'

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
      globalObject.goUpInMenu && globalObject.goUpInMenu()
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
        globalObject.goUpInMenu && globalObject.goUpInMenu()
        return
      }
      if (hoveredMenuItemIndex === 1 && !isNestedMenu) {
        dispatch(closeMenu())
        return
      }
    }

    const anyLetter = /\w/
    if (e.key.match(anyLetter)) {
      if (!isNestedMenu && e.key === 'c') {
        dispatch(setMenuItemHoverIndex(1))
        return
      }
      if (isNestedMenu && e.key === 'b') {
        dispatch(setMenuItemHoverIndex(1))
        return
      }
      // search in items below hovered item
      const index = currentMenuItems.findIndex((menuItem, index) => {
        const isiKeySameAsFirstItemLetter = menuItem.name && menuItem.name.toLowerCase().startsWith(e.key)
        if (!isiKeySameAsFirstItemLetter) return false
        if (index + 2 > hoveredMenuItemIndex) return true
        return false
      })
      if (index > -1) {
        dispatch(setMenuItemHoverIndex(index + 2))
      }
      // if no found below hovered item, do it again from the top
      if (index === -1) {
        const newIndex = currentMenuItems.findIndex((menuItem, index) => {
          const isiKeySameAsFirstItemLetter = menuItem.name && menuItem.name.toLowerCase().startsWith(e.key)
          return isiKeySameAsFirstItemLetter
        })
        if (newIndex > -1) {
          dispatch(setMenuItemHoverIndex(newIndex + 2))
        }
      }
    }
  }

  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  useEffect(keyShortcutsForMenu, [])
}
