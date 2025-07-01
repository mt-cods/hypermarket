import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />  {/* <-- This renders child routes like <Home /> */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
