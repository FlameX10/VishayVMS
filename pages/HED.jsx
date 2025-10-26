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
          <div className='m-4 w-64'><Sidebar/></div>


         <div>
         
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