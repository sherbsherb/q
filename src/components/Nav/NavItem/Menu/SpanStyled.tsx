import styled from 'styled-components'

export const SpanStyled = styled.span`
  margin-left: 10px;
  margin-right: ${props => props.isSubMenu ? '30px' : '0px'}; /* place for right arrow for nested menu */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
