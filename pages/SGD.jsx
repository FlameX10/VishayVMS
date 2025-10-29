import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/SG/Sidebar';
import IDV from '../components/SG/IDV';
import VLOG from '../components/SG/VLOG';

const SGD =()=>{
  return(
    <>
    <div className='flex flex-row h-screen'>

        <div className='m-4 w-64'><Sidebar/></div>

        <div>
            
            <Routes>
                <Route path="/" element={<IDV />} />
                <Route path="/idv" element={<IDV />} />
                <Route path="/vlog" element={<VLOG />} />
            </Routes>
        </div>
    </div>
    </>
  );
}

export default SGD