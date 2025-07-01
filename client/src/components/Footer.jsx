import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0c6c6e] text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">H-mart</h2>
          <p className="text-sm text-gray-200">
            Your neighborhood grocery partner. Freshness and savings delivered
            to your door, fast and easy!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="flex items-center gap-2 text-sm text-gray-200 mb-1">
            <FaPhone /> +1 (800) 123-4567
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-200 mb-3">
            <FaEnvelope /> support@hmart.com
          </p>

          <div className="flex gap-4 mt-3">
            <a href="#" aria-label="Facebook" className="hover:text-[#ffd966]">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#ffd966]">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#ffd966]">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-300 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} H-mart. All rights reserved. | Terms & Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
