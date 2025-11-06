import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/SG/Sidebar';
import IDV from '../components/SG/IDV';
import VLOG from '../components/SG/VLOG';

const SGD =()=>{
  return(
    <>
    <div className='flex h-screen overflow-hidden bg-gray-50'>

       <aside className="flex-shrink-0">
        <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<IDV />} />
            <Route path="/idv" element={<IDV />} />
            <Route path="/vlog" element={<VLOG />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default SGD