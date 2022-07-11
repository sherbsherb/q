import styled from 'styled-components'
import { MenuType, navStructure } from '../navStructure'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped as useSelector } from '@src/redux/store/storeHooks'

export function NavList() {
  const hiddenItemNames = useSelector(state => state.nav.hiddenItemNames)

  return (
    <Ul>
      {navStructure.map(
        (menuO: MenuType) => {
          const isVisible = !hiddenItemNames.includes(menuO.name || '')
          return isVisible && <NavItem menuO={menuO} key={menuO.id} />
        }
      )}
      <NavItem menuO={{ id: 'burgerId', menu: navStructure }} key={'burgerId'}> <Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
