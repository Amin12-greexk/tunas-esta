"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Shield, Award, CheckCircle, Globe, FileText, Calendar, ArrowRight, Download } from "lucide-react";

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCert, setActiveCert] = useState(0);

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

  const certifications = [
    {
      id: 1,
      name: "HACCP",
      fullName: "Hazard Analysis Critical Control Points",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      textColor: "text-blue-600",
      description: "Sistem manajemen keamanan pangan yang mengidentifikasi, mengevaluasi, dan mengendalikan bahaya yang signifikan bagi keamanan pangan",
      benefits: [
        "Pencegahan kontaminasi makanan",
        "Kontrol kualitas di setiap tahap produksi",
        "Dokumentasi lengkap proses produksi",
        "Peningkatan kepercayaan konsumen"
      ],
      scope: "Seluruh proses produksi dari bahan baku hingga produk jadi",
      validUntil: "2025-12-31",
      certBody: "SGS Indonesia",
      benefits_detail: "Memastikan produk aman untuk konsumsi dengan standar internasional"
    },
    {
      id: 2,
      name: "ISO 22000",
      fullName: "Food Safety Management System",
      icon: Award,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      textColor: "text-green-600",
      description: "Standar internasional untuk sistem manajemen keamanan pangan yang dapat diterapkan oleh organisasi dalam rantai makanan",
      benefits: [
        "Manajemen risiko terintegrasi",
        "Komunikasi efektif sepanjang rantai makanan",
        "Perbaikan berkelanjutan sistem",
        "Pengakuan internasional"
      ],
      scope: "Sistem manajemen keamanan pangan terintegrasi",
      validUntil: "2026-06-30",
      certBody: "TÜV SÜD Indonesia",
      benefits_detail: "Jaminan kualitas dan keamanan dengan standar global"
    },
    {
      id: 3,
      name: "Halal MUI",
      fullName: "Majelis Ulama Indonesia Halal Certification",
      icon: CheckCircle,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      textColor: "text-emerald-600",
      description: "Sertifikasi halal dari Majelis Ulama Indonesia yang menjamin produk sesuai dengan syariat Islam",
      benefits: [
        "Akses ke pasar Muslim global",
        "Kepercayaan konsumen Muslim",
        "Standar kebersihan tinggi",
        "Proses produksi yang terjamin halal"
      ],
      scope: "Produk sarang walet dan proses produksinya",
      validUntil: "2025-08-15",
      certBody: "LPPOM MUI",
      benefits_detail: "Menjangkau 1.8 miliar konsumen Muslim di seluruh dunia"
    },
    {
      id: 4,
      name: "BPOM RI",
      fullName: "Badan Pengawas Obat dan Makanan Republik Indonesia",
      icon: Globe,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      textColor: "text-purple-600",
      description: "Izin edar dari BPOM untuk memastikan produk aman, bermutu, dan bermanfaat bagi kesehatan masyarakat",
      benefits: [
        "Legalitas distribusi nasional",
        "Jaminan kualitas produk",
        "Monitoring keamanan berkelanjutan",
        "Akses ke retail modern"
      ],
      scope: "Produk sarang walet siap konsumsi",
      validUntil: "2027-03-20",
      certBody: "BPOM RI",
      benefits_detail: "Akses legal ke seluruh pasar Indonesia dan retail modern"
    }
  ];

  const additionalCerts = [
    { name: "GMP", description: "Good Manufacturing Practice" },
    { name: "SSOP", description: "Sanitation Standard Operating Procedure" },
    { name: "Organic", description: "Sertifikasi Produk Organik" },
    { name: "Export License", description: "Izin Ekspor Kemendag" }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            Sertifikasi & Kualitas
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Standar Kualitas
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Internasional
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Komitmen kami terhadap kualitas terbukti melalui berbagai sertifikasi internasional 
            yang menjamin keamanan, kualitas, dan kehalalan produk sarang walet kami
          </p>
        </div>

        {/* Main Certifications */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Certification Cards */}
          <div 
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className={`cursor-pointer transition-all duration-500 ${
                  activeCert === index ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setActiveCert(index)}
              >
                <div className={`bg-gradient-to-r ${activeCert === index ? cert.bgColor : "from-white to-gray-50"} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border ${activeCert === index ? "border-transparent" : "border-gray-200"}`}>
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <cert.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold mb-2 ${activeCert === index ? cert.textColor : "text-gray-900"}`}>
                        {cert.name}
                      </h3>
                      <p className={`text-sm font-medium mb-3 ${activeCert === index ? cert.textColor : "text-gray-600"}`}>
                        {cert.fullName}
                      </p>
                      <p className={`leading-relaxed ${activeCert === index ? "text-gray-700" : "text-gray-600"}`}>
                        {cert.description}
                      </p>
                    </div>
                  </div>
                  
                  {activeCert === index && (
                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Valid Until:</span>
                          <br />
                          <span className={cert.textColor}>{cert.validUntil}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Certified By:</span>
                          <br />
                          <span className={cert.textColor}>{cert.certBody}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Active Certification Details */}
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-8">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-20 h-20 bg-gradient-to-br ${certifications[activeCert].color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  {React.createElement(certifications[activeCert].icon, { className: "w-10 h-10 text-white" })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {certifications[activeCert].name}
                  </h3>
                  <p className={`text-sm font-medium ${certifications[activeCert].textColor}`}>
                    Sertifikasi Aktif
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Manfaat Sertifikasi:</h4>
                <div className="space-y-3">
                  {certifications[activeCert].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 ${certifications[activeCert].textColor} flex-shrink-0`} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope */}
              <div className={`bg-gradient-to-r ${certifications[activeCert].bgColor} rounded-xl p-6 mb-8`}>
                <h4 className="font-semibold text-gray-900 mb-2">Ruang Lingkup:</h4>
                <p className="text-gray-700 leading-relaxed">{certifications[activeCert].scope}</p>
              </div>

              {/* Benefits Detail */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-gray-900 mb-2">Dampak Bisnis:</h4>
                <p className="text-gray-700 leading-relaxed">{certifications[activeCert].benefits_detail}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className={`flex-1 bg-gradient-to-r ${certifications[activeCert].color} hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                  <Download className="w-4 h-4" />
                  <span>Download Sertifikat</span>
                </button>
                <button className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300">
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Certifications */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Sertifikasi Tambahan</h3>
            <p className="text-gray-600">Dukungan sertifikasi lainnya untuk memastikan kualitas terbaik</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {additionalCerts.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Terpercaya Secara Global
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Dengan berbagai sertifikasi internasional, produk kami telah dipercaya oleh 
                mitra bisnis di lebih dari 15 negara. Bergabunglah dengan jaringan global kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                  <span>Download Semua Sertifikat</span>
                  <Download className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-xl transition-all duration-300 border border-white/30 flex items-center justify-center gap-2">
                  <span>Hubungi Tim Sertifikasi</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}