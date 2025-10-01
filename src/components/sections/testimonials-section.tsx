"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight, Users, Globe, TrendingUp } from "lucide-react";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const testimonials = [
    {
      id: 1,
      name: "Michael Chen",
      position: "Import Manager",
      company: "Golden Dragon Trading (Hong Kong)",
      country: "Hong Kong",
      flag: "🇭🇰",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Kami telah bekerja sama dengan TUNAS ESTA selama 8 tahun. Kualitas produk mereka sangat konsisten dan selalu memenuhi standar ekspor internasional. Proses pengiriman selalu tepat waktu dan dokumentasi lengkap.",
      highlight: "Kualitas konsisten selama 8 tahun kerjasama",
      orderVolume: "50+ ton/tahun",
      category: "Grade AAA Premium"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Procurement Director",
      company: "Premium Health Foods Ltd",
      country: "Australia",
      flag: "🇦🇺",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Exceptional quality and service! Their bird's nest products meet all Australian import standards. The traceability documentation is comprehensive and the product quality is consistently excellent for our premium health food market.",
      highlight: "Memenuhi standar Australia dengan dokumentasi lengkap",
      orderVolume: "30+ ton/tahun",
      category: "Grade AA Select"
    },
    {
      id: 3,
      name: "Dr. Ahmad Rahman",
      position: "Quality Assurance Manager",
      company: "Salam Food Industries",
      country: "Malaysia",
      flag: "🇲🇾",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Sertifikasi Halal yang lengkap dan proses produksi yang transparan membuat kami yakin dengan kualitas produk TUNAS ESTA. Sangat cocok untuk pasar Muslim di Malaysia dan Timur Tengah.",
      highlight: "Sertifikasi Halal terpercaya untuk pasar Muslim",
      orderVolume: "40+ ton/tahun",
      category: "Grade AAA Premium"
    },
    {
      id: 4,
      name: "Liu Wei Ming",
      position: "Business Development Manager",
      company: "Oriental Wellness Group",
      country: "Singapore",
      flag: "🇸🇬",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Professional service and premium quality products. Their facility tour convinced us of their commitment to quality. We've expanded our partnership to include multiple product grades for different market segments.",
      highlight: "Partnership berkembang untuk multi-segment pasar",
      orderVolume: "60+ ton/tahun",
      category: "Multi Grade"
    },
    {
      id: 5,
      name: "Emma van der Berg",
      position: "Import Specialist",
      company: "European Natural Products BV",
      country: "Netherlands",
      flag: "🇳🇱",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Outstanding quality control and EU compliance documentation. TUNAS ESTA understands European market requirements perfectly. Their products have helped us establish a strong position in the European bird's nest market.",
      highlight: "Kepatuhan sempurna terhadap standar Eropa",
      orderVolume: "25+ ton/tahun",
      category: "Grade AA Select"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Mitra Global",
      description: "Distributor dan importir terpercaya"
    },
    {
      icon: Globe,
      value: "15+",
      label: "Negara Tujuan",
      description: "Jangkauan ekspor internasional"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Tingkat Retensi",
      description: "Klien yang melanjutkan kerjasama"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            Testimoni Mitra Global
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Dipercaya
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Secara Global
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Mendengar langsung dari mitra bisnis kami di berbagai negara tentang kualitas 
            produk dan layanan yang telah membangun kepercayaan jangka panjang
          </p>
        </div>

        {/* Stats */}
        <div 
          className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div 
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12">
            <div className="grid lg:grid-cols-2">
              {/* Testimonial Content */}
              <div className="p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <Quote className="w-12 h-12 text-green-500" />
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].testimonial}"
                </blockquote>

                <div className="bg-green-50 rounded-xl p-4 mb-8">
                  <div className="text-sm font-semibold text-green-700 mb-1">Highlight:</div>
                  <div className="text-green-600">{testimonials[currentTestimonial].highlight}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-2xl">
                    {testimonials[currentTestimonial].flag}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-green-600 font-medium">
                      {testimonials[currentTestimonial].position}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-gradient-to-br from-green-500 to-blue-600 p-12 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-8">Detail Kerjasama</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-green-100 mb-1">Volume Order Tahunan</div>
                    <div className="text-2xl font-bold">{testimonials[currentTestimonial].orderVolume}</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-green-100 mb-1">Kategori Produk</div>
                    <div className="text-lg font-semibold">{testimonials[currentTestimonial].category}</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm text-green-100 mb-1">Negara</div>
                    <div className="text-lg font-semibold flex items-center gap-2">
                      <span className="text-2xl">{testimonials[currentTestimonial].flag}</span>
                      {testimonials[currentTestimonial].country}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-xl transition-all duration-300">
                    Lihat Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-green-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-20 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12 border border-green-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Bergabung dengan Mitra Global Kami
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Jadilah bagian dari jaringan distribusi global TUNAS ESTA. Dapatkan akses ke produk 
              berkualitas premium dengan dukungan penuh dari tim profesional kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                Daftar Sebagai Distributor
              </button>
              <button className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold rounded-xl transition-all duration-300 hover:shadow-lg">
                Download Partnership Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}