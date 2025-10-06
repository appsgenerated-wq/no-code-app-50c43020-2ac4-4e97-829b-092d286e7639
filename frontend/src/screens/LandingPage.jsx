import React, { useState } from 'react';
import config from '../constants.js';
import { HeartIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (isLoginView) {
        await onLogin(email, password);
      } else {
        await onSignup(name, email, password);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <HeartIcon className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-800">KindnessHub</h1>
          </div>
          <p className="text-xl text-gray-600 mt-2">
            A community dedicated to sharing positivity, gratitude, and acts of kindness.
          </p>
           <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-sm text-blue-600 hover:text-blue-800 transition-colors">Access Admin Panel &rarr;</a>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
          <div className="flex border-b mb-6">
            <button onClick={() => setIsLoginView(true)} className={`flex-1 py-3 text-lg font-semibold flex items-center justify-center gap-2 ${isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                <ArrowRightOnRectangleIcon className="w-5 h-5" /> Login
            </button>
            <button onClick={() => setIsLoginView(false)} className={`flex-1 py-3 text-lg font-semibold flex items-center justify-center gap-2 ${!isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                <UserPlusIcon className="w-5 h-5" /> Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
              {isLoginView ? 'Login to Your Account' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
