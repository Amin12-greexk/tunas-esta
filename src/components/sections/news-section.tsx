// src/components/sections/news-section.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { format } from "date-fns";

type Article = {
  _id?: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverUrl?: string;
  date?: string;
  tags?: string[];
};

export function NewsSection({ articles }: { articles: Article[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            News & <span className="text-brand-600">Insights</span>
          </h2>
          <p className="text-lg text-zinc-600">
            Stay updated with the latest news, industry insights, and company announcements
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.article
              key={article._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/berita/${article.slug.current}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 bg-gradient-to-br from-zinc-100 to-zinc-200">
                    {article.coverUrl ? (
                      <Image
                        src={article.coverUrl}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Newspaper className="w-12 h-12 text-zinc-400" />
                      </div>
                    )}
                    
                    {article.tags && article.tags[0] && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-600">
                          {article.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {article.date && (
                      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(article.date), "MMM d, yyyy")}</span>
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-zinc-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}

                    <span className="inline-flex items-center gap-2 text-brand-600 font-semibold group-hover:text-brand-700 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-full hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}