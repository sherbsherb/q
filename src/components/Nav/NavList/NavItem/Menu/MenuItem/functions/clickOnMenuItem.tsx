import { g } from '@src/g'
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
  if (!isNestedMenuAvailable) return
  g.goDownInMenu && g.goDownInMenu(menuId)
}
