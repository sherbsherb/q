import { MenuType } from '@components/Nav/navStructure'
import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.MutableRefObject<HTMLDivElement>
  menu: MenuType[]
  className: string
}

export function SlidableMenuItemsContainer({ reference, menu, className }: Props) {
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)
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
