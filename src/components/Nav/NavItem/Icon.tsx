import styled from 'styled-components'

export const Icon = styled.span`
  width: 30px;
  height: 30px;
  background-color: #484a4d;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dadce1;
  flex-shrink: 0; // to avoid logo shrink when menu item text is long

  svg {
    fill: #dadce1;
  }
`
