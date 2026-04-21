import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 font-bold text-[11px] uppercase tracking-widest pb-1 border-b-2 block md:inline-block ${isActive
      ? 'text-cyan-400 border-cyan-400'
      : 'text-slate-400 border-transparent hover:text-white hover:border-slate-700'
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/5 relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition group" onClick={closeMenu}>
            <img src="/ponsri-logo.png" alt="Ponsri Enterprises" className="h-[30px] md:h-[36px] w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-all" />
          </Link>

          <button
            className="md:hidden text-slate-300 focus:outline-none p-1"
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

          <nav className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-full left-0 w-full md:w-auto bg-black md:bg-transparent shadow-2xl md:shadow-none border-t md:border-none border-white/5 z-50`}>
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
