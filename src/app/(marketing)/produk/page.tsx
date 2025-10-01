// src/app/(marketing)/produk/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qAllProduk } from "@/lib/sanity.queries";
import { ProductCard } from "@/components/product-card";
import { Package, Filter, Search } from "lucide-react";

export default async function ProdukPage() {
  const products = await fetchSanity<any[]>(qAllProduk);

  const categories = [
    "All", 
    "Oval", 
    "Sudut", 
    "Patahan & Fragments", 
    "Pure Nest", 
    "Mangkok"
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-green-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              Koleksi Premium
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Produk Sarang Walet
            </h1>
            <p className="text-lg md:text-xl text-green-100">
              Temukan berbagai produk sarang walet premium kami, diproses dengan hati-hati 
              untuk mempertahankan nutrisi alami dan kualitas terbaik
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          {products?.length ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <div key={product._id || index}>
                    <ProductCard 
                      nama={product.nama}
                      deskripsi={product.deskripsi}
                      fotoUrl={product.fotoUrl}
                      spesifikasi={product.spesifikasi}
                    />
                  </div>
                ))}
              </div>

              {/* Load More */}
              {products.length > 8 && (
                <div className="mt-12 text-center">
                  <button className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-green-600 bg-white border-2 border-green-600 rounded-full hover:bg-green-50 transition-colors">
                    Muat Lebih Banyak Produk
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gray-100 rounded-full">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada produk</h3>
              <p className="text-gray-500">Produk akan segera tersedia.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Butuh Pesanan Khusus?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Kami melayani pesanan dalam jumlah besar dan kemasan khusus untuk kebutuhan bisnis. 
              Hubungi tim sales kami untuk mendiskusikan kebutuhan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontak"
                className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors shadow-xl hover:shadow-2xl"
              >
                Hubungi Tim Sales
              </a>
              <a
                href="/files/product-catalog.pdf"
                className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-full font-semibold hover:bg-green-50 transition-colors"
              >
                Download Katalog
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}