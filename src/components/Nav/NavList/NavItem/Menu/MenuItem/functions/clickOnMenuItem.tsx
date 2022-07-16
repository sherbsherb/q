import { store } from '@src/redux/store'
import { getMenuItemByIdsChain } from '../../functions/getMenuItemByIdsChain'

type Args = {
  e: KeyboardEvent | MouseEvent | React.MouseEvent | React.KeyboardEvent
  menuId: string
  goDownInMenu?: (id: string) => void
}

export const clickOnMenuItem = ({ e, menuId, goDownInMenu }: Args) => {
  e.preventDefault()
  const chainToClickedItem = [...store.getState().nav.idsToCurrentMenu, menuId]
  const nextMenu = getMenuItemByIdsChain(chainToClickedItem)
  const isNestedMenuAvailable = !!nextMenu.length
  if (!isNestedMenuAvailable) return
  goDownInMenu!(menuId)
}
