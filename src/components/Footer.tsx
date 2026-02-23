import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-6 mt-auto border-t-[3px] border-[#128C7E]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between pb-6 gap-6 lg:gap-0">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#128C7E] to-cyan-400">Ponsri Enterprises</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto lg:mx-0">
              Premium water purification systems for a healthier home.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-400">
            <Link to="/" className="hover:text-white hover:underline transition-colors">Home</Link>
            <Link to="/models" className="hover:text-white hover:underline transition-colors">Models</Link>
            <Link to="/compare" className="hover:text-white hover:underline transition-colors">Compare</Link>
            <Link to="/contact" className="hover:text-white hover:underline transition-colors">Contact</Link>
            <a href="tel:+919597794387" className="hover:text-white hover:underline transition-colors">+91 95977 94387</a>
            <a href="mailto:ponsrienterprises@gmail.com" className="hover:text-white hover:underline transition-colors">ponsrienterprises@gmail.com</a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Ponsri Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
