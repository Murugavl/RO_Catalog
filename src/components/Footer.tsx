import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-6 mt-auto border-t-[3px] border-[#128C7E]">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4">

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-[#128C7E] transition-colors">Home</Link>
          <Link to="/models" className="hover:text-[#128C7E] transition-colors">Models</Link>
          <Link to="/compare" className="hover:text-[#128C7E] transition-colors">Compare</Link>
          <Link to="/contact" className="hover:text-[#128C7E] transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-3 text-sm text-slate-400">
          <a href="tel:+919597794387" className="hover:text-white transition-colors flex items-center gap-2">
            <span className="text-[#128C7E]">📱</span> +91 95977 94387
          </a>
          <a href="mailto:ponsrienterprises@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
            <span className="text-[#128C7E]">✉️</span> ponsrienterprises@gmail.com
          </a>
        </div>

        <div className="pt-2 text-slate-500 text-xs w-full">
          <p>&copy; {new Date().getFullYear()} Ponsri Enterprises. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
