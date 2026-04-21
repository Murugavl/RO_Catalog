import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { CONTACT_INFO } from '../components/ContactButtons';
import { mockProducts } from '../data/mockProducts';
import { API_URL } from '../config';

export default function Models() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/models`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setProducts(data.models && data.models.length > 0 ? data.models : mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (modelName: string) => {
    const message = encodeURIComponent(`வணக்கம் நான் ${modelName} water purifier-ஐ வாங்க விரும்புகிறேன். இதைப் பற்றிய கூடுதல் விவரங்களைத் தர முடியுமா?`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-blue-900 heading-font">Premium RO Machines in Rajapalayam</h1>
        <p className="text-center text-sm md:text-base text-blue-800 mb-10 md:mb-16 max-w-2xl mx-auto">
          Explore our range of advanced water purification systems designed for maximum health and safety.
        </p>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-3xl mx-auto px-6 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">We're updating our latest models.</h3>
            <p className="text-slate-500 mb-8 max-w-lg">
              Contact us directly for available stock and pricing.
            </p>
            <button
              onClick={() => handleWhatsApp('General Inquiry')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20"
            >
              WhatsApp Us
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col group">
                <div className="h-64 bg-white flex items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl.startsWith('http') ? product.imageUrl : `${API_URL}${product.imageUrl}`}
                      alt={product.name}
                      className="h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10"
                    />
                  ) : (
                    <div className="text-gray-300">No Image Available</div>
                  )}
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-extrabold mb-5 text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{product.name}</h3>

                  <div className="space-y-4 mb-10 flex-grow">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-500 font-medium tracking-wide">PRICE</span>
                      <span className="font-black text-blue-600 text-2xl">₹{product.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-500 font-medium tracking-wide">SYSTEM</span>
                      <span className="font-bold text-slate-800 uppercase text-sm">{product.technologyType || 'RO+UV+UF'}</span>
                    </div>
                  </div>

                  <Link
                    to={`/models/${product.id}`}
                    className="block w-full text-center bg-slate-900 text-white py-4 rounded-2xl hover:bg-blue-600 transition-all duration-300 font-black tracking-widest text-xs uppercase shadow-md active:scale-95"
                  >
                    View Specifications
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
