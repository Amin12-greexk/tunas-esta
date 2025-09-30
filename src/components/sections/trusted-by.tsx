// src/components/sections/trusted-by.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Partner 1", logo: "/api/placeholder/200/80" },
  { name: "Partner 2", logo: "/api/placeholder/200/80" },
  { name: "Partner 3", logo: "/api/placeholder/200/80" },
  { name: "Partner 4", logo: "/api/placeholder/200/80" },
  { name: "Partner 5", logo: "/api/placeholder/200/80" },
  { name: "Partner 6", logo: "/api/placeholder/200/80" },
];

export function TrustedBy() {
  return (
    <section className="py-16 bg-white border-y">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-lg font-semibold text-zinc-600 mb-2">
            Trusted by Leading Companies Worldwide
          </h3>
          <p className="text-sm text-zinc-500">
            Our products are exported to premium retailers and distributors globally
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={80}
                className="w-full h-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}