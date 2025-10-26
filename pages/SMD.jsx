import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/SM/Sidebar';

const SMD =()=>{
  return(
    <>
    <div className='flex flex-row h-screen'>

        <div className='m-4 w-64'><Sidebar/></div>

        <div>
            
            <Routes>
                <Route>

                </Route>
            </Routes>
        </div>
    </div>
    </>
  );
}

export default SMD