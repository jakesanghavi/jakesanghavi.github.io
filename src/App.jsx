import { useState } from 'react'
import Resume from './pages/Resume';
import './master.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Resume></Resume>
  )
}

export default App
