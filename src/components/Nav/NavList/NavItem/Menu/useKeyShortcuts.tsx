import { store } from '@src/redux/store'
import { useDispatchTyped } from '@src/redux/store/storeHooks'
import { useEffect } from 'react'
import { closeMenu } from '@src/redux/slices/navSlice'

type Props = {
  goUpInMenu: () => void
}

export function useKeyShortcuts({ goUpInMenu }: Props) {
  const dispatch = useDispatchTyped()

  function keyShortcutsForMenu() {
    window.addEventListener('keydown', navKeyboardHandler)
    return () => { window.removeEventListener('keydown', navKeyboardHandler) }
  }

  function navKeyboardHandler(e: KeyboardEvent) {
    const isNestedMenu = store.getState().nav.idsToCurrentMenu.length > 2

    if (isNestedMenu && e.key === 'Backspace') {
      goUpInMenu()
      return
    }
    if ((!isNestedMenu && e.key === 'Backspace') || e.key === 'Escape') {
      dispatch(closeMenu())
    }
  }

  useEffect(keyShortcutsForMenu, [])
}
