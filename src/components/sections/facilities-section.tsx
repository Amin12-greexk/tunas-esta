"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Factory, Zap, Shield, Truck, Users, Award, ArrowRight, Play } from "lucide-react";

export function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const facilities = [
    {
      icon: Factory,
      title: "Pabrik Produksi Modern",
      description: "Fasilitas produksi seluas 5,000 m² dengan teknologi terdepan",
      details: [
        "Kapasitas produksi 500+ ton/tahun",
        "Area produksi ber-AC dengan kontrol suhu",
        "Sistem pengolahan air bersih",
        "Line produksi otomatis"
      ],
      image: "/api/placeholder/600/400",
      stats: { value: "5,000", unit: "m²", label: "Luas Pabrik" }
    },
    {
      icon: Shield,
      title: "Laboratorium Quality Control",
      description: "Lab modern untuk memastikan kualitas setiap batch produksi",
      details: [
        "Analisis mikrobiologi lengkap",
        "Uji kandungan nutrisi",
        "Deteksi logam berat",
        "Sertifikasi batch produksi"
      ],
      image: "/api/placeholder/600/400",
      stats: { value: "24/7", unit: "", label: "Quality Monitoring" }
    },
    {
      icon: Zap,
      title: "Teknologi Pengolahan",
      description: "Sistem pengolahan canggih dengan standar internasional",
      details: [
        "Mesin pembersih ultrasonik",
        "Sistem pengeringan terkontrol",
        "Packaging otomatis",
        "Cold storage -18°C"
      ],
      image: "/api/placeholder/600/400",
      stats: { value: "99.9", unit: "%", label: "Tingkat Kebersihan" }
    },
    {
      icon: Truck,
      title: "Pusat Distribusi",
      description: "Gudang dan sistem distribusi untuk jangkauan nasional",
      details: [
        "Gudang berpendingin 2,000 m²",
        "Sistem inventori digital",
        "Logistik terintegrasi",
        "Network distribusi 34 provinsi"
      ],
      image: "/api/placeholder/600/400",
      stats: { value: "2,000", unit: "m²", label: "Kapasitas Gudang" }
    }
  ];

  const certifications = [
    { name: "HACCP", description: "Hazard Analysis Critical Control Points" },
    { name: "ISO 22000", description: "Food Safety Management System" },
    { name: "Halal MUI", description: "Majelis Ulama Indonesia Certification" },
    { name: "BPOM RI", description: "Badan Pengawas Obat dan Makanan" }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-green-300 rounded-full text-sm font-semibold mb-6">
            Fasilitas & Teknologi
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Fasilitas Produksi
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Berstandar Internasional
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Dilengkapi dengan teknologi modern dan sistem quality control terdepan untuk menghasilkan 
            produk sarang walet berkualitas premium yang memenuhi standar ekspor internasional
          </p>
        </div>

        {/* Facilities Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {facilities.map((facility, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === index
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
                  }`}
                >
                  <facility.icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:block">{facility.title}</span>
                </button>
              ))}
            </div>

            {/* Active Facility Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  {React.createElement(facilities[activeTab].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {facilities[activeTab].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {facilities[activeTab].description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">
                    {facilities[activeTab].stats.value}
                    <span className="text-2xl text-green-400">{facilities[activeTab].stats.unit}</span>
                  </div>
                  <div className="text-sm text-gray-300">{facilities[activeTab].stats.label}</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {facilities[activeTab].details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                <Play className="w-4 h-4" />
                <span>Lihat Virtual Tour</span>
              </button>
            </div>
          </div>

          {/* Visual */}
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Factory className="w-20 h-20 text-white/40" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold">ISO Certified</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold">200+ Staff</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Sertifikasi & Standar</h3>
            <p className="text-gray-300">Fasilitas kami memenuhi standar internasional tertinggi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ingin Mengunjungi Fasilitas Kami?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Kami membuka kesempatan bagi mitra bisnis untuk melakukan kunjungan fasilitas. 
              Lihat langsung proses produksi dan quality control kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                <span>Jadwalkan Kunjungan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl transition-all duration-300 border border-white/20">
                Download Company Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}