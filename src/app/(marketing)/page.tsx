// src/app/(marketing)/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import {
  qHero,
  qAllProduk,
  qAllFasilitas,
  qLatestBerita,
  qAllSertifikasi,
  qPageBySlug, // ← import query tentang
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

export default async function HomePage() {
  const [hero, produk, fasilitas, berita, sertifikasi, tentang] =
    await Promise.all([
      fetchSanity<any>(qHero),
      fetchSanity<any[]>(qAllProduk),
      fetchSanity<any[]>(qAllFasilitas),
      fetchSanity<any[]>(qLatestBerita),
      fetchSanity<any[]>(qAllSertifikasi),
      fetchSanity<any>(qPageBySlug, { slug: "tentang" }), // ← fetch page tentang
    ]);

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      {hero && <Hero {...hero} />}

      {/* Tentang Kami Section */}
      {tentang && (
        <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-zinc-900 mb-6">
              {tentang.title}
            </h2>
            <div className="prose prose-lg mx-auto text-zinc-700">
              <PortableText value={tentang.body} />
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <Stats />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Features Section */}
      <Features />

      {/* Product Showcase */}
      {produk?.length > 0 && (
        <ProductShowcase products={produk.slice(0, 6)} />
      )}

      {/* Certifications */}
      {sertifikasi?.length > 0 && (
        <Certifications items={sertifikasi} />
      )}

      {/* Latest News */}
      {berita?.length > 0 && (
        <NewsSection articles={berita.slice(0, 3)} />
      )}

      {/* CTA Section */}
      <CTA />
    </main>
  );
}
