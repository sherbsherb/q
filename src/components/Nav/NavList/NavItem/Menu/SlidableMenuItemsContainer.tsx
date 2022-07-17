import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { getMenuItemByIdsChain } from './functions/getMenuItemByIdsChain'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.MutableRefObject<HTMLDivElement>
  idsToMenu: string[]
  className: string
}

export function SlidableMenuItemsContainer({ reference, idsToMenu, className }: Props) {
  const hiddenItemNamesState = useSelector(state => state.nav.hiddenItemNames)
  const menuItems = getMenuItemByIdsChain(idsToMenu)
  console.log('menuItems', menuItems)
  return (
    <div ref={reference} className={className}>
      {menuItems
        .filter(menuItem => {
          const isVisible = !hiddenItemNamesState.includes(menuItem.name || '')
          return isVisible
        })
        .map((menuItem, index) => {
          return (
            <MenuItem
              menuItem={menuItem}
              key={menuItem.id}
              hoveredMenuItemIndex={index + 2}
            />
          )
        })
      }
    </div>
  )
}
