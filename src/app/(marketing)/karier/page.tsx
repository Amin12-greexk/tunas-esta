// src/app/(marketing)/karier/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qAllKarier } from "@/lib/sanity.queries";
import { JobCard } from "@/components/job-card";
import { Briefcase, Users, Target, Heart, MapPin, Clock } from "lucide-react";

export default async function KarierPage() {
  const lowongan = await fetchSanity<any[]>(qAllKarier);

  const benefits = [
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Comprehensive medical coverage for you and your family"
    },
    {
      icon: Target,
      title: "Career Growth",
      description: "Clear career paths and professional development programs"
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with talented professionals in a collaborative environment"
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and generous leave policies"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Build Your Career
              <span className="block text-brand-200">With Us</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Be part of a dynamic team that's shaping the future of Indonesia's bird's nest industry. 
              We're looking for passionate individuals who share our commitment to excellence.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <div>
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-brand-200">Employees</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-brand-200">Locations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-sm text-brand-200">Years Legacy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Why Join <span className="text-brand-600">TUNAS ESTA?</span>
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              We offer more than just a job – we provide opportunities for growth, learning, and making a real impact
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-4 text-brand-600 bg-brand-50 rounded-xl group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-zinc-600">
              Find your perfect role and start your journey with us
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {["All Departments", "Production", "Quality Control", "Sales & Marketing", "Administration"].map((dept) => (
              <button
                key={dept}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  dept === "All Departments"
                    ? "bg-brand-600 text-white shadow-lg"
                    : "bg-zinc-100 text-zinc-700 hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          {lowongan?.length ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {lowongan.map((job, index) => (
                <JobCard key={job._id || index} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                <Briefcase className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">No Open Positions</h3>
              <p className="text-zinc-500 mb-6">Currently there are no open positions, but check back soon!</p>
              <button className="px-6 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors">
                Submit General Application
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Don't See the Right Position?
            </h2>
            <p className="text-lg text-zinc-600 mb-8">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors shadow-xl hover:shadow-2xl">
                Submit Your CV
              </button>
              <button className="px-8 py-4 bg-white text-brand-600 border-2 border-brand-600 rounded-full font-semibold hover:bg-brand-50 transition-colors">
                Contact HR
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}