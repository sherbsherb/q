import styled from 'styled-components'

export const TextInMenuItemStyled = styled.span`
  margin-left: 10px;
  margin-right: ${props => props.isSubMenu ? '30px' : '0px'}; /* empty space for right arrow for nested menu */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
