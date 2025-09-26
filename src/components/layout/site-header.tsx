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
import { Menu } from "lucide-react";

type SiteHeaderProps = {
  logoUrl?: string;
  siteTitle: string;
};

export function SiteHeader({ logoUrl, siteTitle }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  // menu definisi bisa disesuaikan
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          {logoUrl ? (
            <Image src={logoUrl} alt={siteTitle} width={40} height={40} className="rounded-md" />
          ) : (
            <span className="text-lg font-bold">{siteTitle}</span>
          )}
          <span className="hidden md:inline-block text-brand-700">{siteTitle}</span>
        </Link>

        {/* Desktop nav with dropdown */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {NAV.map((i) => (
              <NavigationMenuItem key={i.href}>
                <NavigationMenuTrigger className="hover:text-brand-700">
                  {i.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4">
                  <div className="w-64">
                    <p className="mb-2 text-sm font-medium">{i.label}</p>
                    <p className="text-xs text-zinc-600">{i.description}</p>
                    <Link
                      href={i.href}
                      className="mt-3 inline-block rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600"
                    >
                      Kunjungi
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button aria-label="Menu" className="rounded-md p-2 hover:bg-zinc-100">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="mt-8 grid gap-4">
              {NAV.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="rounded-md px-2 py-1.5 hover:bg-zinc-100"
                  onClick={() => setOpen(false)}
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
