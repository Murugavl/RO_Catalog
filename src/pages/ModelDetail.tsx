import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { CONTACT_INFO } from '../components/ContactButtons';
import { mockProducts } from '../data/mockProducts';

export default function ModelDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/models');
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      const productData = data.models?.find((p: Product) => p.id === id);

      setProduct(productData || mockProducts.find(p => p.id === id) || null);
      if (productData?.imageUrl) {
        setSelectedImage(productData.imageUrl.startsWith('http') ? productData.imageUrl : `http://127.0.0.1:5000${productData.imageUrl}`);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      const fallback = mockProducts.find(p => p.id === id);
      setProduct(fallback || null);
      if (fallback?.imageUrl) {
        setSelectedImage(fallback.imageUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const message = encodeURIComponent(`Hi 👋 I'm interested in the ${product.name} water purifier. Could you please share more details?`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl font-medium text-slate-500">Loading details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-2xl text-slate-600 mb-6 font-semibold">Model not found</p>
          <Link to="/models" className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-bold shadow-sm">
            ← Back to Models
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/models" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
            ← Back to Premium Collection
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Image Column */}
            <div className="p-8 lg:p-12 lg:border-r border-slate-100 bg-slate-50/50 flex flex-col justify-center">
              <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 p-8">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-auto object-contain max-h-[500px]"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center text-slate-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
              </div>
            </div>

            {/* Details Column */}
            <div className="p-8 lg:p-12">
              <div className="mb-8 border-b border-slate-100 pb-8">
                <span className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-2 block">{product.brand || 'Premium Brand'}</span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight leading-tight">{product.name}</h1>
                <div className="inline-block px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <span className="text-3xl font-bold">₹{product.price?.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Technology</span>
                  <span className="font-bold text-slate-800 text-lg">{product.technologyType || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Capacity</span>
                  <span className="font-bold text-slate-800 text-lg">{product.capacity || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Warranty</span>
                  <span className="font-bold text-slate-800 text-lg">{product.warranty || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Stages</span>
                  <span className="font-bold text-slate-800 text-lg">{product.purificationStages || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Energy Consumption</span>
                  <span className="font-bold text-slate-800 text-lg">{product.energyConsumption || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Color</span>
                  <span className="font-bold text-slate-800 text-lg">{product.colorVariant || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Dimensions</span>
                  <span className="font-bold text-slate-800 text-lg">{product.dimensions || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <span className="block text-sm text-slate-500 mb-1">Weight</span>
                  <span className="font-bold text-slate-800 text-lg">{product.weight || 'N/A'}</span>
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                <div className="text-center mb-6">
                  <h3 className="font-extrabold text-2xl text-slate-800 mb-2">Ready to Book?</h3>
                  <p className="text-slate-500">Fast installation and premium support included.</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#128C7E] transition-all duration-300 font-bold shadow-sm hover:shadow-md transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    WhatsApp Message
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
