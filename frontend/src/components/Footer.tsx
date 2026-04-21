import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-slate-200 py-10 mt-auto border-t border-blue-800">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">
        
        <div className="flex flex-col items-center">
          <div className="bg-white p-2 rounded-lg mb-4">
            <img src="/ponsri-logo.png" alt="Ponsri Enterprises" className="h-[40px] w-auto" />
          </div>
          <p className="text-blue-100 max-w-md text-sm">
            Providing high-quality RO water purification systems and expert service to Rajapalayam and surroundings since 2010.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm font-semibold text-blue-100/80">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <Link to="/models" className="hover:text-emerald-400 transition-colors">Models</Link>
          <Link to="/compare" className="hover:text-emerald-400 transition-colors">Compare</Link>
          <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-4 text-sm font-medium">
          <a href="tel:+919597794387" className="bg-blue-900/50 hover:bg-blue-800/50 border border-blue-700/50 px-4 py-2 rounded-full text-white transition-colors flex items-center gap-3">
            <span className="text-emerald-400">📱</span> +91 95977 94387
          </a>
          <a href="mailto:ponsrienterprises@gmail.com" className="bg-blue-900/50 hover:bg-blue-800/50 border border-blue-700/50 px-4 py-2 rounded-full text-white transition-colors flex items-center gap-3">
            <span className="text-emerald-400">✉️</span> ponsrienterprises@gmail.com
          </a>
        </div>

        <div className="pt-8 border-t border-blue-800/50 text-slate-400 text-xs w-full">
          <p>&copy; {new Date().getFullYear()} Ponsri Enterprises. All rights reserved.</p>
          <p className="mt-1">RO Machine & Mineral Water Machine Dealer in Rajapalayam</p>
        </div>

      </div>
    </footer>
  );
}
