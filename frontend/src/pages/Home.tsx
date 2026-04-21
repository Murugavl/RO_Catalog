import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        className="py-24 md:py-36 lg:py-52 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-water-bg.jpg')" }}
      >
        {/* Dark high-contrast overlay */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px] z-0"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 transition-all">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight animate-fade-in-up text-white [text-shadow:_0_1px_20px_rgba(0,0,0,0.5)]">
            Best RO Water Purifier <br className="hidden md:block" /> Dealer in Rajapalayam
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-slate-300 font-medium animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Premium RO machines and mineral water systems with <br className="hidden md:block" /> expert installation and service across Rajapalayam.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <Link
              to="/models"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-full font-extrabold shadow-xl shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 text-xl group"
            >
              Explore Our Models
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-white">Why Choose Our RO Purifiers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-cyan-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Advanced Technology</h3>
              <p className="text-slate-400 leading-relaxed">
                State-of-the-art RO, UV, and UF purification technology for superior water quality.
              </p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-cyan-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Health & Safety First</h3>
              <p className="text-slate-400 leading-relaxed">
                Removes up to 99.9% of harmful contaminants, ensuring every drop is safe for your family.
              </p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="bg-cyan-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Expert Support</h3>
              <p className="text-slate-400 leading-relaxed">
                Dedicated customer support and professional installation services available.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
