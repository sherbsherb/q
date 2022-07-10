import { useSelectorTyped } from '@src/redux/store/storeHooks'
import styled from 'styled-components'

export function Logo({ logoRef }) {
  const screenWidthWhenHideLogoExtension = useSelectorTyped(state => state.nav.mediaQueryWidth.logoExtension)
  const screenWidthWhenHideLogoPart = useSelectorTyped(state => state.nav.mediaQueryWidth.logoPart)
  const screenWidthWhenShowBurger = useSelectorTyped(state => state.nav.mediaQueryWidth.burger)

  return (
    <LogoContainer
      ref={logoRef}
      screenWidthWhenHideLogoExtension={screenWidthWhenHideLogoExtension}
      screenWidthWhenHideLogoPart={screenWidthWhenHideLogoPart}
      screenWidthWhenShowBurger={screenWidthWhenShowBurger}
    >
      <a href="https://quotation.app/">
        <span>Q</span>
        <span className='uotation'>uotation</span>
        <span className='app-ext'>.app</span>
      </a>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 1;
  padding: 3px;
  padding-left: 10px;
  overflow: clip;

  a {
    cursor: pointer;
    font-size: 16px;

    @media (max-width: ${props => props.screenWidthWhenHideLogoPart}px) and (min-width: ${props => props.screenWidthWhenShowBurger}px)  {
      font-size: 30px;
    }



    span:first-child {
      color: white; 
    }

    span:nth-child(2) {
      color: #e7e7e7bf; 

      &:hover {
        color: white !important;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
      }

      @media (max-width: ${props => props.screenWidthWhenHideLogoPart}px) and (min-width: ${props => props.screenWidthWhenShowBurger}px) {
        display: none;
      }
    }

    span:last-child {
      color: #e7e7e7bf; 

      @media (max-width: ${props => props.screenWidthWhenHideLogoExtension}px) and (min-width: ${props => props.screenWidthWhenShowBurger}px) {
        display: none;
      }
    }
  }
`
