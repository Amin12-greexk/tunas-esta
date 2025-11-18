// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { fetchSanity } from "@/lib/sanity.client";
import { qSettings } from "@/lib/sanity.queries";

/** ========= Types dari Sanity ========= */
type Settings =
  | {
      siteTitle?: string;
      description?: string;
      logoUrl?: string;
    }
  | null;

/** ========= Metadata ========= */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSanity<Settings>(qSettings);
  return {
    title: settings?.siteTitle ?? "TUNAS ESTA INDONESIA",
    description: settings?.description ?? "Produsen sarang burung walet terpercaya.",
  };
}

/** ========= Layout ========= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-zinc-800 antialiased">
        {children}
      </body>
    </html>
  );
}
