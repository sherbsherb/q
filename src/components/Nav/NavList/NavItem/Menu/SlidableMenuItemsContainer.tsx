import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { getMenuItemByIdsChain } from './functions/getMenuItemByIdsChain'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.MutableRefObject<HTMLDivElement>
  idsToMenu: string[]
  className: string
}

export function SlidableMenuItemsContainer({ reference, idsToMenu, className }: Props) {
  const menuItems = getMenuItemByIdsChain(idsToMenu)
  return (
    <div ref={reference} className={className}>
      {
        menuItems
          .filter(menuItem => !menuItem.isHidden)
          .map((menuItem, index) => (
              <MenuItem
                menuItem={menuItem}
                key={menuItem.id}
                hoveredMenuItemIndex={index + 2}
              />
          ))
      }
    </div>
  )
}
