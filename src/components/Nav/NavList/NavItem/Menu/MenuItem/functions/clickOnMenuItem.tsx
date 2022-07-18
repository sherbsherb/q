import { globalObject } from '@src/globalObject'
import { store } from '@src/redux/store'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'

type Args = {
  e: KeyboardEvent | MouseEvent | React.MouseEvent | React.KeyboardEvent
  menuId: string
}

export const clickOnMenuItem = ({ e, menuId }: Args) => {
  e.preventDefault()
  const chainToClickedItem = [...store.getState().nav.idsToCurrentMenuItems, menuId]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length

  if (isNestedMenuAvailable) {
    globalObject.goDownInMenu && globalObject.goDownInMenu(menuId)
    return
  }

  const menuItems = getMenuItemByIdsChain(store.getState().nav.idsToCurrentMenuItems)
  const menuItem = menuItems!.find(menuItem => menuItem.id === menuId)
  const icon = menuItem?.icon
  const name = menuItem?.name
  const link = menuItem?.link
  const func = menuItem?.func
}
