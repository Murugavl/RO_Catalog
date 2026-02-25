import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

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
      const response = await fetch('http://127.0.0.1:5000/api/models');
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setProducts(data.models && data.models.length > 0 ? data.models : mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts(mockProducts);
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
                  className={`p-4 border-2 rounded-2xl text-left transition-all duration-300 shadow-sm hover:shadow-md flex flex-col h-full ${isSelected(product.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-400 bg-white'
                    }`}
                >
                  <div className="w-full aspect-square bg-white rounded-xl mb-4 flex items-center justify-center p-2 border border-slate-100 overflow-hidden shadow-sm">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://127.0.0.1:5000${product.imageUrl}`}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-slate-400 text-sm">No Image</span>
                    )}
                  </div>
                  <div className="font-semibold mb-1 text-gray-900 line-clamp-2 leading-snug">{product.name}</div>
                  <div className="text-sm font-bold text-emerald-600 mt-auto pt-2">₹{product.price?.toLocaleString()}</div>
                  <div className="text-xs text-slate-500 mt-1">{product.technologyType}</div>
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
                      ? 'bg-emerald-600 text-white shadow-md'
                      : selectedProducts.length >= 3
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm mb-12 relative w-full" style={{ maxWidth: "100vw" }}>
              <div className="min-w-max md:min-w-full inline-block align-middle">
                <table className="w-full text-left bg-white divide-y divide-slate-200 table-fixed">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-5 font-bold text-slate-700 tracking-wider w-40 md:w-1/4">Feature</th>
                      {selectedProducts.map((product) => (
                        <th key={product.id} className="px-6 py-5 font-bold text-slate-800 text-lg w-64 md:w-1/4">
                          <div className="line-clamp-2">{product.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Image</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://127.0.0.1:5000${product.imageUrl}`}
                              alt={product.name}
                              className="w-32 h-32 object-contain rounded"
                            />
                          ) : (
                            <div className="w-32 h-32 bg-gray-50 border border-slate-100 rounded flex items-center justify-center text-slate-400 text-sm">
                              No Image
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Price</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-emerald-600 font-bold text-lg">
                          ₹{product.price?.toLocaleString()}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Technology</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.technologyType || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Capacity</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.capacity || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Warranty</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.warranty || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Purification Stages</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.purificationStages || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Energy Consumption</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.energyConsumption || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Dimensions</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.dimensions || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Weight</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4 text-slate-700">
                          {product.weight || 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t">
                      <td className="px-6 py-4 font-semibold bg-gray-50/50 text-slate-600">Actions</td>
                      {selectedProducts.map((product) => (
                        <td key={product.id} className="px-6 py-4">
                          <Link
                            to={`/models/${product.id}`}
                            className="block text-center bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            View Details
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
