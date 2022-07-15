import styled from 'styled-components'

export const MenuItemStyled = styled.a`
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

  &:hover {
    background-color: #525357;
  }
`
