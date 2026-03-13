import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardSidebar({ posts = [], activeId, onSelect, onNew, onDelete, setView, showUserModal, setShowUserModal, onLogout }) {
  return (
    <aside className="bg-gray-900 text-gray-200 p-6 h-screen sticky top-0" style={{ width: '240px' }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">BlogForge</h1>
        <p className="text-xs text-gray-400">CMS v2.0</p>
      </div>

      <nav className="space-y-3 mb-8">
        <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-800">Generate</Link>
        <Link to="/dashboard?view=posts" className="block px-3 py-2 rounded hover:bg-gray-800">My Blogs</Link>
        <Link to="/dashboard?view=editor" className="block px-3 py-2 rounded hover:bg-gray-800">Editor</Link>
        <Link to="/settings" className="block px-3 py-2 rounded hover:bg-gray-800">Settings</Link>
        <button
          onClick={() => setView('preview')}
          className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
        >
          Preview
        </button>
        <button
          onClick={() => setShowUserModal(true)}
          className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
        >
          User
        </button>
      </nav>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Your Posts</h3>
          <div className="flex gap-2">
            <button onClick={onNew} className="text-sm text-indigo-400">New</button>
          </div>
        </div>
        <ul className="space-y-2 overflow-auto h-[40vh]">
          {posts.length === 0 && <li className="text-gray-500">No posts yet</li>}
          {posts.map(post => (
            <li key={post.id} className={`p-2 rounded-md cursor-pointer text-sm ${post.id === activeId ? 'bg-indigo-800/30' : 'hover:bg-gray-800'}`}>
              <div onClick={() => onSelect(post)}>
                <div className="font-medium">{post.title || 'Untitled'}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(post.created).toLocaleDateString()}</div>
              </div>
              <div className="mt-1 flex gap-2">
                <button onClick={() => onSelect(post)} className="text-xs px-2 py-1 bg-white/10 rounded">Open</button>
                <button onClick={() => onDelete(post.id)} className="text-xs px-2 py-1 bg-red-600/30 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-4">User Details</h3>
            <p className="mb-4">Name: {(JSON.parse(localStorage.getItem('sn_user') || 'null')?.name) || 'Guest'}</p>
            <div className="flex gap-4">
              <button onClick={() => setShowUserModal(false)} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700">Close</button>
              <button onClick={onLogout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Logout</button>
            </div>
          </div>
        </div>
      )}

    </aside>
  )
}
