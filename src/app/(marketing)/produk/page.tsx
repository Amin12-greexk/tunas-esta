// src/app/(marketing)/produk/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qAllProduk } from "@/lib/sanity.queries";
import { ProductCard } from "@/components/product-card";
import { Package, Filter, Search } from "lucide-react";

export default async function ProdukPage() {
  const products = await fetchSanity<any[]>(qAllProduk);

  const categories = ["All", "Grade A", "Grade B", "Grade C", "Special Edition"];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              Premium Collection
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-lg md:text-xl text-brand-100">
              Discover our range of premium bird's nest products, carefully processed to preserve 
              their natural nutrients and exceptional quality
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    category === "All" 
                      ? "bg-brand-600 text-white shadow-lg" 
                      : "bg-white text-zinc-700 hover:bg-brand-50 hover:text-brand-600 border border-zinc-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-zinc-600" />
              <select className="px-4 py-2.5 border border-zinc-200 rounded-xl bg-white text-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Grade: A to C</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          {products?.length ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <div key={product._id || index}>
                    <ProductCard 
                      nama={product.nama}
                      deskripsi={product.deskripsi}
                      grade={product.grade}
                      fotoUrl={product.fotoUrl}
                      spesifikasi={product.spesifikasi}
                    />
                  </div>
                ))}
              </div>

              {/* Load More */}
              {products.length > 8 && (
                <div className="mt-12 text-center">
                  <button className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-brand-600 bg-white border-2 border-brand-600 rounded-full hover:bg-brand-50 transition-colors">
                    Load More Products
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                <Package className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">No products yet</h3>
              <p className="text-zinc-500">Products will be available soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Need Custom Orders?
            </h2>
            <p className="text-lg text-zinc-600 mb-8">
              We offer bulk orders and custom packaging for businesses. Contact our sales team 
              to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontak"
                className="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors shadow-xl hover:shadow-2xl"
              >
                Contact Sales Team
              </a>
              <a
                href="/files/product-catalog.pdf"
                className="px-8 py-4 bg-white text-brand-600 border-2 border-brand-600 rounded-full font-semibold hover:bg-brand-50 transition-colors"
              >
                Download Catalog
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}