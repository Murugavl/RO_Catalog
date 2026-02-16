import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <img src="/ponsri-logo.png" alt="Ponsri Enterprises" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-green-700">Ponsri Enterprises</span>
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
