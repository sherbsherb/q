import styled from 'styled-components'

export function Logo() {
  return (
    <LogoContainer >
      <a href="https://quotation.app/">
        <span>Q</span>
        <span>uotation.app</span>
      </a>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 3px;
  padding-left: 10px;

  a {
    cursor: pointer;

    span:first-child {
      color: white; 
      font-size: 16px
    }

    span:last-child {
      color: #e7e7e7bf; 
      font-size: 16px;

      &:hover {
        color: white !important;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
      }
    }
  }
`
