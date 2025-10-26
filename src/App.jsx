import React from 'react'
import HED from '../pages/HED.jsx'
import Login  from '../pages/Login.jsx'
import SMD from '../pages/SMD.jsx'
import SGD from '../pages/SGD.jsx'
import PAD from '../pages/PAD.jsx'
import { Routes, Route} from 'react-router-dom'

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/hed/*" element={<HED/>}/>
      <Route path="/pad/*" element={<PAD/>}/>
      <Route path="/smd/*" element={<SMD/>}/>
       <Route path="/sgd/*" element={<SGD/>}/>
    </Routes>

  )
}

export default App