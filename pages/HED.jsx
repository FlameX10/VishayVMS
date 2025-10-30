import React from 'react'
import Sidebar  from '../components/HE/Sidebar'
import {Routes,Route} from 'react-router-dom'
import VL from '../components/HE/VL'
import MS from '../components/HE/MS'

const HED = () => {
  return (
    <>
      <div className='flex flex-row h-screen'>
        {/* Sidebar with fixed width */}
        <div className='w-65 m-4'>
          <Sidebar/>
        </div>

        {/* Main content area - takes remaining space */}
        <div className='flex-1 overflow-auto'>
          <Routes>
            <Route path="/" element={<VL/>}></Route>
            <Route path="/vl" element={<VL/>}></Route>
            <Route path="/ms" element={<MS/>}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default HED