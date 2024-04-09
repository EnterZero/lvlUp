import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='underline'>Hello World</h1>

      <button className='rounded-3xl px-2 py-4 m-2 bg-sky-800'>Wpp Wupp</button>
    </>
  )
}

export default App
