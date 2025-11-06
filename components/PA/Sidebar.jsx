"use client";
import React, { useState } from "react";
import { Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "EMP Request", icon: Users, path: "/pad/empr/" },
  { name: "EMP Dashboard", icon: Clock, path: "/pad/empd/" },
  { name: "Visitors Request", icon: Users, path: "/pad/vr/" },
  { name: "POP Approval", icon: Users, path: "/pad/popa/" },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-700 to-teal-800 text-white shadow-2xl" style={{ width: '280px' }}>
      {/* Header Section */}
      <div className="px-6 py-8 border-b border-teal-600/50">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          PROCESS ADMIN
        </h1>
        <div className="mt-2 h-1 w-16 bg-teal-400 rounded-full"></div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isSelected = selectedIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index, item.path)}
              className={`
                group flex items-center gap-4 px-4 py-3.5 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  isSelected
                    ? "bg-white/10 shadow-lg border-l-4 border-teal-400"
                    : "hover:bg-white/5 border-l-4 border-transparent hover:border-teal-400/50"
                }
              `}
            >
              <div className={`
                p-2 rounded-md transition-colors duration-200
                ${isSelected ? "bg-teal-500/20" : "bg-teal-600/30 group-hover:bg-teal-600/40"}
              `}>
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isSelected ? "text-teal-300" : "text-teal-200 group-hover:text-teal-100"
                  }`}
                />
              </div>
              <span className={`
                font-semibold text-sm transition-colors duration-200
                ${isSelected ? "text-white" : "text-teal-100 group-hover:text-white"}
              `}>
                {item.name}
              </span>
            </div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="px-6 py-4 border-t border-teal-600/50">
        <p className="text-xs text-teal-300 font-medium">Logoholder.com</p>
      </div>
    </div>
  );
};

export default Sidebar;