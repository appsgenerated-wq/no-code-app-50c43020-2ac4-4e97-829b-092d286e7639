import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { ArrowRightOnRectangleIcon, PlusIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, posts, onLogout, onLoadPosts, onCreatePost }) => {
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'Act of Kindness' });

  useEffect(() => {
    onLoadPosts();
  }, [onLoadPosts]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    await onCreatePost(newPost);
    setNewPost({ title: '', content: '', category: 'Act of Kindness' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <div className="flex items-center space-x-4">
             <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Admin Panel</a>
            <button onClick={onLogout} className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Kindness Feed</h2>
            {posts.length === 0 ? (
              <div className="bg-white text-center p-12 rounded-lg shadow">
                <p className="text-gray-500">No posts yet. Be the first to share something kind!</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm transition hover:shadow-md">
                  <div className="flex items-center mb-3">
                    <UserCircleIcon className="w-8 h-8 text-gray-400 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">{post.author?.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                  <span className="mt-4 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{post.category}</span>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><PlusIcon className="w-5 h-5 mr-2"/>Share Kindness</h2>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title of your story"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                <textarea
                  placeholder="Share your positive story..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                 <select 
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option>Act of Kindness</option>
                  <option>Gratitude</option>
                  <option>Positive News</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105">
                  Post to Feed
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
