// src/app/(marketing)/sertifikasi/page.tsx
import Link from "next/link";
import { fetchSanity } from "@/lib/sanity.client";
import { qAllSertifikasi } from "@/lib/sanity.queries";
import { CertificationCard } from "@/components/certification-card";
import { Shield, Award, CheckCircle, FileCheck, Download } from "lucide-react";

export default async function SertifikasiPage() {
  const sertifikasi = await fetchSanity<any[]>(qAllSertifikasi);

  const certBenefits = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "All products meet international standards",
    },
    {
      icon: Award,
      title: "Global Recognition",
      description: "Certified by leading international bodies",
    },
    {
      icon: CheckCircle,
      title: "Food Safety",
      description: "HACCP and ISO 22000 compliant",
    },
    {
      icon: FileCheck,
      title: "Regular Audits",
      description: "Continuous monitoring and improvement",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        {/* Animated Background Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl animate-pulse delay-300" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Certified Excellence</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Our Certifications
            </h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-3xl mx-auto">
              Committed to the highest standards of quality, safety, and sustainability through internationally recognized certifications
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Why Certifications Matter
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Our certifications ensure that every product meets the highest international standards
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certBenefits.map((benefit, index) => (
              <div key={benefit.title} className="group">
                <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 text-brand-600 bg-brand-50 rounded-xl group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Our Active Certifications
            </h2>
            <p className="text-lg text-zinc-600">Click on any certificate to view details</p>
          </div>

          {sertifikasi?.length ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sertifikasi.map((cert, index) => (
                <CertificationCard key={cert._id || index} {...cert} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                <Award className="w-10 h-10 text-zinc-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">Certifications Coming Soon</h3>
              <p className="text-zinc-500">We're in the process of updating our certification information</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 md:p-12 border border-brand-100 rounded-3xl shadow-lg bg-white overflow-hidden">
              {/* subtle decorations */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-brand-200/30 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 bg-brand-100/40 rounded-full blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold bg-brand-50 text-brand-700 rounded-full border border-brand-100">
                  <FileCheck className="w-4 h-4" aria-hidden="true" />
                  Verified Documents
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  Need official copies, audits, or compliance details?
                </h3>
                <p className="mt-3 text-zinc-600">
                  Get our latest certificate pack (HACCP, ISO 22000:2018, Halal MUI, BPOM) or talk to our team for verification and vendor onboarding.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 hover:shadow-lg transition w-full sm:w-auto"
                    aria-label="Contact our team"
                  >
                    Contact Our Team
                  </Link>
                  <Link
                    href="/files/certificate-pack.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-800 font-semibold hover:bg-zinc-50 transition w-full sm:w-auto"
                    prefetch={false}
                    aria-label="Download certificate pack PDF"
                  >
                    <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                    Download Pack (PDF)
                  </Link>
                </div>

                <p className="mt-4 text-xs text-zinc-500">
                  * If you need notarized or wet-stamp copies, please mention your company details and required format in the message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
