import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/SM/Sidebar';
import ML from '../components/SM/ML'
import VM from '../components/SM/VM'
import PA from '../components/SM/PA'
import RP from '../components/SM/RP'
const SMD =()=>{
  return(
    <>
    <div className='flex flex-row h-screen'>

        <div className=' m-4 w-64'><Sidebar/></div>

        <div>
            
            <Routes>
                 
                
                 <Route path='/' element={<ML/>}></Route>
                 <Route path='/ml' element={<ML/>}></Route>
                 <Route path='/vm' element={<VM/>}></Route>
                 <Route path='/pa' element={<PA/>}></Route>
                 <Route path='/rp' element={<RP/>}></Route>
            </Routes>
        </div>
    </div>
    </>
  );
}

export default SMD