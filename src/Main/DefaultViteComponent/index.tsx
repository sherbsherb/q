import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

export function DefaultViteComponent() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" width="300px" height="auto" />
      <p> <button type="button" onClick={() => setCount((count) => count + 1)}> count is: {count} </button> </p>
    </>
  )
}
