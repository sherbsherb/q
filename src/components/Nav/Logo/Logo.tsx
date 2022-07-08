import styled from 'styled-components'

export function Logo() {
  return (
    <LogoContainer>
      Logo
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;


  /* first nav item will be overflown if there is no space anymore
  we detect it with JS by comparing el.scrollWidth !== el.clientWidth
  show hamburger */
  overflow-x: auto;

`
