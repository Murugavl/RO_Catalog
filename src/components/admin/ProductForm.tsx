import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Product, ProductFormData } from '../../types';

interface ProductFormProps {
  product: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    model_name: '',
    price: 0,
    technology_type: 'RO',
    capacity: '',
    warranty: '',
    description: '',
    specifications: {},
    image_url: '',
    gallery_images: [],
    is_active: true,
  });
  const [specsInput, setSpecsInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        model_name: product.model_name,
        price: product.price,
        technology_type: product.technology_type,
        capacity: product.capacity,
        warranty: product.warranty,
        description: product.description,
        specifications: product.specifications,
        image_url: product.image_url,
        gallery_images: product.gallery_images,
        is_active: product.is_active,
      });
      setSpecsInput(JSON.stringify(product.specifications, null, 2));
      setGalleryInput(product.gallery_images.join('\n'));
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let specs = {};
      if (specsInput.trim()) {
        try {
          specs = JSON.parse(specsInput);
        } catch {
          throw new Error('Invalid JSON in specifications field');
        }
      }

      const gallery = galleryInput
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const dataToSave = {
        ...formData,
        specifications: specs,
        gallery_images: gallery,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(dataToSave)
          .eq('id', product.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([dataToSave]);

        if (error) throw error;
      }

      onSuccess();
    } catch (error: any) {
      setError(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Model Name *
          </label>
          <input
            type="text"
            value={formData.model_name}
            onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="e.g., AquaPure Pro 7000"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="e.g., 15000"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Technology Type *
          </label>
          <select
            value={formData.technology_type}
            onChange={(e) => setFormData({ ...formData, technology_type: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="RO">RO</option>
            <option value="RO+UV">RO+UV</option>
            <option value="RO+UV+UF">RO+UV+UF</option>
            <option value="UV">UV</option>
            <option value="UF">UF</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Capacity *
          </label>
          <input
            type="text"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="e.g., 7L, 10L"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Warranty *
          </label>
          <input
            type="text"
            value={formData.warranty}
            onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="e.g., 2 Years"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Status
          </label>
          <select
            value={formData.is_active ? 'active' : 'inactive'}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="active">Active (Visible to public)</option>
            <option value="inactive">Inactive (Hidden from public)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Primary Image URL
        </label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Gallery Images (one URL per line)
        </label>
        <textarea
          value={galleryInput}
          onChange={(e) => setGalleryInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Detailed product description..."
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Specifications (JSON format)
        </label>
        <textarea
          value={specsInput}
          onChange={(e) => setSpecsInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-sm"
          rows={8}
          placeholder='{"filter_type": "RO Membrane", "power": "24V", "purification_stages": "7"}'
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter specifications in JSON format. Example: {`{"feature": "value"}`}
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
