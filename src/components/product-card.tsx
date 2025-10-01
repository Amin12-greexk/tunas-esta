"use client";

import { useState } from "react";
import { ArrowRight, Info, Star, Package } from "lucide-react";

interface ProductCardProps {
  nama: string;
  deskripsi?: string;
  fotoUrl?: string;
  spesifikasi?: any;
}

export function ProductCard({ 
  nama, 
  deskripsi, 
  fotoUrl, 
  spesifikasi 
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        {fotoUrl && !imageError ? (
          <img
            src={fotoUrl}
            alt={nama}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Package className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-500 font-medium">Produk Sarang Walet</span>
            </div>
          </div>
        )}
        
        {/* Quality Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm text-green-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Premium
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
          {nama}
        </h3>

        {/* Description */}
        {deskripsi && (
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
            {deskripsi}
          </p>
        )}

        {/* Specifications Info */}
        {spesifikasi && spesifikasi.length > 0 && (
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Spesifikasi QC:</span>
            </div>
            <div className="text-xs text-green-600 space-y-1">
              {spesifikasi.slice(0, 3).map((spec: string, index: number) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>{spec}</span>
                </div>
              ))}
              {spesifikasi.length > 3 && (
                <div className="text-green-500 font-medium">
                  +{spesifikasi.length - 3} spesifikasi lainnya
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
            <span>Lihat Detail</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}