import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

function Navbar() {
  const user = typeof window !== 'undefined' ? localStorage.getItem('sn_user') : null

  return (
    <nav className="w-full fixed top-0 z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">ScriptNova</Link>
        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#about" className="hover:text-white">About</a>
        </div>
        <div className="flex gap-4">
          {
          // !user ?
           (
            <Link to="/auth" className="text-gray-300 hover:text-white">Login</Link>
          )
          //  : (
          //   <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
          // )
          }

          <Link to={user ? "/dashboard" : "/auth"} className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition">
            {user ? 'Open App' : 'Get Started'}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;