import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { getMenuItemByIdsChain } from './functions/getMenuItemByIdsChain'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.MutableRefObject<HTMLDivElement>
  idsToMenu: string[]
  className: string
}

export function SlidableMenuItemsContainer({ reference, idsToMenu, className }: Props) {
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)
  const menu = getMenuItemByIdsChain(idsToMenu)
  console.log(menu)
  return (
    <div ref={reference} className={className}>
      {menu
        .filter(menu => {
          const isVisible = !hiddenItemNames.includes(menu.name || '')
          return isVisible
        })
        .map((menu, index) => {
          return (
            <MenuItem
              menu={menu}
              key={menu.id}
              hoveredMenuItemIndex={index + 2}
            />
          )
        })
      }
    </div>
  )
}
