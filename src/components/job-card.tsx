// src/components/job-card.tsx
"use client";

import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight, Building } from "lucide-react";
import { motion } from "framer-motion";

type JobCardProps = {
  posisi: string;
  slug: { current: string };
  lokasi?: string;
  tipe?: string;
  deskripsi?: string | null;  // ← perbaikan dari any
  department?: string;
};

export function JobCard({ posisi, slug, lokasi, tipe, department }: JobCardProps) {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-100 text-green-700";
      case "Part-time":
        return "bg-blue-100 text-blue-700";
      case "Contract":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/karier/${slug.current}`}>
        <div className="relative p-6 bg-white border border-zinc-200 rounded-2xl hover:border-brand-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-brand-50 text-brand-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>

                {/* Job Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {posisi}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
                    {lokasi && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {lokasi}
                      </span>
                    )}
                    {department && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {department}
                      </span>
                    )}
                    {tipe && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tipe}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex items-center gap-4">
              {/* Type Badge */}
              {tipe && (
                <span
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getTypeColor(
                    tipe
                  )}`}
                >
                  {tipe}
                </span>
              )}

              {/* Arrow */}
              <div className="flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-600 rounded-full group-hover:bg-brand-600 group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Hover Effect Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-brand-400 to-brand-600 group-hover:h-3/4 transition-all duration-300 rounded-full" />
        </div>
      </Link>
    </motion.div>
  );
}
