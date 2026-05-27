import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f0f7ff] border-t border-blue-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-blue-900 md:w-1/3 text-center md:text-left">
            Developed By MURUGAVEL V
          </p>
          <p className="text-sm font-medium md:w-1/3 text-center uppercase tracking-widest text-slate-600">
            &copy; {new Date().getFullYear()} Ponsri Enterprises
          </p>
          <div className="flex flex-col md:flex-row items-center md:justify-end gap-2 md:gap-4 md:w-1/3 text-center md:text-right">
            <a href="tel:+919597794387" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              +91 95977 94387
            </a>
            <span className="hidden md:inline text-slate-300">|</span>
            <a href="mailto:ponsrienterprises@gmail.com" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              ponsrienterprises@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
