import React, { useState } from 'react';
import { FaBars, FaBoxOpen, FaPlus, FaClipboardList } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Orders', icon: <FaClipboardList size={20} />, path: '/Order' },
    { name: 'Add Product', icon: <FaPlus size={20} />, path: '/AddProduct' },
    { name: 'Catalog', icon: <FaBoxOpen size={20} />, path: '/Catalog' },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-60' : 'w-16'
      } flex flex-col`}
    >
      {/* Top Section */}
      <div className="p-4 flex">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none text-xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col gap-2 mt-4">
        {menuItems.map(({ name, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <li key={name}>
              <Link
                to={path}
                className={`flex items-center gap-4 px-4 py-2 hover:bg-gray-800 transition ${
                  isActive ? 'bg-gray-700' : ''
                }`}
              >
                <span>{icon}</span>
                {isOpen && <span className="text-sm">{name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
