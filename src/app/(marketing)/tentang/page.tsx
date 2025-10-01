// src/app/(marketing)/tentang/page.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, Users, Globe, TrendingUp, Award, History, Target, Heart } from "lucide-react";
import Image from "next/image";
import { Stats } from "@/components/sections/stats";

const milestones = [
  { year: "1998", title: "Company Founded", description: "Started as a small family business in Kudus" },
  { year: "2005", title: "Export Expansion", description: "First international shipment to Hong Kong" },
  { year: "2010", title: "ISO Certification", description: "Achieved ISO 22000:2018 certification" },
  { year: "2015", title: "Modern Facility", description: "Opened state-of-the-art processing facility" },
  { year: "2020", title: "Global Recognition", description: "Exported to over 30 countries worldwide" },
  { year: "2024", title: "Industry Leader", description: "Became Indonesia's leading bird's nest exporter" },
];

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards in every process, from sourcing to packaging."
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We build lasting relationships based on trust."
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Committed to eco-friendly practices and sustainable sourcing methods."
  },
  {
    icon: Users,
    title: "Community",
    description: "Supporting local farmers and contributing to community development."
  },
];

export default function TentangPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              Est. 1998
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              About <span className="text-brand-200">TUNAS ESTA</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-3xl mx-auto">
              Leading Indonesia's bird's nest industry with over 25 years of excellence, 
              innovation, and commitment to quality that meets international standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
                From Humble Beginnings to Global Excellence
              </h2>
              <div className="space-y-4 text-zinc-600">
                <p>
                  PT TUNAS ESTA INDONESIA was founded in 1998 with a simple vision: to bring 
                  the finest Indonesian bird's nest products to the world. What started as a 
                  small family business in Kudus has grown into one of Indonesia's leading 
                  exporters.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, unwavering commitment 
                  to quality, and deep respect for traditional methods. We've invested in 
                  state-of-the-art facilities while maintaining the artisanal care that makes 
                  our products exceptional.
                </p>
                <p>
                  Today, we export to over 30 countries, serving premium markets with products 
                  that represent the very best of Indonesian bird's nest heritage.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/api/placeholder/800/600"
                  alt="TUNAS ESTA Facility"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl font-bold">Since 1998</p>
                  <p className="text-brand-200">Trusted by millions worldwide</p>
                </div>
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-zinc-900">ISO 22000</p>
                    <p className="text-sm text-zinc-600">Certified Excellence</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
              Vision & Mission
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Our Vision</h3>
              <p className="text-zinc-600">
                To be the global leader in premium bird's nest products, setting the standard 
                for quality, sustainability, and innovation in the industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Our Mission</h3>
              <p className="text-zinc-600">
                To deliver exceptional bird's nest products through sustainable practices, 
                advanced technology, and unwavering commitment to customer satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to customer service
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 text-brand-600 bg-brand-50 rounded-xl group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-zinc-600">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-200" />

              {/* Timeline Items */}
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start mb-8"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 w-4 h-4 bg-brand-600 rounded-full -translate-x-1/2">
                    <div className="absolute inset-0 bg-brand-600 rounded-full animate-ping" />
                  </div>

                  {/* Content */}
                  <div className="ml-20 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-bold mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-zinc-600">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
              Our People
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Meet the experienced professionals leading TUNAS ESTA to continued success
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { name: "Budi Santoso", role: "Chief Executive Officer", image: "/api/placeholder/400/400" },
              { name: "Siti Nurhaliza", role: "Chief Operating Officer", image: "/api/placeholder/400/400" },
              { name: "Ahmad Wijaya", role: "Chief Quality Officer", image: "/api/placeholder/400/400" },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-80 bg-gradient-to-br from-zinc-100 to-zinc-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-brand-200">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-lg text-brand-100 mb-8">
              Join thousands of satisfied customers who trust TUNAS ESTA for premium bird's nest products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/produk"
                className="px-8 py-4 bg-white text-brand-600 rounded-full font-semibold hover:bg-brand-50 transition-colors shadow-xl hover:shadow-2xl"
              >
                Explore Products
              </a>
              <a
                href="/kontak"
                className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}