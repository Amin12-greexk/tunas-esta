"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Award } from "lucide-react";
import { useState } from "react";

type Product = {
  nama: string;
  deskripsi: string;
  grade: string;
  fotoUrl?: string;
  slug?: string;
};

export function ProductShowcase({ products }: { products: Product[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 to-white">
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
            Our Premium Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Excellence in Every
            <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent"> Grade</span>
          </h2>
          <p className="text-lg text-zinc-600">
            Discover our carefully curated selection of premium bird's nest products, 
            each grade meticulously processed to maintain the highest quality standards.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                  {product.fotoUrl ? (
                    <Image
                      src={product.fotoUrl}
                      alt={product.nama}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-zinc-400">
                        <Award className="w-16 h-16" />
                      </div>
                    </div>
                  )}
                  
                  {/* Grade Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                      <span className="text-sm font-bold text-brand-600">
                        Grade {product.grade}
                      </span>
                    </div>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {product.nama}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-zinc-600 ml-2">(5.0)</span>
                  </div>

                  <p className="text-zinc-600 mb-4 line-clamp-2">
                    {product.deskripsi}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/produk/${product.slug || '#'}`}
                    className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                  >
                    Learn More
                    <ChevronRight className={`w-4 h-4 transition-transform ${hoveredIndex === index ? 'translate-x-1' : ''}`} />
                  </Link>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-full hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            View All Products
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}