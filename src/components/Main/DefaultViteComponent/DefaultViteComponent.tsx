import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import styled, { useTheme } from 'styled-components'
import { theme } from '@src/theme'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '@src/redux/slices/counterSlice'
import { login } from '@src/redux/slices/loginSlice'
import { fetchUsers } from '@src/redux/slices/usersSlice'

/**
 * Component with counter
 * @returns component with react spinner
 */

export function DefaultViteComponent(): JSX.Element {
  const [count, setCount] = useState(0)
  const theme = useTheme()
  console.log(theme)

  const counter = useSelector(state => state.counter.counter)
  const isLogged = useSelector(state => state.login.isLogged)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const style = { border: '2px solid grey', padding: '10px', margin: '10px', maxWidth: '500px' }

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

      <div style={style}>
        <div>Counter: <strong>{counter}</strong></div>
        <button onClick={() => dispatch(increment())}>Increment +1</button>&#8194;
        <button onClick={() => dispatch(decrement({ num: 3 }))}>Decrement -3</button>
        <div>isLogged: <strong>{isLogged.toString()}</strong></div>
        <button onClick={() => dispatch(login())}>Sign in/out</button><br />
        <button onClick={() => dispatch(fetchUsers())}>Fetch users</button><br />
        <div>
          {users.loading && 'Loading...'}
          {users.err && users.err}
          {!users.loading && !!users.users.length && users.users.map(user => <div key={user.id}>{user.name}</div>)}
        </div>
      </div>
    </div>
  )
}

const Button = styled.button`
  border-color:  ${props => props.theme.colors.red};
  background-color: ${theme.colors.grey};
  color: white;
  cursor: pointer;
`
