import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f0f7ff] border-t border-blue-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-start mb-6">
          
          {/* Left Side - Simplified Pages Column */}
          <div className="flex flex-col space-y-1">
            <Link to="/" className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">HOME</Link>
            <Link to="/contact" className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">CONTACT</Link>
          </div>

          {/* Right Side - Contact Column */}
          <div className="flex flex-col space-y-1 text-right">
            <a href="tel:+919597794387" className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors">+91 95977 94387</a>
            <a href="mailto:ponsrienterprises@gmail.com" className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors px-1">ponsrienterprises@gmail.com</a>
          </div>
        </div>

        <div className="border-t border-blue-100 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">&copy; {new Date().getFullYear()} Ponsri Enterprises</p>
          <p className="text-[10px] text-blue-600/60 font-black tracking-widest uppercase">Designed by MURUGAVEL V</p>
        </div>
      </div>
    </footer>
  );
}
