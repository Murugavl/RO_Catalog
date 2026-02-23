import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data && data.length > 0 ? data : mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (modelName: string) => {
    const message = encodeURIComponent(`Hi 😊 I was checking your ${modelName} model.\nCan you share more details and installation information?`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const handlePhone = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleEmail = (modelName: string) => {
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=Inquiry about ${modelName}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6 text-slate-800">Our Premium Collection</h1>
        <p className="text-center text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
          Explore our range of advanced water purification systems designed for maximum health and safety.
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.model_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{product.model_name}</h3>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Price:</span>
                      <span className="font-bold text-green-600 text-lg">₹{product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Technology:</span>
                      <span className="font-semibold text-gray-800">{product.technology_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Capacity:</span>
                      <span className="font-semibold text-gray-800">{product.capacity}</span>
                    </div>
                  </div>

                  <Link
                    to={`/models/${product.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl mb-4 hover:bg-blue-700 transition-colors duration-300 font-bold shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleWhatsApp(product.model_name)}
                      className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-xs font-semibold transform hover:scale-105"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={handlePhone}
                      className="bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-all duration-300 text-xs font-semibold transform hover:scale-105"
                    >
                      Call
                    </button>
                    <button
                      onClick={() => handleEmail(product.model_name)}
                      className="bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 text-xs font-semibold transform hover:scale-105"
                    >
                      Email
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
