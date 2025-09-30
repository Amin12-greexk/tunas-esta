"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag, TrendingUp, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

type NewsCardProps = {
  _id?: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverUrl?: string;
  tags?: string[];
  date?: string;
  index?: number;
  viewCount?: number;
  featured?: boolean;
};

export function NewsCard({ 
  title, 
  slug, 
  excerpt, 
  coverUrl, 
  tags, 
  date, 
  index = 0,
  viewCount = 0,
  featured = false
}: NewsCardProps) {
  // Estimate reading time based on excerpt length
  const readingTime = excerpt ? Math.ceil(excerpt.split(' ').length / 200) : 3;
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/berita/${slug.current}`} className="block h-full">
        <div className={`relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
          featured ? 'ring-2 ring-brand-500 ring-offset-2' : ''
        }`}>
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4 z-20">
              <div className="px-3 py-1.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <TrendingUp className="w-3 h-3" />
                Featured
              </div>
            </div>
          )}
          
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
            {coverUrl ? (
              <>
                <Image
                  src={coverUrl}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Image Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Play Icon for Video Articles */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-6 h-6 text-brand-600 ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-100 to-brand-200">
                <svg className="w-16 h-16 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" 
                  />
                </svg>
              </div>
            )}
            
            {/* Category Badge */}
            {tags && tags.length > 0 && (
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-600 shadow-md">
                  <Tag className="w-3 h-3" />
                  {tags[0]}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
            {/* Date & Meta Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                {date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(date), "MMM d, yyyy")}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </span>
              </div>
              {viewCount > 0 && (
                <span className="flex items-center gap-1 text-sm text-zinc-500">
                  <Eye className="w-4 h-4" />
                  {viewCount.toLocaleString()}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-zinc-900 mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-zinc-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                {excerpt}
              </p>
            )}

            {/* Tags */}
            {tags && tags.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(1, 4).map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 bg-zinc-100 hover:bg-brand-50 text-zinc-600 hover:text-brand-600 text-xs rounded-full transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="px-2.5 py-1 bg-zinc-100 text-zinc-500 text-xs rounded-full">
                    +{tags.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Read More Link */}
            <div className="mt-auto pt-4 border-t border-zinc-100">
              <span className="inline-flex items-center gap-2 text-brand-600 font-semibold group-hover:text-brand-700 transition-colors">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.article>
  );
}