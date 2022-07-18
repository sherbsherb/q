import { globalObject } from '@src/globalObject'
import { store } from '@src/redux/store'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'

type Args = {
  e: KeyboardEvent | MouseEvent | React.MouseEvent | React.KeyboardEvent
  menuId: string
}

export const clickOnMenuItem = ({ e, menuId }: Args) => {
  const chainToClickedItem = [...store.getState().nav.idsToCurrentMenuItems, menuId]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length

  const menuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
  const menuItem = menuItems!.find(menuItem => menuItem.id === menuId)
  const link = menuItem?.link
  const func = menuItem?.func

  if (link) {
    // just follow the link natively
    return
  }

  e.preventDefault()

  if (func) {
    func()
    return
  }

  if (isNestedMenuAvailable) {
    globalObject.goDownInMenu && globalObject.goDownInMenu(menuId)
  }
}
