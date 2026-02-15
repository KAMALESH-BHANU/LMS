import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-yellow-400"
        >
          📚 LMS
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex space-x-8 text-gray-300">
          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>
          <a href="#features" className="hover:text-yellow-400 transition">
            Features
          </a>
          <a href="#about" className="hover:text-yellow-400 transition">
            About
          </a>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex space-x-4"><Link to={"/login"}>
          <button className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Login
          </button></Link>
          <Link to={"/register"}>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            Register
          </button></Link>
        </div>
      </div>
          
    </nav>
  );
};

export default Navbar;
