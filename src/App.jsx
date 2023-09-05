import { useState } from 'react'
import './App.css'
import {similar} from './utils/archipanion.js'

function App() {
  const [count, setCount] = useState(0)

  const getSimilar = async(term) => {
    const ids = await similar(term)
    console.log(ids)
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getSimilar("Auto")}>Test API</button>
      </div>
    </>
  )
}

export default App
