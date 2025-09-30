"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import { useState } from "react";

type HeroProps = {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  bgUrl?: string;
  videoUrl?: string;
};

export function Hero({ headline, subheadline, ctaText, ctaHref, bgUrl, videoUrl }: HeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      
      {/* Background Image with Parallax */}
      {bgUrl && (
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src={bgUrl}
            alt="Hero background"
            fill
            className="object-cover opacity-30"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        </motion.div>
      )}

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 container">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 rounded-full backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Premium Indonesian Bird's Nest Since 1998
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-brand-200 to-white bg-clip-text text-transparent">
              {headline}
            </span>
          </motion.h1>

          {/* Subheadline */}
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

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-full hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-2xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105"
              >
                <span>{ctaText}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
            {videoUrl && (
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 font-medium text-white border-2 border-white/20 rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="white" />
                </div>
                <span>Watch Our Story</span>
              </button>
            )}
          </motion.div>

          {/* Trust Indicators */}
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
              <span>HACCP Certified</span>
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
              <span>100% Halal</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}