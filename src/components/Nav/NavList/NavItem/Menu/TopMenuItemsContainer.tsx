import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

type Props = {
  goUpInMenu: () => void
}

export function TopMenuItemsContainer({ goUpInMenu }: Props) {
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenu.length > 2)
  return (
    <div className='non-slidable' >
      {isNestedMenu ? <BackMenuItem goUpInMenu={goUpInMenu}/> : <CloseMenuItem />}
    </div>
  )
}
