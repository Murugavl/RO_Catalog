import { useState } from 'react';
import { ProductFormData, Product } from '../../types';

interface ProductFormProps {
  initialData?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const InputField = ({ label, value, onChange, required = false, type = 'text', placeholder = '' }: any) => (
  <div className="mb-4">
    <label className="block text-slate-700 font-semibold mb-2">{label} {required && '*'}</label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      placeholder={placeholder}
    />
  </div>
);

export default function ProductForm({ initialData, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    price: initialData?.price?.toString() || '',
    technologyType: initialData?.technologyType || 'RO',
    capacity: initialData?.capacity || '',
    warranty: initialData?.warranty || '',
    purificationStages: initialData?.purificationStages || '',
    energyConsumption: initialData?.energyConsumption || '',
    colorVariant: initialData?.colorVariant || '',
    dimensions: initialData?.dimensions || '',
    weight: initialData?.weight || '',
    tags: initialData?.tags?.join(', ') || '',
    image: null
  });

  const [preview, setPreview] = useState<string | null>(initialData?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const isEditing = !!initialData;
      if (!isEditing && !formData.image) {
        throw new Error("Please select an image");
      }

      const postData = new FormData();
      postData.append('name', formData.name);
      postData.append('brand', formData.brand);
      postData.append('price', formData.price);
      postData.append('technologyType', formData.technologyType);
      postData.append('capacity', formData.capacity);
      postData.append('warranty', formData.warranty);
      postData.append('purificationStages', formData.purificationStages);
      postData.append('energyConsumption', formData.energyConsumption);
      postData.append('colorVariant', formData.colorVariant);
      postData.append('dimensions', formData.dimensions);
      postData.append('weight', formData.weight);
      postData.append('tags', formData.tags);
      if (formData.image) {
        postData.append('image', formData.image);
      }

      const token = localStorage.getItem('adminToken');
      const url = isEditing
        ? `http://127.0.0.1:5000/api/admin/models/${initialData.id}`
        : 'http://127.0.0.1:5000/api/admin/models';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: postData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save product');
      }

      setSuccessMsg(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
      setTimeout(() => onSuccess(), 1000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-xl font-medium">
          ✅ {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="Model Name" value={formData.name} onChange={(v: string) => handleInputChange('name', v)} required placeholder="e.g., AquaPure Pro" />
        <InputField label="Brand Name" value={formData.brand} onChange={(v: string) => handleInputChange('brand', v)} placeholder="e.g., Kent" />
        <InputField label="Price (₹)" value={formData.price} onChange={(v: string) => handleInputChange('price', v)} required type="number" placeholder="20000" />
        <InputField label="Capacity" value={formData.capacity} onChange={(v: string) => handleInputChange('capacity', v)} placeholder="e.g., 7L" />

        <div className="mb-4">
          <label className="block text-slate-700 font-semibold mb-2">Technology Type *</label>
          <select
            value={formData.technologyType}
            onChange={(e) => handleInputChange('technologyType', e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="RO">RO</option>
            <option value="RO+UV">RO+UV</option>
            <option value="RO+UV+UF+TDS">RO+UV+UF+TDS</option>
            <option value="UV">UV</option>
            <option value="UF">UF</option>
          </select>
        </div>

        <InputField label="Warranty" value={formData.warranty} onChange={(v: string) => handleInputChange('warranty', v)} placeholder="e.g., 1 Year" />
        <InputField label="Purification Stages" value={formData.purificationStages} onChange={(v: string) => handleInputChange('purificationStages', v)} placeholder="e.g., 7 Stages" />
        <InputField label="Energy Consumption" value={formData.energyConsumption} onChange={(v: string) => handleInputChange('energyConsumption', v)} placeholder="e.g., 60W" />
        <InputField label="Color Variant" value={formData.colorVariant} onChange={(v: string) => handleInputChange('colorVariant', v)} placeholder="e.g., Premium Black" />
        <InputField label="Dimensions" value={formData.dimensions} onChange={(v: string) => handleInputChange('dimensions', v)} placeholder="L x W x H" />
        <InputField label="Weight" value={formData.weight} onChange={(v: string) => handleInputChange('weight', v)} placeholder="e.g., 8.5 kg" />
        <InputField label="Tags (comma separated)" value={formData.tags} onChange={(v: string) => handleInputChange('tags', v)} placeholder="premium, hot-water, smart" />
      </div>

      {/* Image Upload Area */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {preview ? (
          <div className="text-center pointer-events-none">
            <img src={preview.startsWith('http') ? preview : `http://127.0.0.1:5000${preview}`} alt="Preview" className="h-40 object-contain mx-auto rounded shadow-sm mb-3" />
            <p className="text-sm font-semibold text-blue-600">Click to change image</p>
          </div>
        ) : (
          <div className="text-center pointer-events-none">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <h3 className="font-semibold text-slate-700">Upload Product Image</h3>
            <p className="text-sm text-slate-500 mt-1">PNG, JPG, WEBP formats allowed.</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-white border border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 rounded-xl hover:shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] transition-all font-bold disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : initialData ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
