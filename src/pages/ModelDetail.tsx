import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      const productData = data || mockProducts.find(p => p.id === id);
      setProduct(productData || null);
      if (productData?.image_url) {
        setSelectedImage(productData.image_url);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const message = encodeURIComponent(`Hi 😊 I was checking your ${product.model_name} model.\nCan you share more details and installation information?`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const handlePhone = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleEmail = () => {
    if (!product) return;
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=Inquiry about ${product.model_name}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <Link to="/models" className="text-blue-600 hover:underline">
            Back to Models
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.image_url, ...product.gallery_images].filter(Boolean);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/models" className="text-blue-600 hover:text-blue-800 font-medium hover:underline mb-8 inline-block transition-colors">
          &larr; Back to Premium Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.model_name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`border-2 rounded overflow-hidden ${selectedImage === img ? 'border-blue-600' : 'border-gray-300'
                      }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">{product.model_name}</h1>
            <div className="text-3xl font-bold text-blue-600 mb-8 bg-blue-50 inline-block px-4 py-2 rounded-xl">
              ₹{product.price.toLocaleString()}
            </div>

            <div className="space-y-4 mb-10 text-lg">
              <div className="flex items-center">
                <span className="text-slate-500 w-32 font-medium">Technology:</span>
                <span className="font-semibold text-slate-800">{product.technology_type}</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-500 w-32 font-medium">Capacity:</span>
                <span className="font-semibold text-slate-800">{product.capacity}</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-500 w-32 font-medium">Warranty:</span>
                <span className="font-semibold text-slate-800">{product.warranty}</span>
              </div>
            </div>

            {product.description && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Description</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Specifications</h2>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                      <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="font-semibold text-slate-800">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-xl text-slate-800">Ready to Buy?</h3>
              <p className="text-slate-500 text-sm mb-4">Contact our support team for installation and details.</p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl hover:bg-[#128C7E] transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                WhatsApp Inquiry
              </button>
              <button
                onClick={handlePhone}
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Call Now
              </button>
              <button
                onClick={handleEmail}
                className="w-full bg-slate-800 text-white py-4 rounded-xl hover:bg-slate-900 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
