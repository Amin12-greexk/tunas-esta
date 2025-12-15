// src/app/(marketing)/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import {
  qHero,
  qAllProduk,
  qLatestBerita,
  qAllSertifikasi,
  qPageBySlug,
} from "@/lib/sanity.queries";
import { Hero } from "@/components/sections/hero";
import { ProductShowcase, type Product } from "@/components/sections/product-showcase";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { Certifications } from "@/components/sections/certifications";
import { NewsSection } from "@/components/sections/news-section";
import { CTA } from "@/components/sections/cta";
import { TrustedBy } from "@/components/sections/trusted-by";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { SectionSeparator } from "@/components/section-separator";

type HeroData = {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  bgUrls?: string[];
  bgUrl?: string;
};

type Produk = {
  _id: string;
  nama: string;
  deskripsi: string;
  tipe: string;
  ukuran: string;
  fotoUrl?: string;
  slug: string;
};

type Slug = { current: string };

type Article = {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  coverUrl?: string;
  tags?: string[];
  date?: string;
};

type Cert = {
  _id: string;
  nama: string;
  nomor?: string;
  lembaga?: string;
  berlakuSampai?: string;
  fileUrl?: string;
};

type Tentang = {
  title: string;
  body: PortableTextBlock[];
  slug: string;
};

export default async function HomePage() {
  const [hero, produk, berita, sertifikasi, tentang] = await Promise.all([
    fetchSanity<HeroData | null>(qHero),
    fetchSanity<Produk[]>(qAllProduk),
    fetchSanity<Article[]>(qLatestBerita),
    fetchSanity<Cert[]>(qAllSertifikasi),
    fetchSanity<Tentang | null>(qPageBySlug, { slug: "tentang" }),
  ]);

  return (
    <main className="overflow-hidden">
      {/* 1. Hero Section - Dark gradient background */}
      <ScrollAnimationWrapper>{hero && <Hero {...hero} />}</ScrollAnimationWrapper>

      {/* Separator 1: Light zigzag after dark hero */}
      <SectionSeparator variant="zigzag" color="gray" height="md" />

      {/* 2. Tentang Kami Section - Light gradient background */}
      {tentang && (
        <ScrollAnimationWrapper>
          <section className="relative bg-gradient-to-br from-white via-gray-50 to-green-50 py-24">
            {/* Background Elements */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-200 opacity-20 blur-3xl mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-200 opacity-20 blur-3xl mix-blend-multiply animate-pulse delay-1000" />

            <div className="container relative z-10 mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 text-sm font-semibold text-green-700 shadow-sm">
                  Tentang Kami
                </div>
                <h2 className="mb-8 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                  {tentang.title}
                </h2>
                <div className="prose prose-xl mx-auto max-w-4xl text-justify text-gray-700">
                  <PortableText value={tentang.body} />
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="mt-16 grid gap-8 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-2xl">
                    🏆
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Kualitas Premium</h3>
                  <p className="text-gray-600">Standar internasional dengan sertifikasi lengkap</p>
                </div>

                <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl">
                    🌍
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Jangkauan Global</h3>
                  <p className="text-gray-600">Melayani 15+ negara di seluruh dunia</p>
                </div>

                <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-2xl">
                    💪
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Produk Berkualitas</h3>
                  <p className="text-gray-600">Kualitas terbukti</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>
      )}

      {/* Separator 2: Green zigzag transition to stats */}
      <SectionSeparator variant="zigzag" color="green" height="lg" />

      {/* 3. Stats Section - White background */}
      <ScrollAnimationWrapper>
        <Stats />
      </ScrollAnimationWrapper>

      {/* Separator 3: Blue zigzag for visual variety */}
      <SectionSeparator variant="zigzag" color="blue" height="md" />

      {/* 4. Trusted By Section - Light background */}
      <ScrollAnimationWrapper>
        <TrustedBy />
      </ScrollAnimationWrapper>

      {/* Separator 4: Gradient zigzag for premium feel */}
      <SectionSeparator variant="zigzag" color="gradient" height="lg" />

      {/* 5. Features Section - Zinc background */}
      <ScrollAnimationWrapper>
        <Features />
      </ScrollAnimationWrapper>

      {/* Separator 5: Green zigzag leading to products */}
      <SectionSeparator variant="zigzag" color="green" height="md" />

      {/* 6. Product Showcase - Complex gradient background */}
      {produk?.length > 0 && (
        <ScrollAnimationWrapper>
          <ProductShowcase
            products={produk.slice(0, 6).map(
              (p): Product => ({
                _id: p._id,
                title: p.nama,
                description: p.deskripsi,
                slug: { current: p.slug },
              }),
            )}
          />
        </ScrollAnimationWrapper>
      )}

      {/* Separator 6: Blue zigzag for tech transition */}
      <SectionSeparator variant="zigzag" color="blue" height="lg" />

      {/* 7. Certifications - Brand colored background */}
      {sertifikasi?.length > 0 && (
        <ScrollAnimationWrapper>
          <Certifications items={sertifikasi} />
        </ScrollAnimationWrapper>
      )}

      {/* Separator 7: Gray zigzag for neutral transition */}
      <SectionSeparator variant="zigzag" color="gray" height="md" />

      {/* 8. Latest News - Light background */}
      {berita?.length > 0 && (
        <ScrollAnimationWrapper>
          <NewsSection articles={berita.slice(0, 3)} />
        </ScrollAnimationWrapper>
      )}

      {/* Separator 8: Gradient zigzag for final CTA buildup */}
      <SectionSeparator variant="zigzag" color="gradient" height="lg" />

      {/* 9. CTA Section - Dark gradient background */}
      <ScrollAnimationWrapper>
        <CTA />
      </ScrollAnimationWrapper>
    </main>
  );
}

