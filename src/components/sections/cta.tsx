// src/components/sections/cta.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              Get Started Today
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Experience
              <span className="block mt-2">Premium Quality?</span>
            </h2>
            <p className="text-lg md:text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers worldwide. Get in touch with our team 
              to discuss your requirements and receive a personalized quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/kontak"
                className="group inline-flex items-center gap-2 px-8 py-4 font-semibold text-brand-600 bg-white rounded-full hover:bg-brand-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="tel:+622111234567"
                className="inline-flex items-center gap-2 px-8 py-4 font-medium text-white border-2 border-white/30 rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                +62 21 1234 5678
              </a>
              
              <a
                href="mailto:info@tunasesta.co.id"
                className="inline-flex items-center gap-2 px-8 py-4 font-medium text-white border-2 border-white/30 rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-brand-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24-Hour Response</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Worldwide Shipping</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}