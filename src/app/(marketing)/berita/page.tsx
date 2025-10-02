// src/app/(marketing)/berita/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qAllBerita } from "@/lib/sanity.queries";
import { NewsCard } from "@/components/news-card";

// Minimal type untuk items berita (samakan dengan field yang dikembalikan qAllBerita)
type Slug = { current: string };

type Article = {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  coverUrl?: string;
  date?: string;
  tags?: string[];
};

export default async function BeritaPage() {
  const berita = await fetchSanity<Article[]>(qAllBerita);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              News & Updates
            </h1>
            <p className="text-lg md:text-xl text-brand-100">
              Stay informed with the latest developments, industry insights, and company announcements from TUNAS ESTA INDONESIA
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {["All", "Company News", "Industry", "Export", "Certification", "Events"].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  category === "All"
                    ? "bg-brand-600 text-white shadow-lg"
                    : "bg-white text-zinc-700 hover:bg-brand-50 hover:text-brand-600 border border-zinc-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          {berita?.length ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {berita.map((item, index) => (
                <NewsCard key={item._id ?? index} {...item} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">No news articles yet</h3>
              <p className="text-zinc-500">Check back later for updates</p>
            </div>
          )}

          {/* Load More */}
          {berita?.length > 6 && (
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-brand-600 bg-white border-2 border-brand-600 rounded-full hover:bg-brand-50 transition-colors">
                Load More Articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
