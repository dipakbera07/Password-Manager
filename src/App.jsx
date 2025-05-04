import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <div className='min-h-[calc(100vh-(70px+50px))]'>
      <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(236,250,239)_100%)]"></div>
     <Manager/>
      </div>
     </div>
     <Footer/>
    </>
  )
}

export default App
