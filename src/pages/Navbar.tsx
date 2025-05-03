import { Link } from 'lucide-react'
import React from 'react'
import { FaLinkedinIn } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div>
        <header className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 via-pink-500 to-green-800"></div>
                <span className="font-bold text-lg">lovable</span>
              </div>
              <nav className="hidden md:flex gap-6 text-md font-semibold">
                <Link to="/support"  className="hover:underline">Support</Link>
                <a href="#" className="hover:underline">Launched</a>
                <a href="#" className="hover:underline">Learn</a>
               
              </nav>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-3 text-lg">
                  <span>✖</span>
                  <span>🐱</span>
                  <span>🔗</span>
                  <span className='relative top-2 text-xl'><FaLinkedinIn /></span>
                  <button className='bg-green-700 text-sm font-semibold px-4 py-2 rounded-md'>Sign in </button>
                  <Link to="/signup" className='bg-green-700 text-sm font-semibold px-4 py-2 rounded-md'>Sign up</Link>
                </div>
                <div className="bg-gray-800 px-4 py-1 rounded-md text-sm font-medium">Neha Bobade ▾</div>
              </div>
            </header>
    </div>
  )
}

export default Navbar