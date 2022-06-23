import styled from 'styled-components'

export function Footer() {
  return (
    <FooterStyled>
      I am the footer
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0px;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`
