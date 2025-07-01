import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { API_URL } from './config'; // API_URL imported from config.js

const LoginPopup = () => {
  // State for form inputs and error handling
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setError('');  // Reset error state on new attempt

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,  // Use your API_URL for login
        { username, password }
      );

      // If login is successful, store the token in localStorage
      localStorage.setItem('accessToken', response.data.accessToken);

      // Optionally, navigate to another page (e.g., home or dashboard)
      // window.location.href = '/dashboard';  // Example redirect

      setLoading(false);  // Stop loading
      window.location.reload();  // Reload page after login
    } catch (err) {
      setLoading(false);  // Stop loading
      if (err.response) {
        setError(err.response.data.message || 'Login failed, try again.');
      } else {
        setError('Network error, please try again later.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8 relative">
        {/* Close button */}
        <button
          onClick={() => setError('')}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close auth popup"
        >
          &#10005;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-[#0c6c6e]">
          Please log in
        </h2>

        {/* Error message */}
        {error && <p className="text-sm text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c6c6e]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c6c6e]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0c6c6e] text-white py-2 rounded-md font-semibold hover:bg-[#095352] transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
