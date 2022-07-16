import styled from 'styled-components'

type PropsForSC = {
  isHovered: boolean
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
  background-color: ${props => props.isHovered ? '#525357' : 'initial'};
  filter: ${props => props.isHovered ? 'brightness(1.2)' : 'none'};
`
