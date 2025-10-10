// src/app/tentang/visi-misi/page.tsx
import { Target, Eye, Heart, Award, Users, TrendingUp } from "lucide-react";

export default function VisiMisiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>Visi & Misi Perusahaan</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Menuju Masa Depan
              <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Bersama-sama
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-50 leading-relaxed">
              Komitmen kami untuk menghadirkan produk sarang burung walet berkualitas tinggi dengan standar internasional
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Visi Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-xl border border-green-100/50 p-8 md:p-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 shadow-lg">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Visi Kami</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg md:text-xl font-semibold text-green-700">
                      Menjadi perusahaan eksportir sarang burung walet terkemuka di Indonesia dengan standar kualitas internasional.
                    </p>
                    <p className="text-base">
                      Kami berkomitmen untuk terus berinovasi dan mengembangkan produk yang memberikan nilai tambah bagi kesehatan konsumen di seluruh dunia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-600/30 rounded-3xl blur-3xl opacity-50" />
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                      <Target className="w-32 h-32 mx-auto text-green-600 mb-4" />
                      <p className="text-sm font-medium text-gray-600">Visi yang Jelas</p>
                      <p className="text-xs text-gray-500 mt-2">Memimpin Industri Sarang Walet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-sm font-medium text-green-700 mb-4">
              <Target className="w-4 h-4" />
              <span>Misi Perusahaan</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Misi Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Langkah-langkah strategis untuk mewujudkan visi perusahaan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Kualitas Terjamin",
                description: "Menghasilkan produk sarang burung walet dengan kualitas premium yang memenuhi standar internasional dan sertifikasi lengkap.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Users,
                title: "Kepuasan Pelanggan",
                description: "Memberikan pelayanan terbaik dan membangun kepercayaan jangka panjang dengan mitra bisnis di seluruh dunia.",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: TrendingUp,
                title: "Inovasi Berkelanjutan",
                description: "Terus berinovasi dalam proses produksi dan pengembangan produk untuk memenuhi kebutuhan pasar global.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Heart,
                title: "Kesehatan Konsumen",
                description: "Mengutamakan manfaat kesehatan dan keamanan produk untuk kesejahteraan konsumen di seluruh dunia.",
                color: "from-red-500 to-red-600"
              },
              {
                icon: Target,
                title: "Ekspansi Pasar",
                description: "Memperluas jangkauan pasar ekspor ke berbagai negara dengan mempertahankan standar kualitas tertinggi.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Users,
                title: "Pemberdayaan SDM",
                description: "Mengembangkan kompetensi karyawan dan menciptakan lingkungan kerja yang profesional dan produktif.",
                color: "from-teal-500 to-teal-600"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-green-50/50 to-green-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai-nilai Perusahaan */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full text-sm font-medium text-emerald-700 mb-4">
              <Heart className="w-4 h-4" />
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nilai-nilai Perusahaan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prinsip yang menjadi fondasi dalam setiap langkah kami
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Integritas",
                description: "Menjunjung tinggi kejujuran dan transparansi dalam setiap aspek bisnis",
                emoji: "🤝"
              },
              {
                title: "Kualitas",
                description: "Berkomitmen menghasilkan produk terbaik dengan standar tertinggi",
                emoji: "⭐"
              },
              {
                title: "Inovasi",
                description: "Terus berinovasi untuk memberikan solusi terbaik bagi pelanggan",
                emoji: "💡"
              },
              {
                title: "Profesional",
                description: "Bekerja dengan dedikasi dan profesionalisme tinggi",
                emoji: "🎯"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="text-5xl mb-4">{value.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-lg md:text-xl text-green-50 mb-8 leading-relaxed">
            Mari bersama-sama mewujudkan visi dan misi untuk menghadirkan produk sarang burung walet terbaik ke seluruh dunia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontak"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-green-700 font-semibold text-lg hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Hubungi Kami
            </a>
            <a
              href="/karier"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Lihat Karier
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}