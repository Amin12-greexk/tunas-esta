// src/app/(marketing)/karier/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchSanity } from "@/lib/sanity.client";
import { qKarierBySlug, qAllKarier } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Building } from "lucide-react";
import { JobApplicationForm } from "@/components/job-application-form";
import { getServerLocale, tServer } from "@/lib/i18n-server";

type Slug = { current: string };

type Job = {
  posisi: string;
  slug: Slug;
  lokasi?: string;
  tipe?: string;
  department?: string;
  deskripsi?: PortableTextBlock[];
  kualifikasi?: PortableTextBlock[];
  emailTujuan?: string;
};

export async function generateStaticParams() {
  const jobs = await fetchSanity<Job[]>(qAllKarier);
  return jobs?.map((job) => ({ slug: job.slug.current })) ?? [];
}

// ⬇️ Perubahan penting: params adalah Promise dan kita await
export default async function KarierDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const t = (key: string, fallback?: string) => tServer(locale, key, fallback);
  const job = await fetchSanity<Job | null>(qKarierBySlug, { slug }, 60, locale);

  if (!job) {
    notFound();
  }

  const productionFormUrl =
    "https://docs.google.com/forms/d/1cIw64oUdJvFSw9as-MU5Q_NHZVDwmhygZ6knhdRAx4Q";
  const isProductionRole =
    job.posisi.toLowerCase().includes("produksi") ||
    job.tipe?.toLowerCase().includes("produksi") ||
    job.department?.toLowerCase() === "production";

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          {/* Breadcrumb - Fixed contrast */}
          <nav className="flex items-center gap-2 text-sm text-white/90 mb-8">
            <Link href="/" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              {t("career.detail.breadcrumb.home", "Beranda")}
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/karier" className="hover:text-white transition-colors underline-offset-4 hover:underline">
              {t("career.detail.breadcrumb.careers", "Karier")}
            </Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-white font-medium">{job.posisi}</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{job.posisi}</h1>

            {/* Fixed contrast for job meta information */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              {job.lokasi && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.lokasi}</span>
                </div>
              )}
              {job.tipe && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{job.tipe}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>TUNAS ESTA INDONESIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
            {/* Job Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                {t("career.detail.desc.title", "Deskripsi Pekerjaan")}
              </h2>
              {/* Improved contrast for description text */}
              <div className="prose prose-lg max-w-none text-zinc-800 prose-headings:text-zinc-900 prose-strong:text-zinc-900">
                {job.deskripsi && <PortableText value={job.deskripsi} />}
              </div>
            </div>

            {/* Qualifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                  {t("career.detail.qual.title", "Kualifikasi & Persyaratan")}
              </h2>
                {/* Improved contrast for qualifications text */}
                <div className="prose prose-lg max-w-none text-zinc-800 prose-headings:text-zinc-900 prose-strong:text-zinc-900">
                  {job.kualifikasi && <PortableText value={job.kualifikasi} />}
                </div>
              </div>

            {/* Application Form - Improved background contrast */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                {t("career.detail.apply.title", "Lamar Posisi Ini")}
              </h2>
              {isProductionRole ? (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-700">
                    {t(
                      "career.detail.production.desc",
                      "Formulir pelamar untuk posisi Produksi diarahkan ke Google Form resmi.",
                    )}
                  </p>
                  <a
                    href={productionFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-white font-semibold shadow-lg transition hover:bg-brand-700"
                  >
                    {t("career.detail.production.button", "Buka Form Produksi")}
                  </a>
                </div>
              ) : (
                <JobApplicationForm
                  jobTitle={job.posisi}
                    emailTo={job.emailTujuan || "hr@tunasesta.co.id"}
                  />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Job Summary Card - Improved contrast */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-zinc-200">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">
                    {t("career.detail.summary.title", "Ringkasan Pekerjaan")}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">
                        {t("career.detail.summary.posted", "Tanggal Posting")}
                      </p>
                      <p className="font-medium text-zinc-900">
                        {t("career.detail.summary.posted.value", "30 hari lalu")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">
                        {t("career.detail.summary.location", "Lokasi")}
                      </p>
                      <p className="font-medium text-zinc-900">{job.lokasi || "Jakarta, Indonesia"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">
                        {t("career.detail.summary.type", "Jenis Pekerjaan")}
                      </p>
                      <p className="font-medium text-zinc-900">{job.tipe || "Full-time"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">
                        {t("career.detail.summary.experience", "Pengalaman")}
                      </p>
                      <p className="font-medium text-zinc-900">
                        {t("career.detail.summary.experience.value", "2-5 tahun")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">
                        {t("career.detail.summary.salary", "Gaji")}
                      </p>
                      <p className="font-medium text-zinc-900">
                        {t("career.detail.summary.salary.value", "Kompetitif")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits Card - Improved contrast */}
                <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-6 border border-brand-200">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">
                    {t("career.detail.offer.title", "Apa yang Kami Tawarkan")}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                      <span className="text-sm text-zinc-800 font-medium">
                        {t("career.detail.offer.item1", "Paket gaji kompetitif")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">
                        {t("career.detail.offer.item2", "Asuransi kesehatan untuk keluarga")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">
                        {t("career.detail.offer.item3", "Pengembangan profesional")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">
                        {t("career.detail.offer.item4", "Jam kerja fleksibel")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">
                        {t("career.detail.offer.item5", "Bonus kinerja tahunan")}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Share Job - Improved button contrast */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-zinc-200">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">
                    {t("career.detail.share.title", "Bagikan Lowongan Ini")}
                  </h3>
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-semibold">
                      Facebook
                    </button>
                    <button className="flex-1 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-colors text-sm font-semibold">
                      Twitter
                    </button>
                    <button className="flex-1 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors text-sm font-semibold">
                      LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
