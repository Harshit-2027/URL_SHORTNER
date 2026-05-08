import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">

      <Link to="/" className="text-white font-bold text-xl">
        URL Shortener
      </Link>

      <div className="flex gap-3">

        <Link
          to="/auth"
          search={{ mode: "login" }}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
        >
          Login
        </Link>

        <Link
          to="/auth"
          search={{ mode: "signup" }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          Signup
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;