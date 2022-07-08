import styled from 'styled-components'

export function NavList(props) {
  return (
    <Ul>
      {nav.map(
        (menuO: MenuType) => !menuO.hidden && <NavItem menuO={menuO} key={menuO.id} />
      )}
    </Ul>
  )
}

const Ul = styled.ul`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  background: yellow;
`
