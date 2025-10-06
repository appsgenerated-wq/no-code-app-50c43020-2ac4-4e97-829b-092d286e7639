import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(null); // Use null to show loading state
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('ℹ️ [APP] No active session found.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
        setCurrentScreen('landing'); // Still show landing page but with error indicator
      }
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    await manifest.login(email, password);
    const loggedInUser = await manifest.from('User').me();
    setUser(loggedInUser);
    setCurrentScreen('dashboard');
  };

  const handleSignup = async (name, email, password) => {
    await manifest.from('User').signup({ name, email, password });
    await manifest.login(email, password);
    const signedUpUser = await manifest.from('User').me();
    setUser(signedUpUser);
    setCurrentScreen('dashboard');
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setPosts([]);
    setCurrentScreen('landing');
  };

  const loadPosts = async () => {
    const response = await manifest.from('KindnessPost').find({
      include: ['author'],
      sort: { createdAt: 'desc' },
    });
    setPosts(response.data);
  };

  const createPost = async (postData) => {
    const newPost = await manifest.from('KindnessPost').create(postData);
    // Re-fetch posts to get the latest list with author populated
    await loadPosts();
  };

  if (currentScreen === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading KindnessHub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">{backendConnected ? 'Backend Connected' : 'Backend Disconnected'}</span>
      </div>
      
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <DashboardPage
          user={user}
          posts={posts}
          onLogout={handleLogout}
          onLoadPosts={loadPosts}
          onCreatePost={createPost}
        />
      )}
    </div>
  );
}

export default App;
