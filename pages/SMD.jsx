import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/SM/Sidebar';
import ML from '../components/SM/ML';
import VM from '../components/SM/VM';
// import I from '../components/SM/I';
import RP from '../components/SM/RP'
import PA from '../components/SM/PA';

const SMD =()=>{
  return(
    <>
    <div className='flex flex-row h-screen'>

        <div className=' m-4 w-64'><Sidebar/></div>

        <div>
            
            <Routes>
                <Route path="/smd/ml" element={<ML />} />
                <Route path="/smd/vm" element={<VM />} />
                <Route path="/smd/pa" element={<PA />} />
                <Route path="/smd/rp" element={<RP />} />
            </Routes>
        </div>
    </div>
    </>
  );
}

export default SMD