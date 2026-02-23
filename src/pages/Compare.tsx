import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { CONTACT_INFO } from '../components/ContactButtons';
import { mockProducts } from '../data/mockProducts';

export default function Compare() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
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
        .order('model_name');

      if (error) throw error;
      setProducts(data && data.length > 0 ? data : mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const isSelected = (productId: string) => {
    return selectedProducts.some(p => p.id === productId);
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
        <h1 className="text-5xl font-bold text-center mb-6 text-slate-800">Compare Models</h1>
        <p className="text-center text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Select up to 3 models to compare side by side and find the perfect match for you.
        </p>

        {selectedProducts.length === 0 ? (
          <div className="mb-12">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-10 flex flex-col items-center text-center max-w-3xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Build Your Comparison</h2>
              <p className="text-slate-600 text-lg">Select up to 3 models from the list below to compare features side by side.</p>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-slate-800">Available Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 shadow-sm hover:shadow-md ${isSelected(product.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-400 bg-white'
                    }`}
                >
                  <div className="font-semibold mb-2 text-gray-900">{product.model_name}</div>
                  <div className="text-sm text-gray-600">₹{product.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{product.technology_type}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-slate-800">
                  Comparing {selectedProducts.length} Model{selectedProducts.length > 1 ? 's' : ''}
                </h2>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="text-white bg-slate-800 hover:bg-slate-700 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Clear Selection
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    disabled={!isSelected(product.id) && selectedProducts.length >= 3}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${isSelected(product.id)
                      ? 'bg-green-600 text-white shadow-md'
                      : selectedProducts.length >= 3
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {product.model_name}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full bg-white divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold text-slate-700 tracking-wider">Feature</th>
                    {selectedProducts.map((product) => (
                      <th key={product.id} className="px-6 py-5 text-left font-bold text-slate-800 text-lg">
                        {product.model_name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Image</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.model_name}
                            className="w-32 h-32 object-cover rounded"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Price</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-green-600 font-bold text-lg">
                        ₹{product.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Technology</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4">
                        {product.technology_type}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Capacity</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4">
                        {product.capacity}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Warranty</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4">
                        {product.warranty}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Description</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-sm">
                        {product.description || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-4 font-semibold bg-gray-50">Actions</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/models/${product.id}`}
                            className="text-center bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleWhatsApp(product.model_name)}
                            className="text-center bg-[#25D366] text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-[#128C7E] transition-colors"
                          >
                            WhatsApp
                          </button>
                          <button
                            onClick={handlePhone}
                            className="text-center bg-blue-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Call
                          </button>
                          <button
                            onClick={() => handleEmail(product.model_name)}
                            className="text-center bg-slate-700 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                          >
                            Email
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
