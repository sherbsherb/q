import { useSelectorTyped } from '@src/redux/store/storeHooks'
import styled from 'styled-components'
import { MenuType } from '../navStructure'
import { NavItem } from './NavItem'

export function NavList() {
  const nav = useSelectorTyped(state => state.nav)
  return (
    <Ul>
      {nav.map(
        (menuO: MenuType) => !menuO.hidden && <NavItem menuO={menuO} key={menuO.id} />
      )}
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  background: yellow;
  overflow-x: clip;
`
