export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Ponsri Enterprises</h3>
            <p className="text-slate-400 leading-relaxed">
              Premium water purification systems with expert installation and reliable support for a healthier home.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="/" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="/models" className="hover:text-cyan-400 transition-colors">Models</a></li>
              <li><a href="/compare" className="hover:text-cyan-400 transition-colors">Compare</a></li>
              <li><a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center space-x-2"><span className="text-cyan-500">📱</span> <span>+91 95977 94387</span></li>
              <li className="flex items-center space-x-2"><span className="text-cyan-500">✉️</span> <span>ponsrienterprises@gmail.com</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Ponsri Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
