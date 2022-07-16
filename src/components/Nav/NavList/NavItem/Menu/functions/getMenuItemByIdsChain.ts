import { MenuType, navStructure } from '@components/Nav/navStructure'

/**
 * returns clicked menu object from navStructure
 * @descriptions
 * - we track what menu was clicked
 * - put array of clicked menu ids into the store
 * - keep ids in array starting from the top to the clicked one
 * - in function we go through the chain of ids and search for the clicked one
 * @param idsToCurrentMenu array of menu ids from the top to the clicked one
 */

export function getMenuItemByIdsChain(idsToCurrentMenu: string[]) {
  let clicked: MenuType[] = navStructure
  let tempMenu: MenuType[] = navStructure
  idsToCurrentMenu.forEach((id: string) => {
    if (id === 'burger') {
      clicked = navStructure[0].menu!
      return clicked
    }
    if (id !== 'burger') {
      clicked = tempMenu.find(menu => menu.id === id)?.menu || []
    }
    tempMenu = clicked
  })
  return clicked
}
