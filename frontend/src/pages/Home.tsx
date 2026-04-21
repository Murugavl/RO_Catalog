import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const reviews = [
  { name: 'Arun Kumar', rating: 5, text: 'Excellent service and water quality is top notch.' },
  { name: 'Priya S.', rating: 4, text: 'The installation was quick. The machine works perfectly for our borewell water.' },
  { name: 'Rajesh R.', rating: 5, text: 'Best RO dealer in Rajapalayam. Very professional support.' },
  { name: 'Meera G.', rating: 4, text: 'Good product, but the maintenance call took a bit of time. Overall happy.' },
  { name: 'Selvam T.', rating: 5, text: 'Highly recommended. The mineral water taste is amazing.' },
  { name: 'Anitha K.', rating: 5, text: 'Worth every penny. Safe water for my children.' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

  const getIdx = (offset: number) => (currentSlide + offset + reviews.length) % reviews.length;

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <section
        className="py-24 md:py-36 lg:py-48 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-water-bg.jpg')" }}
      >
        {/* Elegant water overlay */}
        <div className="absolute inset-0 bg-[#f0f7ff]/40 backdrop-blur-[1px] z-0"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 transition-all">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight text-blue-950">
            Premier RO Purifier <br className="hidden md:block" /> Solutions in Rajapalayam
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-blue-900 font-medium">
            Experience the gold standard in water purification. Trusted quality for healthier homes across the region.
          </p>
          <div>
            <Link
              to="/models"
              className="inline-flex items-center justify-center bg-blue-700 text-white px-12 py-4 rounded-full font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Explore Our Models
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-blue-950">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Advanced Technology', desc: 'State-of-the-art RO + UV + UF systems for pure water.', iconColor: 'bg-white text-blue-600' },
              { title: 'Health & Safety', desc: '99.9% filtration of contaminants for your family safety.', iconColor: 'bg-white text-blue-600' },
              { title: 'Expert Support', desc: 'Dedicated professional installation and 24/7 assistance.', iconColor: 'bg-white text-blue-600' }
            ].map((item, i) => (
              <div key={i} className="text-center p-10 bg-white/40 rounded-[2.5rem] shadow-sm border border-white/60 hover:shadow-xl transition-all duration-500">
                <div className={`${item.iconColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-2xl shadow-sm`}>
                  {i === 0 ? '🔬' : i === 1 ? '🛡️' : '👨‍🔧'}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-950">{item.title}</h3>
                <p className="text-blue-800/70 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Reviews Circular Carousel - Smaller Circles */}
      <section className="py-24 bg-white/30 relative group">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-blue-950 tracking-tight">What People Are Saying</h2>
          <p className="text-lg text-blue-800/60 mb-16 font-medium italic">Trusted by thousands of families in Rajapalayam.</p>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-0 top-[30%] -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-blue-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 z-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg></button>
            <button onClick={nextSlide} className="absolute right-0 top-[30%] -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-blue-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 z-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg></button>

            {/* Circular Profiles Row - Smaller w-28 and w-16 */}
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-10">
              {/* Prev User */}
              <div className="hidden md:flex w-16 h-16 rounded-full bg-blue-100 items-center justify-center text-xl font-bold text-blue-300 opacity-40 transform scale-90 transition-all shadow-inner">
                {reviews[getIdx(-1)].name.charAt(0)}
              </div>
              
              {/* Current User */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-600/20 relative p-1 shadow-xl transition-all duration-500 transform hover:scale-105">
                <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center text-4xl md:text-5xl font-serif font-black text-white border-2 border-white/20">
                  {reviews[getIdx(0)].name.charAt(0)}
                </div>
              </div>

              {/* Next User */}
              <div className="hidden md:flex w-16 h-16 rounded-full bg-blue-100 items-center justify-center text-xl font-bold text-blue-300 opacity-40 transform scale-90 transition-all shadow-inner">
                {reviews[getIdx(1)].name.charAt(0)}
              </div>
            </div>

            {/* Content Section */}
            <div className="max-w-2xl mx-auto">
              {/* Stars - Cyan/Blue themed */}
              <div className="flex justify-center gap-1 mb-6 text-blue-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < reviews[getIdx(0)].rating ? 'fill-current' : 'text-blue-100'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>

              <div className="min-h-[140px]">
                <p className="text-xl md:text-2xl text-blue-900/80 italic font-serif leading-relaxed mb-6 transition-all duration-700">
                  "{reviews[getIdx(0)].text}"
                </p>
                <div className="h-[2px] w-8 bg-blue-400 mx-auto mb-4"></div>
                <h4 className="text-base font-black text-blue-800 tracking-[0.2em] uppercase">
                   {reviews[getIdx(0)].name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
