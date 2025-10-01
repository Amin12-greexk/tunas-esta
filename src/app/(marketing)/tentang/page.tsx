// src/app/(marketing)/tentang/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Award, Users, Globe, Heart, Factory, Shield, TrendingUp, Target, 
  ArrowRight, Play, CheckCircle, Calendar, MapPin, Phone, Mail,
  Building, Handshake, Leaf, Star, Eye, Lightbulb
} from "lucide-react";

export default function TentangPage() {
  const [activeSection, setActiveSection] = useState("sejarah");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [counters, setCounters] = useState({
    experience: 0,
    countries: 0,
    employees: 0,
    capacity: 0
  });

  const finalValues = {
    experience: 25,
    countries: 15,
    employees: 200,
    capacity: 500
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        experience: Math.floor(finalValues.experience * progress),
        countries: Math.floor(finalValues.countries * progress),
        employees: Math.floor(finalValues.employees * progress),
        capacity: Math.floor(finalValues.capacity * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(finalValues);
      }
    }, stepDuration);
  };

  const stats = [
    { value: counters.experience, unit: "+", label: "Tahun Pengalaman", description: "Sejak 1998" },
    { value: counters.countries, unit: "+", label: "Negara Ekspor", description: "Global reach" },
    { value: counters.employees, unit: "+", label: "Karyawan", description: "Tim profesional" },
    { value: counters.capacity, unit: "+", label: "Ton/Tahun", description: "Kapasitas produksi" }
  ];

  const timeline = [
    { year: "1998", title: "Pendirian Perusahaan", description: "Dimulai dengan visi menghadirkan sarang walet premium", icon: Building },
    { year: "2005", title: "Ekspansi Regional", description: "Memasuki pasar Malaysia dan Singapura", icon: Globe },
    { year: "2010", title: "Sertifikasi Pertama", description: "Meraih sertifikasi HACCP dan Halal MUI", icon: Award },
    { year: "2015", title: "Fasilitas Modern", description: "Pembangunan pabrik dengan teknologi terdepan", icon: Factory },
    { year: "2020", title: "Ekspansi Global", description: "Memasuki pasar Eropa dan Amerika", icon: Handshake },
    { year: "2024", title: "ISO 22000:2018", description: "Pencapaian sertifikasi ISO terbaru", icon: Shield }
  ];

  const values = [
    {
      icon: Eye,
      title: "Visi",
      subtitle: "Menjadi Pemimpin Global",
      description: "Menjadi perusahaan sarang walet terdepan di dunia yang dikenal karena kualitas, inovasi, dan komitmen terhadap keberlanjutan untuk kesehatan masyarakat global."
    },
    {
      icon: Target,
      title: "Misi",
      subtitle: "Menghadirkan Kualitas Premium",
      description: "Menghadirkan produk sarang walet premium dengan standar internasional tertinggi, membangun kemitraan berkelanjutan, dan berkontribusi pada kesehatan masyarakat."
    },
    {
      icon: Lightbulb,
      title: "Nilai",
      subtitle: "Fondasi Keunggulan",
      description: "Integritas, kualitas tanpa kompromi, inovasi berkelanjutan, tanggung jawab lingkungan, dan kemitraan jangka panjang yang saling menguntungkan."
    }
  ];

  const achievements = [
    { icon: Award, title: "Sertifikasi Internasional", value: "4+", description: "HACCP, ISO 22000, Halal MUI, BPOM" },
    { icon: Globe, title: "Jangkauan Global", value: "15+", description: "Negara di Asia, Eropa, dan Amerika" },
    { icon: Factory, title: "Fasilitas Modern", value: "5,000", description: "m² dengan teknologi terdepan" },
    { icon: TrendingUp, title: "Pertumbuhan Konsisten", value: "25%", description: "YoY growth rate selama 5 tahun" }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-blue-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-green-300 rounded-full text-sm font-semibold mb-8 animate-fade-in">
              Tentang TUNAS ESTA INDONESIA
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Produsen
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sarang Walet Indonesia
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              inovasi berkelanjutan, dan komitmen terhadap keunggulan
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                <span>Tonton Video Profil</span>
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl transition-all duration-300">
                Download Company Profile
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
        <div className="container">
          <div 
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.unit}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Visi, Misi & Nilai Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fondasi yang menguatkan setiap langkah perjalanan kami menuju keunggulan global
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-lg font-semibold text-green-600 mb-4">{value.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Perjalanan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sejarah pencapaian dan milestone penting dalam membangun kepercayaan global
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-green-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 to-blue-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pencapaian Kami
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Hasil kerja keras dan dedikasi tim dalam mencapai standar kualitas internasional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{achievement.value}</div>
                <h3 className="text-lg font-semibold text-green-300 mb-3">{achievement.title}</h3>
                <p className="text-sm text-gray-300">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Siap Berkolaborasi dengan Kami?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Bergabunglah dengan ratusan mitra global yang telah mempercayakan kebutuhan 
              sarang walet premium mereka kepada TUNAS ESTA INDONESIA
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <Phone className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">Telepon</div>
                  <div className="font-semibold text-gray-900">+62 21 XXX-XXXX</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <Mail className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold text-gray-900">info@tunasesta.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                <MapPin className="w-6 h-6 text-purple-600" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">Lokasi</div>
                  <div className="font-semibold text-gray-900">Jakarta, Indonesia</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                <span>Hubungi Tim Kami</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:shadow-lg">
                Download Company Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}