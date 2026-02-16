import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';
import ProductForm from '../../components/admin/ProductForm';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadProducts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.model_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !product.is_active })
        .eq('id', product.id);

      if (error) throw error;
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product status');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Ponsri Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">Products Management</h2>
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold transform hover:scale-105"
          >
            + Add New Product
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products by model name..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <ProductForm
                  product={editingProduct}
                  onSuccess={handleFormSuccess}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-50 to-green-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Model Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Technology
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.model_name}
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{product.model_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{product.technology_type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{product.capacity}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleToggleActive(product)}
                      className={`px-3 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        product.is_active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {product.is_active ? '✓ Active' : '✕ Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-green-600 hover:text-green-800 font-semibold mr-4 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              {searchTerm ? 'No products matching your search.' : 'No products found. Add your first product to get started.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
