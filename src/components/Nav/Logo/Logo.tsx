import { useSelectorTyped } from '@src/redux/store/storeHooks'
import styled from 'styled-components'

type Prop = {
  logoRef: React.MutableRefObject<HTMLDivElement>
}

export function Logo({ logoRef }: Prop) {
  const mediaQueryWidth = useSelectorTyped(state => state.nav.mediaQueryWidth)

  return (
    <LogoContainer
      className='logo-container'
      ref={logoRef}
      screenWidthWhenHideLogoExtension={mediaQueryWidth.logoExtension}
      screenWidthWhenHideLogoPart={mediaQueryWidth.logoPart}
      screenWidthWhenShowBurger={mediaQueryWidth.burger}
    >
      <a href="https://quotation.app/">
        <span>Q</span>
        <span className='uotation'>uotation</span>
        <span className='app-ext'>.app</span>
      </a>
    </LogoContainer>
  )
}

type PropsForSC = {
  screenWidthWhenHideLogoPart: number
  screenWidthWhenHideLogoExtension: number
  screenWidthWhenShowBurger: number
}

const LogoContainer = styled.div<PropsForSC>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 1;
  padding: 3px;
  padding-left: 10px;
  overflow: auto;

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
