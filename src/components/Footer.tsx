import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-10 mt-auto border-t-[3px] border-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Ponsri Enterprises</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Premium water purification systems with expert installation and reliable support for a healthier home.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/models" className="hover:text-white transition-colors">Models</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center space-x-2"><span className="text-blue-400">📱</span> <span>+91 95977 94387</span></li>
              <li className="flex items-center space-x-2"><span className="text-blue-400">✉️</span> <span>ponsrienterprises@gmail.com</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ponsri Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
