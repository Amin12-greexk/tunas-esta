"use client";

import { motion } from "framer-motion";
import { FileCheck, Utensils, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    iconElements: {
      papers: true,
      badge: true,
      leaves: true
    },
    title: "Tidak Perlu Khawatir Tentang Legalitas",
    description: "Produk kami 100% legal dan bersertifikat oleh Badan Karantina Pertanian Indonesia dan Badan Sertifikasi dan Akreditasi Republik Rakyat Tiongkok (CNCAL)."
  },
  {
    icon: Utensils,
    iconElements: {
      servingDish: true,
      trash: true,
      leaves: true
    },
    title: "Kami Hanya Memberikan Anda Produk Berkualitas Tinggi",
    description: "Yakinlah dengan kualitas produk yang Anda pesan, telah melewati prosedur kendali mutu kami."
  },
  {
    icon: Heart,
    iconElements: {
      thoughtBubbles: true,
      head: true,
      leaves: true
    },
    title: "Produk Dapat Disesuaikan Dengan Kebutuhan Unik Anda",
    description: "Tidak perlu membuang tenaga lagi karena produk kami dapat disesuaikan secara khusus dengan kebutuhan unik Anda."
  },
  {
    icon: Sparkles,
    iconElements: {
      stars: true,
      thumbsUp: true,
      leaves: true
    },
    title: "Fokus Pada Memuaskan Kebutuhan Pelanggan Dengan Lebih Baik",
    description: "Kami memfokuskan kemampuan kami untuk memuaskan pelanggan berharga kami dengan mengintegrasikan hilir dan hulu dalam rantai nilai."
  }
];

// Custom icon component that matches the design
function CustomFeatureIcon({ feature }: { feature: typeof features[0] }) {
  return (
    <div className="w-full h-48 flex items-center justify-center relative">
      {/* Main icon container */}
      <div className="relative">
        {/* Main feature icon with background circle */}
        <div className="relative z-10">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center">
            <feature.icon className="w-12 h-12 text-brand-600" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Additional decorative elements based on feature */}
        {feature.iconElements.papers && (
          <>
            {/* Document papers floating around */}
            <div className="absolute -top-2 -left-8 w-8 h-10 bg-white border-2 border-zinc-300 rounded shadow-sm transform -rotate-12">
              <div className="mt-2 mx-1 h-0.5 bg-zinc-300" />
              <div className="mt-1 mx-1 h-0.5 bg-zinc-300" />
              <div className="mt-1 mx-1 h-0.5 bg-zinc-300 w-2/3" />
            </div>
            <div className="absolute -top-2 -right-8 w-8 h-10 bg-white border-2 border-zinc-300 rounded shadow-sm transform rotate-12">
              <div className="mt-2 mx-1 h-0.5 bg-zinc-300" />
              <div className="mt-1 mx-1 h-0.5 bg-zinc-300" />
              <div className="mt-1 mx-1 h-0.5 bg-zinc-300 w-2/3" />
            </div>
          </>
        )}
        
        {feature.iconElements.servingDish && (
          <>
            {/* Quality assurance elements */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="w-16 h-2 bg-zinc-300 rounded-full" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-zinc-300 rounded-full" />
            </div>
            {/* Quality stars */}
            <div className="absolute -bottom-2 -right-2 flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
          </>
        )}
        
        {feature.iconElements.thoughtBubbles && (
          <>
            {/* Customization thought bubbles */}
            <div className="absolute -top-4 -right-8">
              <div className="w-4 h-4 bg-brand-100 rounded-full" />
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-brand-100 rounded-full" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-brand-600">...</span>
              </div>
            </div>
            {/* User silhouette */}
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-zinc-200 rounded-full">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-400 rounded-full" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-3 bg-zinc-400 rounded-t-full" />
            </div>
          </>
        )}
        
        {feature.iconElements.stars && (
          <>
            {/* Excellence stars scattered around */}
            <div className="absolute inset-0 w-32 h-32 -left-4 -top-4">
              <span className="absolute top-0 left-4 text-yellow-400 text-lg animate-pulse">★</span>
              <span className="absolute top-2 right-2 text-yellow-400 text-sm animate-pulse delay-100">★</span>
              <span className="absolute bottom-8 left-0 text-yellow-400 text-xs animate-pulse delay-200">★</span>
              <span className="absolute bottom-12 right-4 text-yellow-400 animate-pulse delay-300">★</span>
              <span className="absolute top-4 left-1/2 text-yellow-400 text-sm animate-pulse delay-150">★</span>
            </div>
            {/* Thumbs up */}
            <div className="absolute bottom-0 -right-6">
              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center transform rotate-12">
                <span className="text-brand-600">👍</span>
              </div>
            </div>
          </>
        )}
        
        {feature.iconElements.badge && (
          <>
            {/* Certification badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-green-600 text-2xl font-bold">✓</div>
            </div>
          </>
        )}
      </div>
      
      {/* Laurel leaves decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-16 opacity-30">
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-3 bg-brand-300 rounded-full transform -rotate-45 origin-right"
              style={{ marginLeft: `${i * 4}px` }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-3 bg-brand-300 rounded-full transform rotate-45 origin-left"
              style={{ marginRight: `${i * 4}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="container">
        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Custom Icon */}
                <CustomFeatureIcon feature={feature} />

                {/* Content */}
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4 min-h-[3.5rem] flex items-center justify-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}