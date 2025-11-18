// src/app/(marketing)/karier/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchSanity } from "@/lib/sanity.client";
import { qKarierBySlug, qAllKarier } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Building } from "lucide-react";
import { JobApplicationForm } from "@/components/job-application-form";

type Slug = { current: string };

type Job = {
  posisi: string;
  slug: Slug;
  lokasi?: string;
  tipe?: string;
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

  const job = await fetchSanity<Job | null>(qKarierBySlug, { slug });

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative">
          {/* Breadcrumb - Fixed contrast */}
          <nav className="flex items-center gap-2 text-sm text-white/90 mb-8">
            <Link href="/" className="hover:text-white transition-colors underline-offset-4 hover:underline">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <Link href="/karier" className="hover:text-white transition-colors underline-offset-4 hover:underline">Careers</Link>
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
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Job Description</h2>
                {/* Improved contrast for description text */}
                <div className="prose prose-lg max-w-none text-zinc-800 prose-headings:text-zinc-900 prose-strong:text-zinc-900">
                  {job.deskripsi && <PortableText value={job.deskripsi} />}
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">
                  Qualifications &amp; Requirements
                </h2>
                {/* Improved contrast for qualifications text */}
                <div className="prose prose-lg max-w-none text-zinc-800 prose-headings:text-zinc-900 prose-strong:text-zinc-900">
                  {job.kualifikasi && <PortableText value={job.kualifikasi} />}
                </div>
              </div>

              {/* Application Form - Improved background contrast */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Apply for This Position</h2>
                <JobApplicationForm
                  jobTitle={job.posisi}
                  emailTo={job.emailTujuan || "hr@tunasesta.co.id"}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Job Summary Card - Improved contrast */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-zinc-200">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">Job Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">Posted Date</p>
                      <p className="font-medium text-zinc-900">30 days ago</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">Location</p>
                      <p className="font-medium text-zinc-900">{job.lokasi || "Jakarta, Indonesia"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">Job Type</p>
                      <p className="font-medium text-zinc-900">{job.tipe || "Full-time"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">Experience</p>
                      <p className="font-medium text-zinc-900">2-5 years</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 mb-1 font-medium">Salary</p>
                      <p className="font-medium text-zinc-900">Competitive</p>
                    </div>
                  </div>
                </div>

                {/* Benefits Card - Improved contrast */}
                <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl p-6 border border-brand-200">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">What We Offer</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">Competitive salary package</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">Health insurance for family</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">Professional development</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">Flexible working hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="text-sm text-zinc-800 font-medium">Annual performance bonus</span>
                    </li>
                  </ul>
                </div>

                {/* Share Job - Improved button contrast */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-zinc-200">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">Share This Job</h3>
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