
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Sorting", path: "/sorting" },
  { name: "Trees", path: "/trees" },
  { name: "Graph", path: "/graphs" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide hover:text-pink-400 transition"
          onClick={() => setMenuOpen(false)}
        >
          DSA Visualizer
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path} className="relative group">
                <Link
                  to={path}
                  className={`text-white font-semibold py-1 px-2 transition ${
                    isActive ? "text-pink-400" : "hover:text-pink-300"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>

                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-0.5 bg-pink-400 rounded transition-transform transform scale-x-0 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : ""
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white space-y-4 px-5 pb-5">
          {navItems.map(({ name, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`block py-2 font-semibold rounded-md transition ${
                    isActive ? "bg-pink-400 text-indigo-900" : "hover:bg-pink-300 hover:text-indigo-900"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
