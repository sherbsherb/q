import { useSelectorTyped as useSelector } from '@store/storeHooks'
import { BackMenuItem } from './MenuItem/BackMenuItem'
import { CloseMenuItem } from './MenuItem/CloseMenuItem'

export function TopMenuItemsContainer() {
  const isNestedMenuState = useSelector(state => state.nav.idsToNextMenuItems.length > 2)
  return (
    <div className='non-slidable' >
      {isNestedMenuState ? <BackMenuItem /> : <CloseMenuItem />}
    </div>
  )
}
