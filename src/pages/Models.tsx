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
        <h1 className="text-4xl font-bold text-center mb-4">Our RO Purifier Models</h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our range of water purification systems
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100">
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

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{product.model_name}</h3>

                  <div className="space-y-2 mb-5">
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
                    className="block w-full text-center bg-green-600 text-white py-2.5 rounded-lg mb-3 hover:bg-green-700 transition-colors duration-300 font-semibold"
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
