import { fetchSanity } from "@/lib/sanity.client";
import { qHero, qPageBySlug } from "@/lib/sanity.queries";
import { Hero } from "@/components/sections/hero";
import { PortableText } from "@portabletext/react";

export default async function HomePage() {
  const [hero, tentang] = await Promise.all([
    fetchSanity<any>(qHero),
    fetchSanity<any>(qPageBySlug, { slug: "tentang" }),
  ]);

  return (
    <main>
      {/* Hero Section */}
      {hero ? (
        <Hero {...hero} />
      ) : (
        <div className="p-12 text-center text-zinc-500">Belum ada konten Hero</div>
      )}

      {/* Tentang Kami Section */}
      {tentang && (
        <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
          <div className="container max-w-5xl">
            <span className="inline-block mb-4 px-4 py-1.5 text-sm font-semibold text-green-700 bg-green-50 rounded-full">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              {tentang.title}
            </h2>
            <div className="prose prose-zinc max-w-none">
              <PortableText value={tentang.body} />
            </div>

            <div className="mt-8">
              <a
                href="/tentang"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Pelajari lebih lanjut
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
