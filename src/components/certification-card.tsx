"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Calendar, Building, Download, ExternalLink, CheckCircle } from "lucide-react";
import { format } from "date-fns";

type CertificationCardProps = {
  nama: string;
  nomor?: string;
  lembaga?: string;
  berlakuSampai?: string;
  fileUrl?: string;
  index?: number;
};

export function CertificationCard({ 
  nama, 
  nomor, 
  lembaga, 
  berlakuSampai, 
  fileUrl,
  index = 0 
}: CertificationCardProps) {
  const isActive = berlakuSampai ? new Date(berlakuSampai) > new Date() : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Status Indicator */}
        <div className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
          isActive 
            ? "bg-green-100 text-green-700" 
            : "bg-orange-100 text-orange-700"
        }`}>
          <CheckCircle className="w-3 h-3" />
          {isActive ? "Active" : "Renewal Required"}
        </div>

        {/* Certificate Image/Preview */}
        <div className="relative h-48 bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
          {fileUrl ? (
            <>
              <Image
                src={fileUrl}
                alt={nama}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Award className="w-16 h-16 text-brand-300 mx-auto mb-2" />
                <p className="text-sm text-brand-400 font-medium">Certificate</p>
              </div>
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {fileUrl && (
              <>
                <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ExternalLink className="w-5 h-5 text-brand-600" />
                </button>
                <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Download className="w-5 h-5 text-brand-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-zinc-900 mb-4 group-hover:text-brand-600 transition-colors">
            {nama}
          </h3>

          <div className="space-y-3">
            {nomor && (
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-zinc-400 mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-zinc-500">Certificate Number</p>
                  <p className="text-sm font-medium text-zinc-700">{nomor}</p>
                </div>
              </div>
            )}

            {lembaga && (
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-zinc-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-500">Issuing Body</p>
                  <p className="text-sm font-medium text-zinc-700">{lembaga}</p>
                </div>
              </div>
            )}

            {berlakuSampai && (
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-zinc-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-zinc-500">Valid Until</p>
                  <p className="text-sm font-medium text-zinc-700">
                    {format(new Date(berlakuSampai), "dd MMMM yyyy")}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button className="mt-6 w-full py-3 bg-brand-50 text-brand-600 rounded-xl font-semibold hover:bg-brand-100 transition-colors flex items-center justify-center gap-2 group/btn">
            View Certificate
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}