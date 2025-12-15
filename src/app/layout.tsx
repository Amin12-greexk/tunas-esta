// src/app/layout.tsx
// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader, type NavItem } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { fetchSanity } from "@/lib/sanity.client";
import { qSettings, qNavigation } from "@/lib/sanity.queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

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
      socials?: FooterSocials | Array<{ title?: string; href?: string }>;
    }
  | null;

type NavigationItem = {
  title?: string;
  href?: string;
  children?: { title?: string; href?: string }[];
};

type Navigation = { main?: NavigationItem[]; footer?: NavigationItem[] } | null;

/** Standarisasi bentuk socials agar selalu object FooterSocials */
function coerceFooterSocials(input: unknown): FooterSocials {
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

  return {};
}

/** ========= Metadata ========= */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSanity<Settings>(qSettings);
  const title = settings?.siteTitle ?? "TUNAS ESTA INDONESIA";
  const description = settings?.description ?? "Produsen sarang burung walet terpercaya.";
  const ogImage = settings?.logoUrl;

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: siteUrl ?? undefined,
      siteName: title,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
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
  const headerNavigation: NavItem[] =
    navigation?.main
      ?.map(item => {
        const submenu = (item.children ?? [])
          .filter(child => child?.title && child?.href)
          .map(child => ({ title: child.title!, href: child.href! }));

        return {
          title: item.title ?? "",
          href: item.href || undefined,
          submenu: submenu.length ? submenu : undefined,
        };
      })
      .filter(item => item.title && (item.href || item.submenu?.length)) ?? [];

  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-zinc-800 antialiased">
        <SiteHeader
          logoUrl={settings?.logoUrl}
          siteTitle={settings?.siteTitle ?? "TUNAS ESTA INDONESIA"}
          navItems={headerNavigation}
        />
        {children}
        <SiteFooter
          logoUrl={settings?.logoUrl}
          siteTitle={settings?.siteTitle ?? "TUNAS ESTA INDONESIA"}
          socials={footerSocials}
        />
      </body>
    </html>
  );
}
