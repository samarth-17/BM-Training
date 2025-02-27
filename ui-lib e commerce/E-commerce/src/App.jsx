import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <h1 className='text-center text 2x1 text-blue-500'>E-commerce using shadcn</h1>
      <Button variant="outline">Button</Button>

    </>
  )
}

export default App
