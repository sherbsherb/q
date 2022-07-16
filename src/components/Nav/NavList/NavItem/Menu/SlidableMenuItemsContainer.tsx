import { MenuType } from '@src/components/Nav/navStructure'
import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { MenuItem } from './MenuItem'

type Props = {
  reference: React.MutableRefObject<HTMLDivElement>
  menu: MenuType[]
  goDownInMenu: (id: string) => void
  className: string
}

export function SlidableMenuItemsContainer({ reference, menu, goDownInMenu, className }: Props) {
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)
  return (
    <div ref={reference} className={className}>
      {menu
        .filter((menu: MenuType) => {
          const isVisible = !hiddenItemNames.includes(menu.name || '')
          return isVisible
        })
        .map((menu: MenuType, index) => {
          return (
            <MenuItem
              menu={menu}
              key={menu.id}
              goDownInMenu={goDownInMenu}
              index={index + 2}
            />
          )
        })
      }
    </div>
  )
}
