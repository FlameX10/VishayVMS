import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/PA/Sidebar';
import EMPD from '../components/PA/EMPD';
import EMPR from '../components/PA/EMPR';
import POPA from '../components/PA/POPA';
import VR from '../components/PA/VR';

const PAD = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Fixed width, no margin, full height */}
      <aside className="flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content Area - Takes remaining space, scrollable */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<EMPD />} />
          <Route path="/empd" element={<EMPD />} />
          <Route path="/empr" element={<EMPR />} />
          <Route path="/popa" element={<POPA />} />
          <Route path="/vr" element={<VR />} />
        </Routes>
      </main>
    </div>
  );
};

export default PAD;