import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import ProductForm from '../../components/admin/ProductForm';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadProducts();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
  };

  const loadProducts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/admin/models', {
        headers: getAuthHeaders()
      });
      if (res.status === 401) {
        navigate('/admin/login');
        return;
      }
      const data = await res.json();
      setProducts(data.models || []);
      setFilteredProducts(data.models || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/admin/models/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete');
      }
      loadProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      alert(error.message || 'Failed to delete product');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
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
    <div className="min-h-screen flex text-gray-900 bg-gray-50">

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col hidden md:flex min-h-screen shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Ponsri Enterprises</h2>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold mb-2">
            📦 Dashboard
          </button>
          <button onClick={handleAddProduct} className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-800 transition">
            ➕ Add Model
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-800 transition text-slate-400 cursor-not-allowed hidden">
            📋 View Models
          </button>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-bold">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Ponsri Enterprises</h2>
          <button onClick={handleLogout} className="text-red-500 font-bold px-3 py-1 border border-red-500 rounded">Logout</button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Products Management</h2>
              <button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all duration-300 font-bold transform hover:scale-105"
              >
                + Add New Model
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search models by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 pt-10 pb-10 overflow-y-auto">
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-full overflow-y-auto shadow-2xl relative">
                  <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b px-8 py-5 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-slate-800">
                      {editingProduct ? 'Edit Model' : 'Add New Model'}
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-red-500 text-3xl font-light transition"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-8">
                    <ProductForm
                      initialData={editingProduct}
                      onSuccess={handleFormSuccess}
                      onCancel={() => setShowForm(false)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thumbnail</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Brand</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://127.0.0.1:5000${product.imageUrl}`}
                              alt={product.name}
                              className="h-16 w-16 object-cover rounded-xl shadow-sm"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center text-xs text-slate-400">
                              No Img
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-slate-800">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-slate-600">{product.brand}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold text-emerald-600">₹{product.price?.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-500 hover:text-blue-700 font-bold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 text-slate-500 bg-slate-50/50">
                  <div className="text-4xl mb-3">📭</div>
                  {searchTerm ? 'No models matching your search.' : 'No models found. Add your first model to get started.'}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
