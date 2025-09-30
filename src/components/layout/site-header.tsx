"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Menu, Phone, Mail, MapPin, ChevronDown } from "lucide-react";

type SiteHeaderProps = {
  logoUrl?: string;
  siteTitle: string;
};

export function SiteHeader({ logoUrl, siteTitle }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV = [
    {
      label: "Tentang",
      href: "/tentang",
      description: "Profil perusahaan & sejarah TUNAS ESTA INDONESIA.",
    },
    {
      label: "Produk",
      href: "/produk",
      description: "Grade sarang walet berkualitas ekspor.",
    },
    {
      label: "Fasilitas",
      href: "/fasilitas",
      description: "Lihat pabrik & kapasitas produksi.",
    },
    {
      label: "Sertifikasi",
      href: "/sertifikasi",
      description: "HACCP, Halal, BPOM, ISO 22000.",
    },
    {
      label: "Berita",
      href: "/berita",
      description: "Informasi & update terbaru.",
    },
    {
      label: "Karier",
      href: "/karier",
      description: "Lowongan pekerjaan & kesempatan bergabung.",
    },
    {
      label: "Galeri",
      href: "/galeri",
      description: "Dokumentasi kegiatan & produk.",
    },
    {
      label: "Kontak",
      href: "/kontak",
      description: "Hubungi kami untuk informasi lebih lanjut.",
    },
  ];

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden lg:block bg-green-600 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>+62 21 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>info@tunasesta.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>✨ Kualitas Premium Sejak 1985</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-gray-200" 
            : "bg-white/90 backdrop-blur-sm border-gray-100"
        }`}
        style={{ minHeight: '80px' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
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
              <div className="text-lg lg:text-xl font-bold text-green-700">
                {siteTitle}
              </div>
              <div className="text-xs text-gray-500 -mt-1">Premium Bird's Nest</div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:block">
            <div className="flex items-center gap-1">
              {NAV.map((item) => (
                <div key={item.href} className="relative group">
                  <button className="px-4 py-3 rounded-lg transition-all duration-300 hover:bg-green-50 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white mb-3">
                      <h3 className="font-semibold mb-1">{item.label}</h3>
                      <p className="text-xs text-green-100">{item.description}</p>
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
                aria-label="Menu" 
                className="p-2 rounded-lg hover:bg-green-50 transition-all duration-300"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-80 bg-white">
              <div className="mt-8">
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

                <nav className="space-y-2">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col gap-1 rounded-lg px-4 py-3 hover:bg-green-50 transition-all duration-300"
                      onClick={() => setOpen(false)}
                    >
                      <div className="font-medium text-gray-900 hover:text-green-700">
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
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