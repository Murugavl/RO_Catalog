import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        className="py-32 md:py-40 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-water-bg.jpg')" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))' }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up text-blue-950 drop-shadow-sm">
            Advanced RO Water Purifiers for Safer, Healthier Homes
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-900 font-medium leading-snug animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
            High-quality purification systems with warranty, expert installation, and reliable support.
          </p>
          <Link
            to="/models"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.03] text-lg group animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            Explore Our Models
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-slate-800">Why Choose Our RO Purifiers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Technology</h3>
              <p className="text-gray-600">
                State-of-the-art RO, UV, and UF purification technology for superior water quality.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Health & Safety First</h3>
              <p className="text-gray-600">
                Removes up to 99.9% of harmful contaminants, ensuring every drop is safe for your family.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Dedicated customer support and professional installation services available.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
