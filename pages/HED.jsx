import React from 'react'
import Sidebar  from '../components/HE/Sidebar'
import {Routes,Route} from 'react-router-dom'
import VL from '../components/HE/VL'
import MS from '../components/HE/MS'
const HED = () => {
  return (
    <>
      <div className='flex flex-row h-screen'>
        {/* yaha mene div ko h-screen karke full screen ki height di hai */}
          <div className='w-65 bg-blue-400 p-3'><Sidebar/></div>


         <div >
         
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