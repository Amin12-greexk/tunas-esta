"use client";

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type BirdProps = {
  /** dari 0–1: seberapa jauh burungnya melintas layar saat full scroll */
  travel?: number;
  /** posisi vertikal relatif section (px) */
  y: number;
  /** ukuran skala burung */
  scale?: number;
  /** delay kecil biar timing tiap burung beda */
  offset?: number;
  /** arah terbang: 1 ke kanan, -1 ke kiri */
  dir?: 1 | -1;
  /** opacity burung */
  opacity?: number;
};

function Bird({
  travel = 1,
  y,
  scale = 1,
  offset = 0,
  dir = 1,
  opacity = 0.9,
}: BirdProps) {
  // tarik progress scroll halaman
  const { scrollYProgress } = useScroll();

  // x akan bergerak dari -20% -> 120% (atau kebalikan) supaya benar2 melintas
  const start = dir === 1 ? "-20vw" : "120vw";
  const end = dir === 1 ? "120vw" : "-20vw";

  // geser horizontal berdasar progress; offset bikin beda timing antar burung
  const x = useTransform(
    scrollYProgress,
    [0 + offset, Math.min(1, travel + offset)],
    [start, end]
  );

  // sedikit parallax rotasi sayap (sekadar garnish)
  const flap = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: y,
        x,
        scale,
        opacity,
        pointerEvents: "none",
      }}
    >
      {/* Burung SVG minimalis (2 sayap + badan) */}
      <motion.svg
        width="80"
        height="40"
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: dir === 1 ? 0 : 180 }}
      >
        {/* badan */}
        <path d="M32 22 C40 18, 52 18, 60 22 C52 26, 40 26, 32 22Z" fill="white" />
        {/* sayap kiri */}
        <motion.path
          d="M32 22 C24 16, 14 12, 6 14 C14 18, 24 22, 32 22Z"
          fill="white"
          style={{ rotate: flap }}
          transform="translate(0 -6)"
        />
        {/* sayap kanan */}
        <motion.path
          d="M60 22 C68 16, 74 12, 78 14 C72 18, 64 22, 60 22Z"
          fill="white"
          style={{ rotate: flap }}
          transform="translate(0 -6)"
        />
        {/* mata kecil */}
        <circle cx="50" cy="20" r="1.5" fill="#0b5" />
      </motion.svg>
    </motion.div>
  );
}

export default function DemoBurungPage() {
  // daftar burung dengan variasi posisi & kecepatan
  const birds = useMemo(
    (): BirdProps[] => [
      { y: 80, scale: 0.9, offset: 0.0, travel: 0.9, dir: 1, opacity: 0.9 },
      { y: 140, scale: 0.7, offset: 0.05, travel: 0.85, dir: -1, opacity: 0.85 },
      { y: 220, scale: 1.1, offset: 0.1, travel: 0.8, dir: 1, opacity: 0.95 },
      { y: 300, scale: 0.8, offset: 0.15, travel: 0.75, dir: -1, opacity: 0.9 },
      { y: 380, scale: 0.6, offset: 0.2, travel: 0.7, dir: 1, opacity: 0.8 },
    ],
    []
  );

  return (
    <main className="min-h-[200vh] bg-white text-zinc-800">
      {/* SECTION 1: hero biasa buat nge-scroll */}
      <section className="container py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Demo “Burung Terbang” Saat Scroll
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Scroll ke bawah untuk melihat burung-burung melintas di area hijau.
          Efek ini sinkron dengan posisi scroll (bukan timer), jadi responsif
          terhadap kecepatan gulir user.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-xl border bg-white">
            <h3 className="font-semibold">Apa yang dipakai?</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-zinc-600">
              <li>Framer Motion: <code>useScroll</code> & <code>useTransform</code></li>
              <li>SVG burung sederhana</li>
              <li>Tailwind untuk layout</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border bg-white">
            <h3 className="font-semibold">Cara pindah ke section hijau</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Burung hanya muncul di section hijau. Gulir terus untuk melihat
              animasinya.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: area hijau dengan burung terbang */}
      <section className="relative min-h-[120vh] overflow-hidden">
        {/* background hijau */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700" />
        {/* dekor blur elips */}
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-36 -right-24 w-[32rem] h-[32rem] bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 container py-28 text-center text-white">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/15 rounded-full">
            Area Hijau (Scroll Reactive)
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Burung Terbang Mengikuti Scroll
          </h2>
          <p className="max-w-2xl mx-auto text-green-50/90">
            Setiap burung punya kecepatan dan jalur horizontal berbeda, sehingga
            kelihatan alami. Kamu bisa ubah jumlah burung, skala, arah, dan
            timing di array <code>birds</code>.
          </p>
        </div>

        {/* render flock */}
        {birds.map((b, i) => (
          <Bird key={i} {...b} />
        ))}
      </section>

      {/* SECTION 3: konten penutup */}
      <section className="container py-24">
        <h3 className="text-2xl font-bold">Integrasi ke halamanmu</h3>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-zinc-600">
          <li>Copy komponen <code>Bird</code> & daftar <code>birds</code>.</li>
          <li>
            Bungkus area hijau yang kamu mau dengan container{" "}
            <code>relative min-h-...</code>, lalu render <code>&lt;Bird /&gt;</code> di dalamnya.
          </li>
          <li>
            Sesuaikan warna gradient, jumlah burung, dan parameter{" "}
            <code>travel / offset / dir / scale</code>.
          </li>
        </ol>
      </section>
    </main>
  );
}
