// src/app/(marketing)/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import {
  qHero,
  qAllProduk,
  qAllFasilitas,
  qLatestBerita,
  qAllSertifikasi,
  qPageBySlug,
} from "@/lib/sanity.queries";
import { Hero } from "@/components/sections/hero";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { Certifications } from "@/components/sections/certifications";
import { NewsSection } from "@/components/sections/news-section";
import { CTA } from "@/components/sections/cta";
import { TrustedBy } from "@/components/sections/trusted-by";
import { PortableText } from "@portabletext/react";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { SectionSeparator } from "@/components/section-separator";

export default async function HomePage() {
  const [hero, produk, fasilitas, berita, sertifikasi, tentang] =
    await Promise.all([
      fetchSanity<any>(qHero),
      fetchSanity<any[]>(qAllProduk),
      fetchSanity<any[]>(qAllFasilitas),
      fetchSanity<any[]>(qLatestBerita),
      fetchSanity<any[]>(qAllSertifikasi),
      fetchSanity<any>(qPageBySlug, { slug: "tentang" }),
    ]);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ScrollAnimationWrapper>
        {hero && <Hero {...hero} />}
      </ScrollAnimationWrapper>

      <SectionSeparator variant="wave" />

      {/* Tentang Kami Section */}
      {tentang && (
        <ScrollAnimationWrapper>
          <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-green-50 relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
            
            <div className="container max-w-6xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                  Tentang Kami
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  {tentang.title}
                </h2>
                <div className="prose prose-xl mx-auto text-gray-700 max-w-4xl">
                  <PortableText value={tentang.body} />
                </div>
              </div>
              
              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Kualitas Premium</h3>
                  <p className="text-gray-600">Standar internasional dengan sertifikasi lengkap</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Jangkauan Global</h3>
                  <p className="text-gray-600">Melayani 15+ negara di seluruh dunia</p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">25+ Tahun Pengalaman</h3>
                  <p className="text-gray-600">Kepercayaan yang terbukti sejak 1998</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
      )}

      <SectionSeparator variant="diagonal" />

      {/* Stats Section */}
      <ScrollAnimationWrapper>
        <Stats />
      </ScrollAnimationWrapper>

      <SectionSeparator variant="curve" />

      {/* Trusted By Section */}
      <ScrollAnimationWrapper>
        <TrustedBy />
      </ScrollAnimationWrapper>

      <SectionSeparator variant="wave" color="green" />

      {/* Features Section */}
      <ScrollAnimationWrapper>
        <Features />
      </ScrollAnimationWrapper>

      <SectionSeparator variant="zigzag" />

      {/* Product Showcase */}
      {produk?.length > 0 && (
        <ScrollAnimationWrapper>
          <ProductShowcase products={produk.slice(0, 6)} />
        </ScrollAnimationWrapper>
      )}

      <SectionSeparator variant="curve" color="blue" />

      {/* Certifications */}
      {sertifikasi?.length > 0 && (
        <ScrollAnimationWrapper>
          <Certifications items={sertifikasi} />
        </ScrollAnimationWrapper>
      )}

      <SectionSeparator variant="diagonal" direction="right" />

      {/* Latest News */}
      {berita?.length > 0 && (
        <ScrollAnimationWrapper>
          <NewsSection articles={berita.slice(0, 3)} />
        </ScrollAnimationWrapper>
      )}

      <SectionSeparator variant="wave" color="gradient" />

      {/* CTA Section */}
      <ScrollAnimationWrapper>
        <CTA />
      </ScrollAnimationWrapper>
    </main>
  );
}