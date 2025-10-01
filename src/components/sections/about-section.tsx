"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Users, Globe, Heart, Factory, Shield, TrendingUp, Target, ArrowRight, Play, CheckCircle } from "lucide-react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  const tabs = [
    {
      id: "story",
      title: "Sejarah Kami",
      icon: Heart,
      content: {
        title: "Perjalanan 25 Tahun Membangun Kepercayaan",
        description: "Dimulai pada tahun 1998, TUNAS ESTA INDONESIA lahir dari visi sederhana namun ambisius: menghadirkan produk sarang walet berkualitas premium untuk pasar global. Berawal dari fasilitas kecil dengan komitmen besar terhadap kualitas, kami telah berkembang menjadi salah satu eksportir sarang walet terbesar di Indonesia.",
        points: [
          "1998: Pendirian perusahaan dengan fasilitas produksi pertama",
          "2005: Ekspansi pasar ke Malaysia dan Singapura",
          "2010: Sertifikasi HACCP dan Halal MUI pertama",
          "2015: Pembukaan fasilitas produksi modern di Jakarta",
          "2020: Ekspansi ke pasar Eropa dan Amerika",
          "2024: Pencapaian sertifikasi ISO 22000:2018 terbaru"
        ],
        highlight: "Dari startup lokal menjadi pemimpin industri global"
      }
    },
    {
      id: "mission",
      title: "Visi & Misi",
      icon: Target,
      content: {
        title: "Komitmen Untuk Masa Depan yang Berkelanjutan",
        description: "Visi kami adalah menjadi perusahaan sarang walet terdepan di dunia yang dikenal karena kualitas, inovasi, dan komitmen terhadap keberlanjutan. Misi kami adalah menghadirkan produk sarang walet premium dengan standar internasional tertinggi.",
        points: [
          "Mengutamakan kualitas dan keamanan produk di setiap tahap",
          "Membangun kemitraan jangka panjang dengan mitra global",
          "Mengembangkan teknologi produksi ramah lingkungan",
          "Memberdayakan masyarakat lokal dan ekonomi Indonesia",
          "Menjaga kelestarian habitat alami burung walet",
          "Inovasi berkelanjutan untuk produk dan layanan terbaik"
        ],
        highlight: "Kualitas premium dengan tanggung jawab sosial dan lingkungan"
      }
    },
    {
      id: "values",
      title: "Nilai-Nilai",
      icon: Shield,
      content: {
        title: "Fondasi Nilai yang Menguatkan Setiap Langkah",
        description: "Nilai-nilai perusahaan kami menjadi panduan dalam setiap keputusan bisnis dan interaksi dengan stakeholder. Kami percaya bahwa kesuksesan yang berkelanjutan hanya dapat dicapai dengan menjunjung tinggi integritas dan keunggulan.",
        points: [
          "Integritas: Transparansi dan kejujuran dalam setiap aspek bisnis",
          "Kualitas: Komitmen terhadap standar tertinggi tanpa kompromi",
          "Inovasi: Pengembangan berkelanjutan untuk kemajuan industri",
          "Keberlanjutan: Tanggung jawab terhadap lingkungan dan masyarakat",
          "Kemitraan: Membangun hubungan saling menguntungkan jangka panjang",
          "Keunggulan: Selalu berusaha menjadi yang terbaik di bidangnya"
        ],
        highlight: "Nilai-nilai yang memandu perjalanan menuju keunggulan global"
      }
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Sertifikasi Internasional",
      description: "HACCP, ISO 22000, Halal MUI, BPOM",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Globe,
      title: "Jangkauan Global",
      description: "15+ negara di Asia, Eropa, dan Amerika",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Factory,
      title: "Fasilitas Modern",
      description: "5,000 m² dengan teknologi terdepan",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Pertumbuhan Konsisten",
      description: "25% YoY growth rate selama 5 tahun",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { value: counters.experience, unit: "+", label: "Tahun Pengalaman" },
    { value: counters.countries, unit: "+", label: "Negara Ekspor" },
    { value: counters.employees, unit: "+", label: "Karyawan Profesional" },
    { value: counters.capacity, unit: "+", label: "Ton Kapasitas/Tahun" }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            Tentang TUNAS ESTA INDONESIA
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Pelopor Industri
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sarang Walet Indonesia
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Lebih dari dua dekade membangun kepercayaan global melalui kualitas premium, 
            inovasi berkelanjutan, dan komitmen terhadap keunggulan dalam setiap produk yang kami hasilkan
          </p>
        </div>

        {/* Stats Counter */}
        <div 
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.value}{stat.unit}
              </div>
              <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Tab Navigation & Content */}
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-lg">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex-1 ${
                    activeTab === index
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="hidden sm:block">{tab.title}</span>
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {tabs[activeTab].content.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {tabs[activeTab].content.description}
              </p>

              <div className="space-y-4 mb-8">
                {tabs[activeTab].content.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <div className="text-sm font-semibold text-green-700 mb-2">Highlight:</div>
                <div className="text-green-600 font-medium">{tabs[activeTab].content.highlight}</div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div 
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Video/Virtual Tour */}
            <div className="mt-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4">Lihat Fasilitas Kami</h4>
                <p className="text-green-100 mb-6 leading-relaxed">
                  Jelajahi fasilitas produksi modern dan proses quality control melalui virtual tour interaktif
                </p>
                <button className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  <Play className="w-5 h-5" />
                  <span>Mulai Virtual Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Siap Berkolaborasi dengan Kami?
            </h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Bergabunglah dengan ratusan mitra global yang telah mempercayakan kebutuhan 
              sarang walet premium mereka kepada TUNAS ESTA INDONESIA
            </p>
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
      </div>
    </section>
  );
}