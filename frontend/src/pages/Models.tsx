import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { CONTACT_INFO } from '../components/ContactButtons';
import { mockProducts } from '../data/mockProducts';

export default function Models() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/models');
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
    const message = encodeURIComponent(`வணக்கம் 👋 நான் ${modelName} water purifier-ஐ வாங்க விரும்புகிறேன். இதைப் பற்றிய கூடுதல் விவரங்களைத் தர முடியுமா?`);
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
    <div className="min-h-screen py-8 md:py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-6 text-slate-800">Our Premium Collection</h1>
        <p className="text-center text-base md:text-lg text-slate-600 mb-10 md:mb-16 max-w-2xl mx-auto">
          Explore our range of advanced water purification systems designed for maximum health and safety.
        </p>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-3xl mx-auto px-6 text-center">
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
              className="bg-[#25D366] text-white px-8 py-3 rounded-xl hover:bg-[#128C7E] transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              WhatsApp Us
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col group">
                <div className="h-56 bg-white flex items-center justify-center p-6 border-b border-gray-50">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://127.0.0.1:5000${product.imageUrl}`}
                      alt={product.name}
                      className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{product.name}</h3>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-gray-500 text-sm">Price</span>
                      <span className="font-extrabold text-blue-600 text-xl">₹{product.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-gray-500 text-sm">Technology</span>
                      <span className="font-semibold text-gray-800">{product.technologyType || 'RO'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Capacity</span>
                      <span className="font-semibold text-gray-800">{product.capacity || '7L'}</span>
                    </div>
                  </div>

                  <Link
                    to={`/models/${product.id}`}
                    className="block w-full text-center bg-blue-50 text-blue-700 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-300 font-bold shadow-sm"
                  >
                    View Details
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
