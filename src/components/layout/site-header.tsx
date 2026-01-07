// src/components/layout/site-header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, Phone, ChevronDown, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export type NavItem = {
  title: string;
  href?: string;
  description?: string;
  submenu?: { title: string; href?: string; description?: string }[];
};

type SiteHeaderProps = {
  logoUrl?: string;
  siteTitle: string;
  navItems?: NavItem[];
};

export function SiteHeader({ logoUrl, siteTitle, navItems = [] }: SiteHeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { locale: language, setLocale: setLanguage, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const handleLanguageChange = (lang: "id" | "en" | "zh") => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    }
  };

  const NAV: NavItem[] = useMemo(
    () =>
      (navItems ?? []).filter(item => {
        if (!item?.title) return false;
        const title = item.title.toLowerCase();
        if (title === "kontak" || title === "contact") return false;
        return !!(item.href || item.submenu?.length);
      }),
    [navItems],
  );

  const titleParts = siteTitle.split(" ");
  const firstLine = titleParts.slice(0, 2).join(" ");
  const secondLine = titleParts.slice(2).join(" ");

  const handleDropdownToggle = (title: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const handleMouseEnter = (title: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (NAV.find(item => item.title === title)?.submenu?.length) {
      setActiveDropdown(title);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => setActiveDropdown(null), 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => setActiveDropdown(null), 200);
    setHoverTimeout(timeout);
  };

  const toggleMobileSubmenu = (title: string) => {
    setExpandedMobileItem(expandedMobileItem === title ? null : title);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl bg-white/95 border-b transition-all duration-500 ${
        scrolled 
          ? "shadow-xl border-green-100/50" 
          : "shadow-sm border-gray-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Kembali ke beranda"
          className="flex items-center gap-3 group relative"
        >
          <div className="shrink-0 relative">
            {logoUrl ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <Image
                  src={logoUrl}
                  alt={siteTitle}
                  width={48}
                  height={48}
                  className="relative rounded-xl shadow-lg ring-2 ring-green-100/50 group-hover:ring-green-300/80 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-green-100/50 group-hover:ring-green-300/80 group-hover:scale-105 transition-all duration-500">
                  {siteTitle.charAt(0)}
                </div>
              </div>
            )}
          </div>

          <div className="font-semibold">
            {/* Mobile */}
            <span className="block lg:hidden text-base sm:text-lg bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 bg-clip-text text-transparent whitespace-nowrap truncate max-w-[40vw] group-hover:from-green-600 group-hover:to-green-700 transition-all duration-500">
              {siteTitle}
            </span>
            {/* Desktop */}
            <div className="hidden lg:block">
              <span className="text-lg bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-green-700 transition-all duration-500 font-bold tracking-tight">
                {firstLine}
              </span>
              <span className="block text-xs text-gray-500 tracking-[0.2em] -mt-1 group-hover:text-green-600 transition-colors duration-500 font-medium">
                {secondLine}
              </span>
            </div>
          </div>
        </Link>

        {/* Centered desktop navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <nav aria-label="Navigasi utama">
            <div className="flex items-center gap-0.5">
              {NAV.map(item => {
                const submenuItems = (item.submenu ?? []).flatMap(sub =>
                  sub.title && sub.href
                    ? [{ title: sub.title, href: sub.href, description: sub.description }]
                    : [],
                );
                const hasSub = submenuItems.length > 0;
                return (
                  <div
                    key={item.href || item.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hasSub ? (
                      <button
                        type="button"
                        className="px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 text-gray-700 hover:text-green-700 font-medium text-sm flex items-center gap-1.5 relative overflow-hidden group"
                        onClick={() => handleDropdownToggle(item.title)}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === item.title}
                      >
                        <span className="relative z-10">{item.title}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-all duration-300 relative z-10 ${
                            activeDropdown === item.title ? "rotate-180 text-green-600" : ""
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </button>
                    ) : item.href ? (
                      <Link
                        href={item.href}
                        className="px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 text-gray-700 hover:text-green-700 font-medium text-sm inline-flex items-center gap-1.5 relative overflow-hidden group"
                      >
                        <span className="relative z-10">{item.title}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </Link>
                    ) : null}

                    {/* Dropdown */}
                    {activeDropdown === item.title && hasSub && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[340px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-100/50 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 text-white p-5 mb-5 shadow-lg">
                          <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                            {item.description && (
                              <p className="text-sm text-green-50 leading-relaxed">{item.description}</p>
                            )}
                          </div>
                          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                          <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
                        </div>

                        <div className="space-y-1">
                          {submenuItems.map(sub => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block p-4 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group relative overflow-hidden"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="relative z-10">
                                <h4 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300 mb-1">
                                  {sub.title}
                                </h4>
                                {sub.description && (
                                  <p className="text-sm text-gray-600 group-hover:text-gray-700 leading-relaxed">
                                    {sub.description}
                                  </p>
                                )}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center rounded-xl border border-gray-200/70 bg-white/70 backdrop-blur px-3 py-2 shadow-sm gap-1.5">
              {["id", "en", "zh"].map(code => {
                const label = code === "id" ? t("lang.id", "ID") : code === "en" ? t("lang.en", "EN") : t("lang.zh", "ZH");
                const active = language === code;
                return (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as "id" | "en" | "zh")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                    aria-pressed={active}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            href="/kontak"
            className="inline-flex px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm transition-all duration-500 hover:shadow-xl hover:shadow-green-500/30 whitespace-nowrap relative overflow-hidden group"
          >
            <span className="relative z-10">{t("header.contact", "Kontak")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden ml-auto">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Buka menu"
                className="p-3 rounded-xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 border border-gray-200/50 hover:border-green-300/50 shadow-sm hover:shadow-md relative overflow-hidden group"
              >
                <Menu className="w-6 h-6 text-gray-700 group-hover:text-green-700 transition-colors duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/10 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-96 bg-gradient-to-b from-white via-green-50/10 to-white p-0 border-l border-green-100/50">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu Navigasi</SheetTitle>
                <SheetDescription>Navigasi utama untuk {siteTitle}</SheetDescription>
              </SheetHeader>

              {/* Header Mobile */}
              <div className="sticky top-0 z-10 bg-white/98 backdrop-blur-xl border-b border-green-100/50 shadow-sm">
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {logoUrl ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg blur opacity-30" />
                        <Image 
                          src={logoUrl} 
                          alt={siteTitle} 
                          width={44} 
                          height={44} 
                          className="relative rounded-lg shadow-md ring-2 ring-green-100/50" 
                        />
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg blur opacity-40" />
                        <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-green-500 via-emerald-600 to-green-700 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-green-100/50">
                          {siteTitle.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div>
                      <h2 className="font-bold text-gray-900 tracking-tight text-base bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        {firstLine}
                      </h2>
                      <p className="text-[10px] text-gray-500 tracking-[0.15em] font-medium uppercase">
                        {secondLine}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Tutup menu"
                    className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100/50 transition-all duration-300 group"
                  >
                    <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-1.5">
                  {/* Language Toggle Mobile */}
                  <div className="flex items-center gap-2 mb-4">
                    {["id", "en", "zh"].map(code => {
                      const label = code === "id" ? t("lang.id", "ID") : code === "en" ? t("lang.en", "EN") : t("lang.zh", "ZH");
                      const active = language === code;
                      return (
                        <button
                          key={code}
                          onClick={() => handleLanguageChange(code as "id" | "en" | "zh")}
                          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                            active
                              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow"
                              : "bg-white border border-gray-200 text-gray-700"
                          }`}
                          aria-pressed={active}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  {NAV.map(item => {
                    const submenuItems = (item.submenu ?? []).flatMap(sub =>
                      sub.title && sub.href
                        ? [{ title: sub.title, href: sub.href, description: sub.description }]
                        : [],
                    );
                    const hasSub = submenuItems.length > 0;
                    const isExpanded = expandedMobileItem === item.title;
                    
                    return (
                      <div key={item.href || item.title} className="space-y-1.5">
                        <div className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100/50 hover:border-green-200/50 transition-all duration-300 group">
                          <div className="flex items-center">
                            {item.href ? (
                              <Link
                                href={item.href}
                                onClick={() => !hasSub && setOpen(false)}
                                className="flex-1 p-4 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-emerald-50/50 transition-all duration-300"
                              >
                                <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300 text-base">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="text-xs text-gray-600 group-hover:text-gray-700 mt-1 leading-relaxed">
                                    {item.description}
                                  </p>
                                )}
                              </Link>
                            ) : (
                              <div className="flex-1 p-4">
                                <h3 className="font-semibold text-gray-900 text-base">{item.title}</h3>
                                {item.description && (
                                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                                )}
                              </div>
                            )}
                            
                            {hasSub && (
                              <button
                                onClick={() => toggleMobileSubmenu(item.title)}
                                className="px-4 py-4 hover:bg-green-50 transition-colors duration-300"
                                aria-label={`Toggle ${item.title} submenu`}
                              >
                                <ChevronDown 
                                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                                    isExpanded ? 'rotate-180 text-green-600' : ''
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                        </div>

                        {/* Submenu with Animation */}
                        {hasSub && (
                          <div 
                            className={`ml-3 pl-3 border-l-2 border-green-200/50 space-y-1.5 overflow-hidden transition-all duration-300 ${
                              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {submenuItems.map(sub => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setOpen(false)}
                                className="block p-3.5 rounded-lg bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group shadow-sm border border-gray-100/50 hover:border-green-200/50 relative overflow-hidden"
                              >
                                <div className="relative z-10">
                                  <h4 className="font-medium text-gray-800 group-hover:text-green-700 transition-colors duration-300 text-sm">
                                    {sub.title}
                                  </h4>
                                  {sub.description && (
                                    <p className="text-xs text-gray-600 group-hover:text-gray-700 mt-1 leading-relaxed">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* CTA */}
                <div className="p-4 border-t border-green-100/50 bg-gradient-to-b from-transparent via-green-50/20 to-green-50/30 mt-2">
                  <Link
                    href="/kontak"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-4 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 text-white font-semibold transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-green-500/40 gap-2.5 relative overflow-hidden group"
                  >
                    <Phone className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">{t("header.contact", "Kontak")}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </div>

                <div className="p-5 bg-gradient-to-b from-gray-50 to-gray-100/80 text-center border-t border-gray-200/50">
                  <p className="text-xs text-gray-600 font-medium">
                    © {new Date().getFullYear()} {siteTitle}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">All rights reserved</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

