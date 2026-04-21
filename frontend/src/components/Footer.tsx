import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-y-3">
        
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/models" className="hover:text-cyan-400 transition-colors">Models</Link>
          <Link to="/compare" className="hover:text-cyan-400 transition-colors">Compare</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-500">
          <a href="tel:+919597794387" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
            <span className="text-cyan-500/50">📱</span> +91 95977 94387
          </a>
          <a href="mailto:ponsrienterprises@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
            <span className="text-cyan-500/50">✉️</span> ponsrienterprises@gmail.com
          </a>
          <span className="hidden md:inline text-slate-800">|</span>
          <span className="text-[10px] text-slate-600">&copy; {new Date().getFullYear()} Ponsri Enterprises</span>
        </div>

      </div>
    </footer>
  );
}
