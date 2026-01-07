// src/app/(marketing)/karier/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchSanity } from "../../../lib/sanity.client";
import { qAllKarier } from "../../../lib/sanity.queries";
import { JobCard } from "../../../components/job-card";
import { Briefcase, Users, Target, Heart, Clock } from "lucide-react";
import InteractiveBird from "../../../components/visuals/InteractiveBird";
import { useI18n } from "@/lib/i18n";
// import type { AnimationMap } from "../../../components/visuals/InteractiveBird";

type Slug = { current: string };

type Job = {
  _id?: string;
  posisi: string;
  slug: Slug;
  lokasi?: string;
  tipe?: string;
  department?: string;   // ← ditambahkan agar bisa diteruskan ke JobCard
  deskripsi?: unknown;   // daftar Portable Text; tidak dipakai di list
  kualifikasi?: unknown; // idem
  emailTujuan?: string;
};

export default function KarierPage() {
  const [lowongan, setLowongan] = useState<Job[] | null>(null);
  const [activeDept, setActiveDept] = useState("all");
  const { locale, t } = useI18n() as { locale: "id" | "en" | "zh"; t: (k: string, f?: string) => string };

  useEffect(() => {
    let cancelled = false;
    async function getLowongan() {
      try {
        const data = await fetchSanity<Job[]>(qAllKarier, {}, 0, locale);
        if (!cancelled) setLowongan(data);
      } catch (error) {
        console.error("Gagal mengambil data lowongan:", error);
        if (!cancelled) setLowongan([]);
      }
    }
    getLowongan();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const benefits = [
    { icon: Heart, title: t("careers.benefit.health", "Asuransi Kesehatan"), description: t("careers.benefit.health.desc", "Perlindungan medis komprehensif untuk Anda dan keluarga") },
    { icon: Target, title: t("careers.benefit.growth", "Pengembangan Karier"), description: t("careers.benefit.growth.desc", "Jalur karier jelas dan program pengembangan profesional") },
    { icon: Users, title: t("careers.benefit.team", "Tim Hebat"), description: t("careers.benefit.team.desc", "Bekerja dengan profesional berbakat dalam lingkungan kolaboratif") },
    { icon: Clock, title: t("careers.benefit.balance", "Keseimbangan Hidup"), description: t("careers.benefit.balance.desc", "Pengaturan kerja fleksibel dan kebijakan cuti yang mendukung") }
  ];

  const departments = [
    { code: "all", label: t("careers.filter.all", "Semua Departemen") },
    { code: "production", label: t("careers.filter.production", "Produksi") },
    { code: "quality control", label: t("careers.filter.qc", "Quality Control") },
    { code: "sales & marketing", label: t("careers.filter.sales", "Sales & Marketing") },
    { code: "administration", label: t("careers.filter.admin", "Administrasi") },
  ];

  // === Animation map (9 kolom × 6 baris — sesuaikan row bila berbeda) ===
  const owlAnimationMap /* : AnimationMap */ = {
    FLY_FLAP:   { row: 1, frames: 9, fps: 14 },
    FLY_GLIDE:  { row: 0, frames: 9, fps: 10 },
    FLEE_FLAP:  { row: 2, frames: 9, fps: 20 },
    LAND:       { row: 3, frames: 9, fps: 16, loop: false },
    TAKEOFF:    { row: 0, frames: 9, fps: 16, loop: false },
    PERCH_IDLE:   { row: 5, frames: 9, fps: 6 },
    PERCH_LOOK_L: { row: 4, frames: 9, fps: 10, loop: false },
    PERCH_LOOK_R: { row: 4, frames: 9, fps: 10, loop: false },
    PERCH_PREEN:  { row: 4, frames: 9, fps: 12, loop: false },
    PERCH_PECK:   { row: 4, frames: 9, fps: 12, loop: false },
    SEARCH_GLIDE: { row: 0, frames: 9, fps: 10 },
  };

  return (
    <>
      <InteractiveBird
        spriteSheetSrc="/bird.png"
        birdSize={85}
        flySpeed={180}
        mouseRepelDistance={150}
        spriteCols={9}
        spriteRows={6}
        animationMap={owlAnimationMap}
        perchSelectors={['h1', 'button', '.perch-spot']}
      />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center text-white">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full perch-spot">
                {t("careers.hero.badge", "Bergabunglah Bersama Kami")}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                {t("careers.hero.title", "Bangun Karier Anda")}
                <span className="block text-brand-200">{t("careers.hero.subtitle.tag", "Bersama Kami")}</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
                {t("careers.hero.subtitle", "Jadilah bagian dari tim dinamis yang membentuk masa depan industri sarang burung walet Indonesia. Kami mencari individu bersemangat yang berkomitmen pada keunggulan.")}
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
                <div><div className="text-3xl font-bold text-white mb-1">100+</div><div className="text-sm text-brand-200">{t("careers.hero.stat.employees", "Karyawan")}</div></div>
                <div><div className="text-3xl font-bold text-white mb-1">3</div><div className="text-sm text-brand-200">{t("careers.hero.stat.locations", "Lokasi")}</div></div>
                <div><div className="text-3xl font-bold text-white mb-1">25+</div><div className="text-sm text-brand-200">{t("careers.hero.stat.years", "Tahun Berdiri")}</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 perch-spot">
                {t("careers.why.title", "Mengapa Bergabung dengan TUNAS ESTA?")}
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                {t("careers.why.desc", "Kami menawarkan lebih dari sekadar pekerjaan kesempatan bertumbuh, belajar, dan memberi dampak nyata.")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="group perch-spot">
                  <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="inline-flex items-center justify-center w-14 h-14 mb-4 text-brand-600 bg-brand-50 rounded-xl group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-zinc-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lowongan Tersedia */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 perch-spot">
                {t("careers.open.title", "Lowongan Tersedia")}
              </h2>
              <p className="text-lg text-zinc-600">
                {t("careers.open.desc", "Temukan peran yang tepat dan mulai perjalanan Anda bersama kami")}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {departments.map((dept) => {
                const isActive = activeDept === dept.code;
                return (
                  <button
                    key={dept.code}
                    onClick={() => setActiveDept(dept.code)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      isActive
                        ? "bg-brand-600 text-white shadow-lg"
                        : "bg-zinc-100 text-zinc-700 hover:bg-brand-50 hover:text-brand-600"
                    }`}
                    aria-pressed={isActive}
                  >
                    {dept.label}
                  </button>
                );
              })}
            </div>

            {lowongan === null ? (
              <div className="text-center py-20">{t("careers.loading", "Memuat lowongan...")}</div>
            ) : lowongan.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-4">
                {lowongan
                  .filter(job => {
                    if (activeDept === "all") return true;
                    return job.department?.toLowerCase() === activeDept;
                  })
                  .map((job, index) => (
                    <JobCard
                      key={job._id ?? index}
                      posisi={job.posisi}
                      slug={job.slug}
                      lokasi={job.lokasi}
                      tipe={job.tipe}
                      department={job.department}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                  <Briefcase className="w-10 h-10 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-700 mb-2">{t("careers.empty.title", "Belum Ada Lowongan")}</h3>
                <p className="text-zinc-500 mb-6">{t("careers.empty.desc", "Saat ini belum ada lowongan. Silakan cek kembali segera.")}</p>
                <button className="px-6 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors">
                  {t("careers.empty.cta", "Kirim Lamaran Umum")}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 perch-spot">
                {t("careers.cta.title", "Belum Menemukan Posisi yang Tepat?")}
              </h2>
              <p className="text-lg text-zinc-600 mb-8">
                {t("careers.cta.desc", "Kami selalu mencari talenta terbaik. Kirimkan CV Anda dan akan kami hubungi untuk peluang berikutnya.")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors shadow-xl hover:shadow-2xl">
                  {t("careers.cta.sendcv", "Kirim CV Anda")}
                </button>
                <button className="px-8 py-4 bg-white text-brand-600 border-2 border-brand-600 rounded-full font-semibold hover:bg-brand-50 transition-colors">
                  {t("careers.cta.contact", "Hubungi HR")}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
