"use client";

import { useState, useEffect } from "react";
import { X, Star, Package, Info, CheckCircle, Phone, Mail, Download } from "lucide-react";

interface Product {
  _id: string;
  nama: string;
  deskripsi?: string;
  fotoUrl?: string;
  spesifikasi?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Modal Content */}
        <div className="grid lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative h-64 lg:h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {product.fotoUrl && !imageError ? (
              <img
                src={product.fotoUrl}
                alt={product.nama}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Package className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-lg text-gray-500 font-medium">Produk Sarang Walet</span>
                </div>
              </div>
            )}
            
            {/* Quality Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm text-green-600 text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                Premium Quality
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 overflow-y-auto">
            {/* Product Name */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {product.nama}
            </h2>

            {/* Description */}
            {product.deskripsi && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.deskripsi}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.spesifikasi && product.spesifikasi.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-green-600" />
                  Spesifikasi Quality Control
                </h3>
                <div className="bg-green-50 rounded-2xl p-6">
                  <div className="grid gap-3">
                    {product.spesifikasi.map((spec: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Tertarik dengan Produk Ini?
                </h4>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Hubungi Sales</span>
                  </button>
                  <button className="flex-1 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Inquiry</span>
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