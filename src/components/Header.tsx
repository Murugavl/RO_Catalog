import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition group">
            <img src="/ponsri-logo.png" alt="Ponsri Enterprises" className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">Ponsri</span>
            </div>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/models" className="text-gray-700 hover:text-blue-600 transition">
                  Models
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-700 hover:text-blue-600 transition">
                  Compare
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
