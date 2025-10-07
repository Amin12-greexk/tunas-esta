// src/app/(marketing)/tentang/apa-itu-sarang-burung-walet/content.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, Shield, Star, Award, Leaf, Droplet, Clock,
  CheckCircle, ArrowRight, Play, BookOpen, Globe,
  Microscope, Factory, Users, TrendingUp, ChevronLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ApaItuSarangBurungWaletContent() {
  const [activeSection, setActiveSection] = useState<"pengertian"|"manfaat"|"kandungan"|"jenis"|"proses">("pengertian");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal-on-scroll untuk section utama
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-10 md:py-14">
        {/* fixed: tailwind arbitrary value untuk radial gradient */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.12),transparent_60%)]" />

        <div className="container">
          {/* Breadcrumb — samakan gaya dengan berita/[slug] */}
          <nav className="flex items-center gap-2 text-sm text-zinc-600 mb-6">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/tentang" className="hover:text-emerald-600 transition-colors">Tentang</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-zinc-900 font-medium truncate max-w-xs md:max-w-md">
              Apa itu Sarang Burung Walet?
            </span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              >
                Apa itu <span className="text-emerald-600">Sarang Burung Walet</span>?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="mt-4 text-zinc-600 leading-relaxed"
              >
                Ringkasan singkat mengenai pengertian, manfaat, kandungan, hingga proses pengolahan
                sarang walet berkualitas premium.
              </motion.p>

              <div className="mt-6 flex items-center gap-3">
                {/* anchor ke #manfaat (anchor ditempatkan sebelum tabs di bawah) */}
                <Link
                  href="#manfaat"
                  className="inline-flex items-center rounded-2xl px-4 py-2 border border-emerald-600 hover:bg-emerald-50 transition"
                >
                  Jelajahi Manfaat <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/produk"
                  className="inline-flex items-center rounded-2xl px-4 py-2 border hover:bg-zinc-50 transition"
                >
                  Lihat Produk
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src="/images/hero-walet.jpg"
                alt="Sarang burung walet"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs ringkas */}
      <section className="container" ref={sectionRef}>
        {/* anchor target untuk tombol 'Jelajahi Manfaat' */}
        <span id="manfaat" className="block -mt-24 pt-24" />

        <div className="mt-2 overflow-x-auto no-scrollbar">
          <div className="inline-flex gap-2 rounded-2xl border bg-white p-1 shadow-sm">
            {[
              { id: "pengertian", label: "Pengertian", icon: BookOpen },
              { id: "manfaat", label: "Manfaat", icon: Heart },
              { id: "kandungan", label: "Kandungan", icon: Droplet },
              { id: "jenis", label: "Jenis & Grade", icon: Star },
              { id: "proses", label: "Proses", icon: Factory },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as typeof activeSection)}
                  className={[
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition",
                    active ? "bg-emerald-600 text-white" : "hover:bg-zinc-50"
                  ].join(" ")}
                  type="button"
                  aria-pressed={active}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section content */}
        <div className="mt-10">
          {activeSection === "pengertian" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isVisible ? 1 : 0.6, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Pengertian</h2>
                <p className="mt-3 text-zinc-600">
                  Sarang burung walet (edible bird’s nest) adalah produk alami yang terbentuk dari
                  air liur walet yang mengeras. Secara tradisional digunakan dalam kuliner & kesehatan.
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="font-medium flex items-center gap-2"><Shield className="h-4 w-4" /> Keaslian</h3>
                <p className="mt-2 text-zinc-600">
                  Kualitas ditentukan dari sumber rumah walet, metode panen, dan proses pembersihan.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === "manfaat" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: Heart, title: "Kebugaran", desc: "Mendukung pemulihan & vitalitas." },
                { icon: Award, title: "Kualitas Kulit", desc: "Membantu hidrasi & elastisitas." },
                { icon: Clock, title: "Rutinitas Sehat", desc: "Dikonsumsi sesuai anjuran." },
              ].map((it) => {
                const Icon = it.icon;
                return (
                  <div key={it.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                    <Icon className="h-5 w-5" />
                    <h3 className="mt-3 font-medium">{it.title}</h3>
                    <p className="mt-2 text-zinc-600">{it.desc}</p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeSection === "kandungan" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">Kandungan Nutrisi</h2>
              <ul className="mt-3 grid md:grid-cols-2 gap-2 text-zinc-600">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Protein & asam amino</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Mineral & mikronutrien</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Komponen bioaktif</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Rendah lemak</li>
              </ul>
            </motion.div>
          )}

          {activeSection === "jenis" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="font-medium flex items-center gap-2"><Star className="h-4 w-4" /> Jenis & Grade</h3>
                <p className="mt-2 text-zinc-600">
                  Penilaian umum berdasarkan bentuk (mangkok/oval/patah) dan tingkat kebersihan.
                </p>
              </div>
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="font-medium flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Standar Mutu</h3>
                <p className="mt-2 text-zinc-600">
                  Disortir, dicuci, dibersihkan manual; hindari pemutih/perekat kimia.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === "proses" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { title: "Panen & Sortir", desc: "Seleksi awal menjaga kualitas awal sarang." },
                { title: "Pembersihan", desc: "Penghilangan bulu/impuritas secara hati-hati." },
                { title: "Pengeringan & QC", desc: "Pengeringan terukur & pemeriksaan akhir." },
              ].map((s) => (
                <div key={s.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="mt-2 text-zinc-600">{s.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 bg-white border-t">
        <div className="container py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold">Siap mengenal lebih jauh?</h2>
              <p className="mt-2 text-zinc-600">
                Tim kami siap membantu mulai dari edukasi hingga konsultasi produk.
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/kontak"
                  className="inline-flex items-center rounded-2xl px-4 py-2 border border-emerald-600 hover:bg-emerald-50 transition"
                >
                  Hubungi Kami <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/produk"
                  className="inline-flex items-center rounded-2xl px-4 py-2 border hover:bg-zinc-50 transition"
                >
                  Jelajahi Produk
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="relative aspect-video w-full rounded-2xl overflow-hidden border bg-zinc-50"
            >
              <Image
                src="/images/cta-walet.jpg"
                alt="Proses pengolahan sarang walet"
                fill
                className="object-cover"
              />
              <button
                type="button"
                aria-label="Play Video"
                className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow"
              >
                <Play className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
