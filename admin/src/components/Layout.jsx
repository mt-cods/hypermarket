import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

const Layout = () => {
  return (
    <div className="flex flex-row h-screen w-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100 max-w-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
