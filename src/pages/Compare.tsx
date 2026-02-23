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
        <h1 className="text-4xl font-bold text-center mb-4">Compare Models</h1>
        <p className="text-center text-gray-600 mb-12">
          Select up to 3 models to compare side by side
        </p>

        {selectedProducts.length === 0 ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Select Products to Compare</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${isSelected(product.id)
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-300 hover:border-green-400 hover:shadow-sm'
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
                <h2 className="text-2xl font-bold">
                  Comparing {selectedProducts.length} Model{selectedProducts.length > 1 ? 's' : ''}
                </h2>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="text-blue-600 hover:underline"
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
              <table className="w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Feature</th>
                    {selectedProducts.map((product) => (
                      <th key={product.id} className="px-6 py-4 text-left font-bold">
                        {product.model_name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
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
                            className="text-center bg-green-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleWhatsApp(product.model_name)}
                            className="text-center bg-green-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
                          >
                            WhatsApp
                          </button>
                          <button
                            onClick={handlePhone}
                            className="text-center bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-green-800 transition-colors"
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
