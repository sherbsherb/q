import styled from 'styled-components'
import { MenuType, navStructure } from '../navStructure'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped as useSelector } from '@store/storeHooks'

export function NavList() {
  const hiddenItemNamesState = useSelector(state => state.nav.hiddenItemNames)

  return (
    <Ul>
      {navStructure[0].menuItems!.map(
        (menuItem: MenuType) => {
          const isVisible = !hiddenItemNamesState.includes(menuItem.name || '')
          return isVisible && <NavItem id={menuItem.id} key={menuItem.id} />
        }
      )}
      <NavItem id={'burger'} key={'burger'}><Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
