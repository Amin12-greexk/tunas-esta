// src/app/(marketing)/berita/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchSanity } from "@/lib/sanity.client";
import { qBeritaBySlug, qAllBerita } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
} from "lucide-react";
import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

/** ==== Types ==== */
type Slug = { current: string };

type Article = {
  _id: string;
  title: string;
  slug: Slug;
  date?: string;
  coverUrl?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  tags?: string[];
};

/** SSG params */
export async function generateStaticParams() {
  const articles = await fetchSanity<Article[]>(qAllBerita);
  return (articles ?? []).map((article) => ({
    slug: article.slug.current,
  }));
}

// Next.js 15 requires async params
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BeritaDetailPage({ params }: Props) {
  // Await the params
  const { slug } = await params;
  
  const article = await fetchSanity<Article | null>(qBeritaBySlug, {
    slug: slug,
  });

  if (!article) {
    notFound();
  }

  // Related articles
  const relatedArticles = await fetchSanity<Article[]>(qAllBerita);
  const filtered =
    (relatedArticles ?? [])
      .filter((a) => a.slug.current !== slug)
      .slice(0, 3);

  // Estimasi reading time (tanpa any)
  const wordCount: number =
    (article.body ?? []).reduce((count: number, block: PortableTextBlock) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        const children = block.children as PortableTextSpan[];
        const wordsInBlock = children.reduce((sum, child) => {
          const text = typeof child.text === "string" ? child.text : "";
          const words = text.trim().split(/\s+/).filter(Boolean).length;
          return sum + words;
        }, 0);
        return count + wordsInBlock;
      }
      return count;
    }, 0) ?? 0;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-zinc-100 to-white">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-600 mb-8">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              Home
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/berita" className="hover:text-brand-600 transition-colors">
              News
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-zinc-900 font-medium truncate max-w-xs">
              {article.title}
            </span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              {article.tags?.length ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-sm font-medium"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-zinc-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Admin</span>
                </div>
                {article.date ? (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{format(new Date(article.date), "MMMM d, yyyy")}</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                <span className="text-sm font-medium text-zinc-700">Share:</span>
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-zinc-200 text-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-300 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Featured Image */}
            {article.coverUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}

            {/* Content */}
            <article className="prose prose-lg max-w-none mb-12">
              {article.excerpt ? (
                <p className="text-xl text-zinc-600 leading-relaxed mb-8">
                  {article.excerpt}
                </p>
              ) : null}
              {article.body ? <PortableText value={article.body} /> : null}
            </article>

            {/* Footer */}
            <footer className="py-8 border-t border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/berita?tag=${tag}`}
                      className="px-3 py-1 bg-zinc-100 hover:bg-brand-50 text-zinc-700 hover:text-brand-600 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share Article
                </button>
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Related */}
      {filtered.length > 0 ? (
        <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {filtered.map((related) => (
                  <Link
                    key={related._id}
                    href={`/berita/${related.slug.current}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative h-48 bg-zinc-100">
                        {related.coverUrl ? (
                          <Image
                            src={related.coverUrl}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : null}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                          {related.title}
                        </h3>
                        {related.excerpt ? (
                          <p className="text-sm text-zinc-600 line-clamp-2 mb-4">
                            {related.excerpt}
                          </p>
                        ) : null}
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          {related.date ? (
                            <span>{format(new Date(related.date), "MMM d, yyyy")}</span>
                          ) : null}
                          <span>3 min read</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}