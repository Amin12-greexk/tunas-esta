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

type NavItem = { title: string; href: string; description?: string };

type SiteHeaderProps = {
  logoUrl?: string;
  siteTitle: string;
  /** Optional: kirim dari Sanity (qNavigation.main) */
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

  // Fallback NAV kalau CMS kosong — TANPA "Tentang"
  const FALLBACK: NavItem[] = [
    { title: "Produk", href: "/produk", description: "Grade sarang walet berkualitas ekspor." },
    { title: "Fasilitas", href: "/fasilitas", description: "Lihat pabrik & kapasitas produksi." },
    { title: "Sertifikasi", href: "/sertifikasi", description: "HACCP, Halal, BPOM, ISO 22000." },
    { title: "Berita", href: "/berita", description: "Informasi & update terbaru." },
    { title: "Karier", href: "/karier", description: "Lowongan pekerjaan & kesempatan bergabung." },
    { title: "Galeri", href: "/galeri", description: "Dokumentasi kegiatan & produk." },
    { title: "Kontak", href: "/kontak", description: "Hubungi kami untuk informasi lebih lanjut." },
  ];

  // Pakai data dari CMS kalau ada, dan filter jika ada "Tentang" di sana
  const NAV = (navItems.length ? navItems : FALLBACK).filter(
    (item) => item.title?.toLowerCase() !== "tentang"
  );

  return (
    <>
      {/* Main header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-gray-200" : "bg-white/90 backdrop-blur-sm border-gray-100"
        }`}
        style={{ minHeight: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Kembali ke beranda"
            className="flex items-center gap-3 font-semibold group transition-all duration-300 hover:scale-105"
          >
            {logoUrl ? (
              <div className="relative">
                <Image
                  src={logoUrl}
                  alt={siteTitle}
                  width={48}
                  height={48}
                  className="rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {siteTitle.charAt(0)}
              </div>
            )}
            <div className="hidden md:block">
              <div className="text-lg lg:text-xl font-bold text-green-700">{siteTitle}</div>
              <div className="text-xs text-gray-500 -mt-1">Premium Bird&apos;s Nest</div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <div className="flex items-center gap-1">
              {NAV.map((item) => (
                <div key={item.href} className="relative group">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    className="px-4 py-3 rounded-lg transition-all duration-300 hover:bg-green-50 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                  >
                    {item.title}
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown (hover) */}
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white mb-3">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.description && <p className="text-xs text-green-100">{item.description}</p>}
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg"
                    >
                      Kunjungi Sekarang
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/kontak"
              className="px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                aria-label="Buka menu"
                className="p-2 rounded-lg hover:bg-green-50 transition-all duration-300"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 bg-white">
              {/* Aksesibilitas: title/description untuk dialog */}
              <SheetHeader>
                <SheetTitle className="sr-only">Menu utama</SheetTitle>
                <SheetDescription className="sr-only">Navigasi situs dan tautan cepat</SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                {/* Mobile logo */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
                    {siteTitle.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-green-700">{siteTitle}</div>
                    <div className="text-xs text-gray-500">Premium Quality</div>
                  </div>
                </div>

                <nav aria-label="Navigasi mobile" className="space-y-2">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col gap-1 rounded-lg px-4 py-3 hover:bg-green-50 transition-all duration-300"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-medium text-gray-900 hover:text-green-700">{item.title}</span>
                      {item.description && <span className="text-xs text-gray-500">{item.description}</span>}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link
                    href="/kontak"
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-green-500 hover:bg-green-600 px-6 py-3 text-white font-medium transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hubungi Kami Sekarang</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
