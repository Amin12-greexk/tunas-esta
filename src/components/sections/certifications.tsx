// src/components/sections/certifications.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Shield, CheckCircle } from "lucide-react";

type Certification = {
  nama: string;
  lembaga?: string;
  fileUrl?: string;
};

export function Certifications({ items }: { items: Certification[] }) {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-white rounded-full">
            Quality Assurance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Internationally <span className="text-brand-600">Certified</span> Excellence
          </h2>
          <p className="text-lg text-zinc-600">
            Our commitment to quality is validated by leading international certification bodies
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((cert, index) => (
            <motion.div
              key={cert.nama}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-brand-600 bg-brand-100 rounded-full group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {cert.nama}
                </h3>
                {cert.lembaga && (
                  <p className="text-sm text-zinc-600">
                    {cert.lembaga}
                  </p>
                )}
                <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-4" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/sertifikasi"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
          >
            View All Certifications
            <Award className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}