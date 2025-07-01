import React, { useState } from 'react';

const LoginPopup = ({ onClose, onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!username || !password || (!isLogin && !email)) {
      setError(isLogin ? 'Please enter both username and password' : 'Please fill in all fields');
      return;
    }

    setError('');
    if (isLogin) {
      onLogin({ username, password });
    } else {
      onRegister({ username, email, password });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close auth popup"
        >
          &#10005;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-[#0c6c6e]">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c6c6e]"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c6c6e]"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0c6c6e]"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0c6c6e] text-white py-2 rounded-md font-semibold hover:bg-[#095352] transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className="text-[#0c6c6e] font-semibold hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className="text-[#0c6c6e] font-semibold hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
