import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/PA/Sidebar'
import EMPD from '../components/PA/EMPD'
import EMPR from '../components/PA/EMPR'
import POPA from '../components/PA/POPA'
import VR from '../components/PA/VR'

const PAD = ()=>{
    return(
  <>
    <div className='flex flex-row h-screen'>

      <div className='m-4 w-64'><Sidebar/></div>
      
      <div>
        {/* iss routes ke andar har dashborad ke pages kon dalo */}
        <Routes>
            <Route path="/" element={<EMPD/>}></Route>
            <Route path="/empd" element={<EMPD/>}></Route>
            <Route path="/empr" element={<EMPR/>}></Route>
            <Route path="/popa" element={<POPA/>}></Route>
            <Route path="/vr" element={<VR/>}></Route>
        </Routes>
      </div>


    </div>


  </>
    );
}

export default PAD