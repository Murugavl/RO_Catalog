import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f0f7ff] border-t border-blue-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-start mb-10">
          
          {/* Left Side - Simplified Pages Column */}
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-sm font-bold hover:text-blue-600 transition-colors uppercase tracking-widest">HOME</Link>
            <Link to="/models" className="text-sm font-bold hover:text-blue-600 transition-colors uppercase tracking-widest">MODELS</Link>
            <Link to="/compare" className="text-sm font-bold hover:text-blue-600 transition-colors uppercase tracking-widest">COMPARE</Link>
            <Link to="/contact" className="text-sm font-bold hover:text-blue-600 transition-colors uppercase tracking-widest">CONTACT</Link>
          </div>

          {/* Right Side - Contact Column */}
          <div className="flex flex-col space-y-2 text-right">
            <a href="tel:+919597794387" className="text-sm font-bold hover:text-blue-600 transition-colors">+91 95977 94387</a>
            <a href="mailto:ponsrienterprises@gmail.com" className="text-sm font-bold hover:text-blue-600 transition-colors px-1">ponsrienterprises@gmail.com</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-bold text-blue-900 md:w-1/3 text-left">Designed by MURUGAVEL V</p>
          <p className="text-sm font-medium md:w-1/3 text-center uppercase tracking-widest">&copy; {new Date().getFullYear()} Ponsri Enterprises</p>
          <div className="md:w-1/3"></div> {/* Spacer for symmetry */}
        </div>
      </div>
    </footer>
  );
}
