import styled from 'styled-components'
import { MenuType, navStructure } from '../navStructure'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped as useSelector } from '@src/redux/store/storeHooks'

export function NavList() {
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)

  return (
    <Ul>
      {navStructure[0].menu.map(
        (menu: MenuType) => {
          const isVisible = !hiddenItemNames.includes(menu.name || '')
          return isVisible && <NavItem id={menu.id} key={menu.id} />
        }
      )}
      <NavItem id={'top'} key={'top'}><Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
