// src/components/layout/site-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, Phone, ChevronDown } from "lucide-react";

export type NavItem = { title: string; href: string; description?: string };

type SiteHeaderProps = {
  logoUrl?: string;
  siteTitle: string;
  navItems?: NavItem[];
};

export function SiteHeader({ logoUrl, siteTitle, navItems = [] }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const FALLBACK: NavItem[] = [
    { title: "Tentang", href: "/tentang", description: "Profil perusahaan & sejarah TUNAS ESTA INDONESIA." },
    { title: "Produk", href: "/produk", description: "Kategori & ukuran sarang walet." },
    { title: "Fasilitas", href: "/fasilitas", description: "Pabrik & kapasitas produksi." },
    { title: "Sertifikasi", href: "/sertifikasi", description: "HACCP, Halal, BPOM, ISO 22000." },
    { title: "Berita", href: "/berita", description: "Informasi & update terbaru." },
    { title: "Karier", href: "/karier", description: "Lowongan pekerjaan & kesempatan bergabung." },
    { title: "Galeri", href: "/galeri", description: "Dokumentasi kegiatan & produk." },
    { title: "Kontak", href: "/kontak", description: "Hubungi kami untuk informasi lebih lanjut." },
  ];

  const NAV = navItems.length ? navItems : FALLBACK;

  // Membagi siteTitle menjadi dua bagian untuk tampilan desktop
  const titleParts = siteTitle.split(" ");
  const firstLine = titleParts.slice(0, 2).join(" "); // "TUNAS ESTA"
  const secondLine = titleParts.slice(2).join(" "); // "INDONESIA"

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white border-b border-gray-200 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* STRUKTUR UTAMA: justify-between untuk memisahkan Brand dan Navigasi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* KIRI: Brand (Logo + Teks 2 Baris) */}
        <Link
          href="/"
          aria-label="Kembali ke beranda"
          className="flex items-center gap-3 group"
        >
          <div className="shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteTitle}
                width={48} // Sedikit diperbesar agar seimbang
                height={48}
                className="rounded-xl shadow-md ring-2 ring-green-100 group-hover:ring-green-200 transition"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center text-white font-bold text-xl shadow-md ring-2 ring-green-100">
                {siteTitle.charAt(0)}
              </div>
            )}
          </div>

          {/* Teks Brand: Tampilan berbeda di mobile vs desktop */}
          <div className="font-semibold">
            {/* Tampilan Mobile: Satu baris dan bisa terpotong */}
            <span className="block lg:hidden text-base sm:text-lg bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent whitespace-nowrap truncate max-w-[40vw]">
              {siteTitle}
            </span>

            {/* Tampilan Desktop: Dua baris, tidak akan terpotong */}
            <div className="hidden lg:block">
              <span className="text-lg bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">
                {firstLine}
              </span>
              <span className="block text-xs text-gray-500 tracking-widest -mt-1">
                {secondLine}
              </span>
            </div>
          </div>
        </Link>

        {/* KANAN: Navigasi Desktop & Tombol CTA (Digabung) */}
        <div className="hidden lg:flex items-center gap-4">
          <nav aria-label="Navigasi utama">
            <div className="flex items-center gap-1">
              {NAV.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-green-50 text-gray-700 font-medium text-sm flex items-center gap-1.5"
                  >
                    {item.title}
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 opacity-70" />
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-2 z-50">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white p-4 mb-4">
                      <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-green-100 leading-relaxed">{item.description}</p>
                        )}
                      </div>
                      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center justify-center w-full rounded-lg bg-green-600 hover:bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
                    >
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Tombol CTA */}
          <Link
            href="/kontak"
            className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg whitespace-nowrap"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* MOBILE: tombol menu (diletakkan di luar grup kanan agar justify-between bekerja) */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Buka menu"
                className="p-3 rounded-xl hover:bg-green-50 transition-all duration-300 border border-gray-200 hover:border-green-200"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </SheetTrigger>

            {/* MOBILE: konten menu (tidak ada perubahan di sini) */}
            <SheetContent side="right" className="w-80 bg-white p-0">
              {/* ... (konten sheet tidak perlu diubah) ... */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}