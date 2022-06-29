import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import styled, { useTheme } from 'styled-components'
import { theme } from '@/theme'

/**
 * Component with counter
 * @returns component with react spinner
 */

export function DefaultViteComponent(): JSX.Element {
  const [count, setCount] = useState(0)
  const theme = useTheme()
  console.log(theme)

  return (
    <div style={{ border: `1px solid ${theme.colors.red}` }}>
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        width="300px"
        height="auto"
      />
      <p>
        <Button
          onClick={() => setCount((count) => count + 1)}
        >
          count is: {count}
        </Button>
      </p>
      <img src="img.jpg" alt="farmers and robots" />
    </div>
  )
}

const Button = styled.button`
  border-color:  ${props => props.theme.colors.red};
  background-color: ${theme.colors.grey};
  color: white;
  cursor: pointer;
`
