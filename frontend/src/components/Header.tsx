import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 font-bold text-[11px] uppercase tracking-widest pb-1 border-b-2 block md:inline-block ${isActive
      ? 'text-blue-900 border-blue-900'
      : 'text-slate-500 border-transparent hover:text-blue-900 hover:border-blue-900'
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-[#f0f7ff]/90 backdrop-blur-md border-b border-blue-100 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition group" onClick={closeMenu}>
            <img src="/ponsri-logo.png" alt="Ponsri Enterprises" className="h-[30px] md:h-[36px] w-auto transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <button
            className="md:hidden text-slate-800 focus:outline-none p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-full left-0 w-full md:w-auto bg-[#fffaf5] md:bg-transparent shadow-xl md:shadow-none border-t md:border-none border-slate-100 z-50`}>
            <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-10 py-8 md:py-0">
              <li>
                <NavLink to="/" className={getNavClass} end onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/models" className={getNavClass} onClick={closeMenu}>
                  Models
                </NavLink>
              </li>
              <li>
                <NavLink to="/compare" className={getNavClass} onClick={closeMenu}>
                  Compare
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavClass} onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
