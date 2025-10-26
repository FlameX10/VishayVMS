import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidebar from '../components/PA/Sidebar'

const PAD = ()=>{
    return(
  <>
    <div className='flex flex-row h-screen'>

      <div className='m-4 w-64'><Sidebar/></div>
      
      <div>
        {/* iss routes ke andar har dashborad ke pages kon dalo */}
        <Routes>
            <Route></Route>
        </Routes>
      </div>


    </div>


  </>
    );
}

export default PAD