import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaBasketShopping } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if accessToken is present in localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Handle log out by clearing accessToken and reloading the page
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload(); // Force reload to reflect logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white shadow-md backdrop-blur-sm bg-opacity-90 border-b border-gray-200 flex items-center justify-between px-6 py-4 z-50">
      {/* Logo */}
      <Link to={"/"}>
        <div className="flex items-center gap-4">
          <div className="text-[#0c6c6e] text-xl font-bold">H-Mart</div>
        </div>
      </Link>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Express Message */}
        <div className="text-sm text-[#0c6c6e] font-medium hidden sm:block">
          ⚡ Get today's top deals in <strong>15 mins</strong>!
        </div>

        {/* Home Button */}
        <Link to="/">
          <button className="text-[#0c6c6e] hover:text-white hover:bg-[#0c6c6e] transition-colors px-4 py-2 rounded-md text-sm font-medium">
            Home
          </button>
        </Link>

        {/* Conditionally Render Orders/Sign In */}
        {!accessToken ? (
          <Link to="/cart">
            <button className="text-[#0c6c6e] hover:text-white hover:bg-[#0c6c6e] transition-colors px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </Link>
        ) : (
          <Link to="/orders">
            <button className="text-[#0c6c6e] hover:text-white hover:bg-[#0c6c6e] transition-colors px-4 py-2 rounded-md text-sm font-medium">
              Orders
            </button>
          </Link>
        )}

        {/* Cart */}
        <Link to="/cart">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#0c6c6e] cursor-pointer hover:bg-[#0c6c6e] hover:text-white transition-colors duration-400"
            aria-label="Shopping cart"
            title="View Cart"
          >
            <FaBasketShopping size={22} />
          </button>
        </Link>

        {/* Log Out Button */}
        {accessToken && (
          <button
            onClick={handleLogout}
            className="text-[#0c6c6e] hover:text-white hover:bg-[#0c6c6e] transition-colors px-4 py-2 rounded-md text-sm font-medium"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
