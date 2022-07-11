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
        (menu: MenuType) => {
          const isVisible = !hiddenItemNames.includes(menu.name || '')
          return isVisible && <NavItem menu={menu} key={menu.id} />
        }
      )}
      <NavItem menu={{ id: 'burgerId', menu: navStructure }} key={'burgerId'}> <Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
