import React from 'react'
import HED from '../pages/HED.jsx'
import Login  from '../pages/Login.jsx'
import { Routes, Route} from 'react-router-dom'

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/hed/*" element={<HED/>}/>
    </Routes>

  )
}

export default App