import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export function TopMenuItemsContainer() {
  const isNestedMenu = useSelector(state => state.nav.idsToNextMenu.length > 2)
  return (
    <div className='non-slidable' >
      {isNestedMenu ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
