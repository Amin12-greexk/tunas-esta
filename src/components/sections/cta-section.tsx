// src/components/sections/cta-section.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-600 via-green-600 to-emerald-500 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
        >
          Siap Bermitra dengan{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white">
            Tunas Esta Indonesia
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto"
        >
          Hubungi tim kami untuk mendapatkan informasi produk, sertifikasi, atau
          peluang kerjasama internasional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:info@tunasesta.co.id"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
          >
            <Mail className="w-5 h-5" />
            Email Kami
          </a>
          <a
            href="tel:+621234567890"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/20 border border-white/30 backdrop-blur-sm font-semibold hover:bg-white/30 transition"
          >
            <Phone className="w-5 h-5" />
            +62 123 4567 890
          </a>
          <a
            href="/kontak"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 text-zinc-900 font-bold shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Hubungi Kami
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
