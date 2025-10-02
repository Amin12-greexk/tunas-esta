// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { fetchSanity } from "@/lib/sanity.client";
import { qSettings, qNavigation } from "@/lib/sanity.queries";

/** ========= Types dari komponen Footer ========= */
type FooterSocials = {
  instagram?: string;
  linkedin?: string;
  whatsapp?: string;
  email?: string;
  phone?: string;
};

/** ========= Types dari Sanity ========= */
type Settings =
  | {
      siteTitle?: string;
      description?: string;
      logoUrl?: string;

      // Sanity bisa simpan socials sebagai OBJECT langsung...
      socials?: FooterSocials;

      // ...atau sebagai ARRAY of links (mis. {title, href})
      // biar aman kita dukung dua-duanya:
      // socials?: Array<{ title?: string; href?: string }>;
    }
  | null;

type NavItem = { title: string; href: string };
type Navigation = { main?: NavItem[]; footer?: NavItem[] } | null;

/** Standarisasi bentuk socials agar selalu object FooterSocials */
function coerceFooterSocials(input: unknown): FooterSocials {
  // Jika sudah object dengan keys yang dikenal, pakai langsung
  if (input && typeof input === "object" && !Array.isArray(input)) {
    const obj = input as Partial<FooterSocials>;
    const out: FooterSocials = {};
    if (typeof obj.instagram === "string") out.instagram = obj.instagram;
    if (typeof obj.linkedin === "string") out.linkedin = obj.linkedin;
    if (typeof obj.whatsapp === "string") out.whatsapp = obj.whatsapp;
    if (typeof obj.email === "string") out.email = obj.email;
    if (typeof obj.phone === "string") out.phone = obj.phone;
    return out;
  }

  // Jika array of { title, href }, map berdasarkan title
  if (Array.isArray(input)) {
    const out: FooterSocials = {};
    for (const item of input) {
      if (!item || typeof item !== "object") continue;
      const { title, href } = item as { title?: string; href?: string };
      if (!title || !href) continue;

      const key = title.toLowerCase().trim();
      if (key.includes("instagram")) out.instagram = href;
      else if (key.includes("linkedin")) out.linkedin = href;
      else if (key.includes("whatsapp") || key === "wa") out.whatsapp = href;
      else if (key.includes("email") || key.includes("mail")) out.email = href;
      else if (key.includes("phone") || key.includes("tel")) out.phone = href;
    }
    return out;
  }

  // Default kosong
  return {};
}

/** ========= Metadata ========= */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSanity<Settings>(qSettings);
  return {
    title: settings?.siteTitle ?? "TUNAS ESTA INDONESIA",
    description: settings?.description ?? "Produsen sarang burung walet terpercaya.",
  };
}

/** ========= Layout ========= */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navigation] = await Promise.all([
    fetchSanity<Settings>(qSettings),
    fetchSanity<Navigation>(qNavigation),
  ]);

  const footerSocials = coerceFooterSocials(settings?.socials);

  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-zinc-800 antialiased">
        <SiteHeader
          logoUrl={settings?.logoUrl}
          siteTitle={settings?.siteTitle ?? "TUNAS ESTA INDONESIA"}
          navItems={navigation?.main ?? []}
        />
        {children}
        <SiteFooter
          logoUrl={settings?.logoUrl}
          siteTitle={settings?.siteTitle ?? "TUNAS ESTA INDONESIA"}
          socials={footerSocials} // <-- sekarang object, sesuai FooterProps
        />
      </body>
    </html>
  );
}
