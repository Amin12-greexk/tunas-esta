"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

type HeroProps = {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  bgUrl?: string;     // single (legacy)
  bgUrls?: string[];  // multiple (slideshow)
  videoUrl?: string;
  intervalMs?: number; // default 6000
};

export function Hero({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  bgUrl,
  bgUrls,
  videoUrl,
  intervalMs = 6000,
}: HeroProps) {
  const images = useMemo(() => {
    const arr = (bgUrls?.filter(Boolean) ?? (bgUrl ? [bgUrl] : [])) as string[];
    return Array.from(new Set(arr)).filter(Boolean);
  }, [bgUrl, bgUrls]);

  const [index, setIndex] = useState(0);

  // auto-rotate slideshow
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* pattern grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      {/* background slideshow (mengikuti overlay referensi kamu) */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {images.length > 0 && (
            <motion.div
              key={images[index]}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <Image
                src={images[index]}
                alt="Hero background"
                fill
                className="object-cover opacity-30"  // ← sama seperti referensi
                priority
                quality={90}
              />
              {/* overlay hitam seperti referensi */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* bullets */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === index ? "bg-green-400 scale-110" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* floating elements (brand hijau) */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* content */}
      <div className="relative z-10 container">
        <div className="max-w-6xl mx-auto text-center">
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full backdrop-blur-sm text-green-300 font-semibold"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Premium Bird&apos;s Nest
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
              {headline}
            </span>
          </motion.h1>

          {/* subheadline */}
          {subheadline && (
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-zinc-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subheadline}
            </motion.p>
          )}

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl shadow-green-600/20 hover:shadow-green-600/35 hover:scale-105"
              >
                <span>{ctaText}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {videoUrl && (
              <button
                className="group inline-flex items-center gap-3 px-8 py-4 font-medium text-white border-2 border-white/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="white" />
                </div>
                <span>Watch Our Story</span>
              </button>
            )}
          </motion.div>

          {/* trust indicators (opsional, tetap hijau) */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>ISO 22000:2018</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Healthy</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}