// src/app/(marketing)/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qHero, qAllProduk, qAllFasilitas, qLatestBerita, qAllSertifikasi } from "@/lib/sanity.queries";
import { Hero } from "@/components/sections/hero";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { Certifications } from "@/components/sections/certifications";
import { NewsSection } from "@/components/sections/news-section";
import { CTA } from "@/components/sections/cta";
import { TrustedBy } from "@/components/sections/trusted-by";

export default async function HomePage() {
  const [hero, produk, fasilitas, berita, sertifikasi] = await Promise.all([
    fetchSanity<any>(qHero),
    fetchSanity<any[]>(qAllProduk),
    fetchSanity<any[]>(qAllFasilitas),
    fetchSanity<any[]>(qLatestBerita),
    fetchSanity<any[]>(qAllSertifikasi)
  ]);

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      {hero && <Hero {...hero} />}
      
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