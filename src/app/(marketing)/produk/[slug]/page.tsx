// src/app/(marketing)/produk/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchSanity } from "@/lib/sanity.client";
import { qProdukBySlug, qAllProduk } from "@/lib/sanity.queries";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Award,
  Shield,
  CheckCircle,
  Package,
  Globe,
  Star,
  Download,
  Share2,
} from "lucide-react";

/** ====== Types ====== */
type ProdukListItem = {
  _id: string;
  nama: string;
  slug: string; // qAllProduk -> "slug": slug.current
};

type ProdukDetail = {
  _id: string;
  nama: string;
  deskripsi?: string;
  grade?: string;
  fotoUrl?: string;
  spesifikasi?: string[];
  slug: string; // qProdukBySlug -> "slug": slug.current
};

/** ====== SSG Params ====== */
export async function generateStaticParams() {
  const products = await fetchSanity<ProdukListItem[]>(qAllProduk);
  return products?.map((product) => ({ slug: product.slug })) ?? [];
}

/** ====== Page ====== */
export default async function ProdukDetailPage({
  params,
}: {
  // ⬇️ Perubahan penting: params adalah Promise
  params: Promise<{ slug: string }>;
}) {
  // ⬇️ dan kita await
  const { slug } = await params;

  const product = await fetchSanity<ProdukDetail | null>(qProdukBySlug, {
    slug,
  });

  if (!product) {
    notFound();
  }

  const features = [
    { icon: Shield, label: "100% Natural", desc: "No preservatives or additives" },
    { icon: Award, label: "Premium Grade", desc: `Grade ${product.grade ?? "A"} quality` },
    { icon: Globe, label: "Export Quality", desc: "International standards" },
    { icon: Package, label: "Safe Packaging", desc: "Vacuum sealed freshness" },
  ];

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-8 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/produk" className="hover:text-brand-600 transition-colors">Products</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-zinc-900 font-medium">{product.nama}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-2xl">
                  {product.fotoUrl ? (
                    <>
                      <Image
                        src={product.fotoUrl}
                        alt={product.nama}
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Grade Badge */}
                      <div className="absolute top-6 right-6">
                        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                          <span className="text-lg font-bold text-brand-600">
                            Grade {product.grade ?? "A"}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Award className="w-24 h-24 text-zinc-300" />
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery (placeholder) */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      className={`relative aspect-square rounded-lg overflow-hidden bg-zinc-100 ${
                        i === 1 ? "ring-2 ring-brand-600" : ""
                      }`}
                      aria-label={`Thumbnail ${i}`}
                    >
                      <div className="absolute inset-0 bg-zinc-200" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                  {product.nama}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1" aria-label="Rating 5 of 5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-zinc-600">(5.0) • 100+ Reviews</span>
                </div>
                <p className="text-lg text-zinc-600 leading-relaxed">
                  {product.deskripsi}
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl">
                    <feature.icon className="w-5 h-5 text-brand-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-zinc-900">{feature.label}</p>
                      <p className="text-sm text-zinc-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              {product.spesifikasi?.length ? (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-zinc-900 mb-4">Specifications</h2>
                  <ul className="space-y-3">
                    {product.spesifikasi.map((spec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span className="text-zinc-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/kontak"
                  className="flex-1 px-8 py-4 bg-brand-600 text-white text-center rounded-full font-semibold hover:bg-brand-700 transition-colors shadow-xl hover:shadow-2xl"
                >
                  Get Quote
                </Link>
                <button
                  type="button"
                  className="flex-1 px-8 py-4 bg-white text-brand-600 border-2 border-brand-600 rounded-full font-semibold hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Spec Sheet
                </button>
                <button
                  type="button"
                  className="px-6 py-4 bg-zinc-100 text-zinc-700 rounded-full hover:bg-zinc-200 transition-colors"
                  aria-label="Share Product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-8 border-t">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  HACCP Certified
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  100% Halal
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  ISO 22000:2018
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Details */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
              Why Choose Our {product.nama}?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Quality Assured</h3>
                <p className="text-sm text-zinc-600">
                  Every batch tested for purity and quality standards
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Global Export</h3>
                <p className="text-sm text-zinc-600">
                  Trusted by customers in over 30 countries worldwide
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Premium Grade</h3>
                <p className="text-sm text-zinc-600">
                  Only the finest selection makes it to our products
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
