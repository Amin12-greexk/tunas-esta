"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";

type NewsArticle = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverUrl?: string;
  date?: string;
  tags?: string[];
};

export function NewsSection({ articles }: { articles: NewsArticle[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-zinc-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            News & Insights
          </h2>
          <p className="text-lg text-zinc-600">
            Stay updated with the latest developments, industry trends, and company achievements
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.article
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/berita/${article.slug.current}`}>
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-brand-100 to-brand-200 overflow-hidden">
                    {article.coverUrl ? (
                      <Image
                        src={article.coverUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <svg className="w-12 h-12 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Tag */}
                    {article.tags && article.tags[0] && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-600">
                          {article.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-3 text-sm text-zinc-500">
                      {article.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(article.date), "MMM d, yyyy")}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        3 min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-zinc-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Read More */}
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-full hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}