"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, Globe, Users, Award, TrendingUp } from "lucide-react";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const ctaCards = [
    {
      icon: Users,
      title: "Mitra Distributor",
      description: "Bergabung sebagai distributor dan dapatkan akses eksklusif ke produk premium kami",
      action: "Daftar Sebagai Distributor",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: Globe,
      title: "Ekspor Internasional", 
      description: "Solusi lengkap untuk kebutuhan ekspor sarang walet ke pasar global",
      action: "Konsultasi Ekspor",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: Award,
      title: "Private Label",
      description: "Layanan private label dengan kualitas premium untuk brand Anda sendiri",
      action: "Pelajari Private Label",
      color: "from-purple-500 to-purple-600", 
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Telepon",
      value: "+62 21 XXX-XXXX",
      link: "tel:+6221xxxxxxx"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@tunasesta.com",
      link: "mailto:info@tunasesta.com"
    },
    {
      icon: MapPin,
      label: "Alamat",
      value: "Jakarta, Indonesia",
      link: "#"
    }
  ];

  const stats = [
    { value: "500+", label: "Mitra Global" },
    { value: "15+", label: "Negara Ekspor" },
    { value: "25+", label: "Tahun Pengalaman" },
    { value: "98%", label: "Kepuasan Klien" }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-900 via-green-900 to-blue-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main CTA Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-green-300 rounded-full text-sm font-semibold mb-6">
            Bergabung dengan Kami
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Siap Memulai
            <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Kemitraan Strategis?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Bergabunglah dengan jaringan global TUNAS ESTA INDONESIA dan dapatkan akses ke produk 
            sarang walet premium dengan dukungan penuh dari tim profesional kami
          </p>
        </div>

        {/* Stats Section */}
        <div 
          className={`grid md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div 
          className={`grid lg:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {ctaCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                {card.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed mb-8">
                {card.description}
              </p>
              
              <button className={`w-full bg-gradient-to-r ${card.color} hover:shadow-lg text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                <span>{card.action}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contact Info */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Hubungi Tim Kami
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Tim profesional kami siap membantu Anda dalam mengembangkan bisnis 
                  dan menemukan solusi terbaik untuk kebutuhan sarang walet Anda
                </p>
                
                <div className="space-y-4 mb-8">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{contact.label}</div>
                        <div className="text-white font-medium group-hover:text-green-300 transition-colors">
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Main CTA */}
              <div className="text-center lg:text-left">
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold text-white mb-4">
                    Dapatkan Konsultasi Gratis
                  </h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Konsultasikan kebutuhan bisnis Anda dengan tim ahli kami. 
                    Kami akan membantu menemukan solusi terbaik untuk kesuksesan Anda.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span>Hubungi Sekarang</span>
                    </button>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300">
                      Download Katalog
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10">
            <p className="text-lg text-gray-300">
              <span className="text-white font-semibold">Dipercaya oleh 500+ mitra global</span> • 
              Melayani 15+ negara • 25+ tahun pengalaman • 98% tingkat kepuasan klien
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}