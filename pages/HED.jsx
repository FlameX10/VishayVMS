import React from 'react'
import Sidebar  from '../components/HE/Sidebar'
import {Routes,Route} from 'react-router-dom'
import VL from '../components/HE/VL'
import MS from '../components/HE/MS'

const HED = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar with fixed width */}
        <aside className="flex-shrink-0">
        <Sidebar />
        </aside>

        {/* Main content area - takes remaining space */}
         <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<VL/>}></Route>
            <Route path="/vl" element={<VL/>}></Route>
            <Route path="/ms" element={<MS/>}></Route>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default HED