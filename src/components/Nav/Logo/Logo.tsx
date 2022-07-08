import styled from 'styled-components'
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver'
import { useEffect, useRef } from 'react'
import { isOverflown } from '@src/functions/isOverflown'
import { useIsInitRender } from '@src/hooks/useIsInitRender'

export function Logo() {
  const isInitRender = useIsInitRender()
  const logoRef = useRef()
  const DOMRect = useResizeObserver(logoRef)

  useEffect(() => {
    if (isInitRender) return
    if (isOverflown(logoRef.current)) console.log('show hamburger')
    if (!isOverflown(logoRef.current)) console.log('hide hamburger')
  }, [DOMRect])

  return (
    <LogoContainer ref={logoRef}>
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
