// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { fetchSanity } from "@/lib/sanity.client";
import { qSettings, qNavigation } from "@/lib/sanity.queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSanity<any>(qSettings);
  return {
    title: settings?.siteTitle || "TUNAS ESTA INDONESIA",
    description: settings?.description || "Produsen sarang burung walet terpercaya.",
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, navigation] = await Promise.all([
    fetchSanity<any>(qSettings),
    fetchSanity<any>(qNavigation),  // ← ambil menu dari Sanity
  ]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-zinc-800 antialiased">
        <SiteHeader
          logoUrl={settings?.logoUrl}
          siteTitle={settings?.siteTitle || "TUNAS ESTA INDONESIA"}
          navItems={navigation?.main || []}   // ← teruskan ke header
        />
        {children}
        <SiteFooter
          logoUrl={settings?.logoUrl}
          siteTitle={settings?.siteTitle || "TUNAS ESTA INDONESIA"}
          socials={settings?.socials}
        />
      </body>
    </html>
  );
}
