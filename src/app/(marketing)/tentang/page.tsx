import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { ArrowRight, CheckCircle2, Mail, Phone, Sparkles } from "lucide-react";

import { fetchSanity } from "@/lib/sanity.client";
import { qPageBySlug, qSettings, qTentang } from "@/lib/sanity.queries";

type TentangStructured = {
  title?: string;
  heroUrl?: string;
  overview?: PortableTextBlock[];
  milestones?: {
    year?: string;
    title?: string;
    description?: string;
  }[];
  values?: {
    title?: string;
    description?: string;
    icon?: string;
  }[];
};

type PageContent = {
  title?: string;
  body?: PortableTextBlock[];
  slug?: string;
};

type Settings = {
  siteTitle?: string;
  logoUrl?: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    email?: string;
    phone?: string;
  };
};

function blocksToPlainText(blocks?: PortableTextBlock[], limit = 220) {
  if (!blocks?.length) return "";
  const text = blocks
    .map(block => {
      if (block._type !== "block" || !("children" in block)) return "";
      return (block.children as { text?: string }[])
        .map(child => child?.text ?? "")
        .join("");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text;
}

type HeroProps = {
  title: string;
  subtitle?: string;
  heroUrl?: string;
  siteTitle: string;
};

function HeroSection({ title, subtitle, heroUrl, siteTitle }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-emerald-900 to-black text-white">
      {heroUrl && (
        <Image
          src={heroUrl}
          alt={siteTitle}
          fill
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-emerald-950/70 to-black/80" />
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-24 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.15em]">
          <Sparkles className="h-4 w-4 text-emerald-200" />
          Profil Perusahaan
        </div>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          <span className="bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-3xl text-lg text-emerald-100 md:text-xl">
            {subtitle}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Hubungi Kami
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-100"
          >
            Lihat Produk
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

type OverviewSectionProps = {
  blocks: PortableTextBlock[];
};

function OverviewSection({ blocks }: OverviewSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Tentang Perusahaan
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">Cerita Kami</h2>
        </div>
        {blocks.length ? (
          <div className="prose prose-lg max-w-none text-justify text-zinc-700 prose-headings:text-zinc-900 prose-a:text-emerald-700">
            <PortableText value={blocks} />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-6 text-center text-sm text-emerald-700">
            Belum ada konten &quot;Tentang Kami&quot; di Sanity. Tambahkan melalui dokumen <strong>page</strong> (slug <code>tentang</code>) atau <strong>tentang</strong>.
          </div>
        )}
      </div>
    </section>
  );
}

type ValueItem = { title?: string; description?: string; icon?: string };

function ValuesSection({ values }: { values: ValueItem[] }) {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Nilai & Komitmen
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">Budaya yang Kami Junjung</h2>
          <p className="mt-3 text-zinc-600">Semua nilai diambil dari Sanity sehingga mudah diperbarui tanpa deploy ulang.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, idx) => (
            <div
              key={`${value.title ?? "value"}-${idx}`}
              className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                {value.icon ? (
                  <span className="text-sm font-semibold uppercase tracking-wide">{value.icon}</span>
                ) : (
                  <CheckCircle2 className="h-6 w-6" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-zinc-900">{value.title ?? "Tanpa judul"}</h3>
              {value.description && <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{value.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Milestone = { year?: string; title?: string; description?: string };

function MilestonesSection({ milestones }: { milestones: Milestone[] }) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Milestone</p>
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">Perjalanan Kami</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/40 to-transparent md:left-1/2" />
          <div className="space-y-8">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={`${item.title ?? "milestone"}-${idx}`}
                  className={`relative flex flex-col gap-4 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
                      <p className="text-sm font-semibold text-emerald-700">{item.year ?? "Tahun tidak diisi"}</p>
                      <h3 className="text-xl font-bold text-zinc-900">{item.title ?? "Tanpa judul"}</h3>
                      {item.description && <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                  <div className="absolute left-4 top-6 h-10 w-10 -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-br from-emerald-500 to-emerald-600 text-center text-sm font-semibold text-white shadow-lg md:left-1/2 md:-translate-x-1/2">
                    <div className="flex h-full items-center justify-center">{item.year?.slice(0, 4) ?? idx + 1}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactProps = {
  phone?: string;
  email?: string;
  siteTitle: string;
};

function ContactSection({ phone, email, siteTitle }: ContactProps) {
  const hasContact = !!(phone || email);
  return (
    <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-zinc-900 py-20 text-white">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Terhubung dengan {siteTitle}</h2>
        <p className="mt-3 text-emerald-100">
          Informasi kontak diambil dari pengaturan Sanity sehingga mudah diperbarui oleh tim.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {phone && (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.15em] text-emerald-100">Telepon/WA</p>
                <p className="font-semibold text-white">{phone}</p>
              </div>
            </div>
          )}
          {email && (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
              <Mail className="h-5 w-5" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.15em] text-emerald-100">Email</p>
                <p className="font-semibold text-white">{email}</p>
              </div>
            </div>
          )}
        </div>

        {!hasContact && (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-emerald-100">
            Kontak belum diisi di Sanity &gt; Settings. Isi bidang phone/whatsapp/email agar tampil di sini.
          </div>
        )}

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5"
          >
            Buka Halaman Kontak
            <ArrowRight className="h-4 w-4" />
          </Link>
          {email && (
            <Link
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Kirim Email
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function TentangPage() {
  const [structured, pageContent, settings] = await Promise.all([
    fetchSanity<TentangStructured | null>(qTentang),
    fetchSanity<PageContent | null>(qPageBySlug, { slug: "tentang" }),
    fetchSanity<Settings | null>(qSettings),
  ]);

  const siteTitle = settings?.siteTitle ?? "TUNAS ESTA INDONESIA";
  const heroTitle = structured?.title ?? pageContent?.title ?? "Tentang Kami";
  const heroSubtitle = blocksToPlainText(structured?.overview ?? pageContent?.body);
  const overviewBlocks =
    (structured?.overview?.length ? structured.overview : undefined) ??
    (pageContent?.body ?? []);

  const milestones = structured?.milestones ?? [];
  const values = structured?.values ?? [];

  const contactPhone = settings?.socials?.phone || settings?.socials?.whatsapp;
  const contactEmail = settings?.socials?.email;

  return (
    <main className="bg-white">
      <HeroSection title={heroTitle} subtitle={heroSubtitle} heroUrl={structured?.heroUrl} siteTitle={siteTitle} />
      <OverviewSection blocks={overviewBlocks} />
      {values.length > 0 && <ValuesSection values={values} />}
      {milestones.length > 0 && <MilestonesSection milestones={milestones} />}
      <ContactSection phone={contactPhone} email={contactEmail} siteTitle={siteTitle} />
    </main>
  );
}
