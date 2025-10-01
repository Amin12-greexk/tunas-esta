"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Award, Shield, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  specifications?: any;
  features?: string[];
  slug?: {
    current: string;
  };
}

interface ProductShowcaseProps {
  products?: Product[];
}

export function ProductShowcase({ products = [] }: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fallback products jika Sanity kosong
  const fallbackProducts = [
    {
      _id: "1",
      title: "Sarang Walet Premium",
      description: "Sarang walet berkualitas tinggi dengan bentuk utuh dan warna putih alami, cocok untuk konsumsi premium dan ekspor internasional",
      category: "Premium",
      features: ["Bentuk Utuh", "Bersih & Higienis", "Kualitas Ekspor", "Nutrisi Tinggi"],
      slug: { current: "sarang-walet-premium" }
    },
    {
      _id: "2", 
      title: "Sarang Walet Standard",
      description: "Sarang walet dengan kualitas baik untuk konsumsi sehari-hari, memberikan manfaat kesehatan optimal dengan harga terjangkau",
      category: "Standard",
      features: ["Kualitas Terjamin", "Harga Terjangkau", "Mudah Diolah", "Bergizi Tinggi"],
      slug: { current: "sarang-walet-standard" }
    },
    {
      _id: "3",
      title: "Sarang Walet Olahan",
      description: "Produk sarang walet yang telah diolah dan siap konsumsi, praktis dan mudah disajikan untuk kebutuhan sehari-hari",
      category: "Ready to Consume",
      features: ["Siap Konsumsi", "Praktis", "Higienis", "Tahan Lama"],
      slug: { current: "sarang-walet-olahan" }
    },
    {
      _id: "4",
      title: "Sarang Walet Bubuk",
      description: "Sarang walet dalam bentuk bubuk halus yang mudah larut, ideal untuk campuran minuman dan suplemen kesehatan",
      category: "Powder",
      features: ["Mudah Larut", "Praktis", "Konsentrasi Tinggi", "Serbaguna"],
      slug: { current: "sarang-walet-bubuk" }
    }
  ];

  const displayProducts = products?.length > 0 ? products : fallbackProducts;

  const certifications = [
    { icon: Shield, name: "HACCP", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Award, name: "Halal MUI", color: "text-green-600", bg: "bg-green-50" },
    { icon: Star, name: "BPOM RI", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Sparkles, name: "ISO 22000", color: "text-orange-600", bg: "bg-orange-50" }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-white via-gray-50 to-green-50 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ 
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)` 
        }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ 
          transform: `translate(${scrollY * -0.08}px, ${scrollY * -0.1}px)` 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            Produk Unggulan Kami
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Produk Sarang Walet
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Berkualitas Premium
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Berbagai varian produk sarang walet berkualitas tinggi untuk memenuhi kebutuhan 
            konsumen domestik dan pasar ekspor internasional
          </p>
        </div>

        {/* Certifications Showcase */}
        <div 
          className={`flex flex-wrap justify-center items-center gap-6 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-lg text-gray-600 font-semibold mr-4">Tersertifikasi:</div>
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 ${cert.bg} rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105`}
            >
              <cert.icon className={`w-6 h-6 ${cert.color}`} />
              <span className="text-sm font-bold text-gray-700">{cert.name}</span>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayProducts.slice(0, 6).map((product, index) => (
            <div
              key={product._id}
              className={`group transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ 
                transitionDelay: `${500 + index * 150}ms`,
                transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`
              }}
            >
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3 border border-gray-100 h-full flex flex-col">
                {/* Product Header */}
                <div className="relative h-24 bg-gradient-to-br from-green-500 via-green-600 to-blue-600 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-gray-700">Premium Quality</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-semibold text-white">
                        {product.category || "Product"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
                </div>

                {/* Product Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                    {product.description || "Produk sarang walet berkualitas premium dengan standar internasional."}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.features.slice(0, 4).map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300">
                      Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div 
          className={`text-center transition-all duration-1000 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-green-500 via-green-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Tertarik dengan Produk Kami?
              </h3>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Dapatkan informasi lengkap tentang produk, harga, dan ketersediaan stok. 
                Tim kami siap membantu Anda menemukan produk yang tepat sesuai kebutuhan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-green-600 hover:bg-gray-50 font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                  <span>Hubungi Sales</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-xl transition-all duration-300 border border-white/30">
                  Download Katalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}