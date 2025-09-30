// src/components/sections/features.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Leaf, Award, Microscope, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Natural & Pure",
    description: "No preservatives, additives, or artificial substances. Just pure bird's nest goodness.",
    image: "/api/placeholder/600/400",
  },
  {
    icon: Microscope,
    title: "Lab Tested Quality",
    description: "Every batch undergoes rigorous testing to ensure safety and nutritional value.",
    image: "/api/placeholder/600/400",
  },
  {
    icon: Award,
    title: "Premium Grading",
    description: "Hand-picked and graded to meet the highest international standards.",
    image: "/api/placeholder/600/400",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "Ethically sourced from certified swiftlet houses with eco-friendly practices.",
    image: "/api/placeholder/600/400",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "25+ years of expertise in bird's nest processing and quality control.",
    image: "/api/placeholder/600/400",
  },
  {
    icon: Clock,
    title: "Traditional Methods",
    description: "Time-honored cleaning techniques combined with modern technology.",
    image: "/api/placeholder/600/400",
  },
];

export function Features() {
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
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            The <span className="text-brand-600">TUNAS ESTA</span> Difference
          </h2>
          <p className="text-lg text-zinc-600">
            We combine traditional expertise with modern technology to deliver the finest bird's nest products
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                      <feature.icon className="w-6 h-6 text-brand-600" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}