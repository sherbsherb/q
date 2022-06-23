import React from 'react'
import styled from 'styled-components'
import { DefaultViteComponent } from './DefaultViteComponent'

type Props = {
  children?: React.ReactNode
}

export function Main({ children }: Props) {
  return (
    <MainStyled>
      <div>Main component</div>
      <DefaultViteComponent />
      {children}
    </MainStyled>
  )
}

const MainStyled = styled.main`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
`
