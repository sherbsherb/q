import styled from 'styled-components'

type PropsForSC = {
  hovered: boolean
}

export const MenuItemStyled = styled.a<PropsForSC>`
  position: relative;
  height: ${props => props.theme.menu.menuItem.height}px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0px 16px;
  color: #dadce1;
  white-space: nowrap;
  text-decoration: none;
  background-color: ${props => props.hovered ? '#525357' : 'initial'};
  transition: background-color 0.5s;
`
