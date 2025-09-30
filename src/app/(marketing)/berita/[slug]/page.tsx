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
  Tag
} from "lucide-react";

export async function generateStaticParams() {
  const articles = await fetchSanity<any[]>(qAllBerita);
  return articles?.map((article) => ({
    slug: article.slug.current,
  })) || [];
}

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchSanity<any>(qBeritaBySlug, { slug: params.slug });
  
  if (!article) {
    notFound();
  }

  // Get related articles
  const relatedArticles = await fetchSanity<any[]>(qAllBerita);
  const filtered = relatedArticles?.filter(a => a.slug.current !== params.slug).slice(0, 3);

  // Estimate reading time
  const wordCount = article.body?.reduce((count: number, block: any) => {
    if (block._type === 'block' && block.children) {
      return count + block.children.reduce((sum: number, child: any) => 
        sum + (child.text?.split(' ').length || 0), 0
      );
    }
    return count;
  }, 0) || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-zinc-100 to-white">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-600 mb-8">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/berita" className="hover:text-brand-600 transition-colors">News</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-zinc-900 font-medium truncate max-w-xs">{article.title}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              {/* Tags */}
              {article.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-sm font-medium"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-zinc-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Admin</span>
                </div>
                {article.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{format(new Date(article.date), "MMMM d, yyyy")}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {/* Share Buttons */}
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
            {article.coverUrl && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              {article.excerpt && (
                <p className="text-xl text-zinc-600 leading-relaxed mb-8">
                  {article.excerpt}
                </p>
              )}
              {article.body && <PortableText value={article.body} />}
            </article>

            {/* Article Footer */}
            <footer className="py-8 border-t border-b">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((tag: string) => (
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

      {/* Related Articles */}
      {filtered && filtered.length > 0 && (
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
                        {related.coverUrl && (
                          <Image
                            src={related.coverUrl}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-zinc-600 line-clamp-2 mb-4">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <span>{format(new Date(related.date), "MMM d, yyyy")}</span>
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
      )}
    </main>
  );
}