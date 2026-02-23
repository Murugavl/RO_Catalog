import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 font-medium pb-1 border-b-2 ${isActive
      ? 'text-blue-600 border-blue-600'
      : 'text-slate-600 border-transparent hover:text-blue-500 hover:border-blue-300'
    }`;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm hover:shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-90 transition group">
            <img src="/ponsri-logo.png" alt="Ponsri Enterprises" className="h-[42px] w-auto transform group-hover:scale-105 transition-transform duration-300" />
          </Link>
          <nav>
            <ul className="flex items-center gap-7">
              <li>
                <NavLink to="/" className={getNavClass} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/models" className={getNavClass}>
                  Models
                </NavLink>
              </li>
              <li>
                <NavLink to="/compare" className={getNavClass}>
                  Compare
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavClass}>
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
