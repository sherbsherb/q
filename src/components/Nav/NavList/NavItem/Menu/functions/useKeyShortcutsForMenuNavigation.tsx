import { store } from '@redux/store'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@store/storeHooks'
import { useEffect } from 'react'
import { closeMenu, setMenuItemHoverIndex } from '@slices/navSlice'
import { getMenuItemByIdsChain } from './getMenuItemByIdsChain'
import { globalObject } from '@src/globalObject'
import { useNavigate } from 'react-router-dom'

export function useKeyShortcutsForMenuNavigation() {
  const dispatch = useDispatchTyped()
  const navigate = useNavigate()
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)

  function navKeyboardHandler(e: KeyboardEvent) {
    const currentMenuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
    const currentMenuItemsNotHidden = currentMenuItems.filter(menuItem => !hiddenItemNames.includes(menuItem.name))
    const menuItemsQty = currentMenuItemsNotHidden.length + 1
    const hoveredMenuItemIndex = store.getState().nav.menuItemHoverIndex
    const isNestedMenu = store.getState().nav.idsToNextMenuItems.length > 2

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
      const menuId = nextMenu[hoveredMenuItemIndex - 2]?.id || ''
      const menuItem = currentMenuItems!.find(menuItem => menuItem.id === menuId)

      const isBackMenuItem = hoveredMenuItemIndex === 1 && isNestedMenu
      if (isBackMenuItem) {
        globalObject.goUpInMenu && globalObject.goUpInMenu()
        return
      }

      const isCloseMenuItem = hoveredMenuItemIndex === 1 && !isNestedMenu
      if (isCloseMenuItem) {
        dispatch(closeMenu())
        return
      }

      const link = menuItem?.link
      if (link) {
        navigate(link)
        dispatch(closeMenu())
        return
      }

      const func = menuItem?.func
      if (func) {
        func()
        dispatch(closeMenu())
        return
      }

      const isNestedMenuAvailable = !!menuItem?.menuItems
      if (isNestedMenuAvailable) {
        globalObject.goDownInMenu && globalObject.goDownInMenu(menuId)
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
        const newIndex = currentMenuItems.findIndex((menuItem) => {
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
