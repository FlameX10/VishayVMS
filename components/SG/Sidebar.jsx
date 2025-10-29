"use client";
import React, { useState } from "react";
import { Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Visitor Log", icon: Users, path: "/sgd/vlog" },
  { name: "ID Verification", icon: Clock, path: "/sgd/idv" },
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = (index, path) => {
    setSelectedIndex(index); 
    navigate(path); 
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="m-2 p-2">
        <h1 className="text-2xl font-extrabold font-sans">SECURITY GAURD</h1>
      </div>

      <hr className="border-t-4 border-blue-500" />

      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isSelected = selectedIndex === index;

        return (
          <div
            key={index}
            onClick={() => handleClick(index, item.path)}
            className={`flex flex-row p-2 rounded-md cursor-pointer transition-colors ${
              isSelected
                ? "bg-blue-500 border-2 border-black"
                : "bg-white border border-transparent hover:bg-gray-100"
            }`}
          >
            <div>
              <Icon
                className={`m-2 transition-colors ${
                  isSelected ? "text-white" : "text-gray-500"
                }`}
              />
            </div>
            <div className="m-2 font-bold">
              <p className={isSelected ? "text-white" : ""}>{item.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
