import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser, SignupUser } from '../services/auth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login: use email as username for now
        console.log(email, password);
        await loginUser(email, password);
        console.log("Login successful");
        // Assuming result has user data, but from service, it stores token and id
        navigate('/dashboard');
      } else {
        // Signup: split name into first and last
        const nameParts = name.split(' ');
        const first_name = nameParts[0] || '';
        const last_name = nameParts.slice(1).join(' ') || '';
        await SignupUser(username || email, email, password, first_name, last_name);
        // After signup, perhaps auto-login or show success
        // For now, switch to login
        setIsLogin(true);
        setError('Account created successfully! Please log in.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6 pt-24">
      <div className="bg-gray-900 w-full max-w-md p-10 rounded-3xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm mb-2 text-gray-400">Username</label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="username"
                  required={!isLogin}
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-400">Full Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm mb-2 text-gray-400">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-indigo-500 hover:underline"
            type="button"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}