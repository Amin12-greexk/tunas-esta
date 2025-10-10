// Server Component — hanya sebagai wrapper & SEO metadata
import type { Metadata } from "next";
import ApaItuSarangBurungWaletContent from "./content";

export const metadata: Metadata = {
  title: "Apa itu Sarang Burung Walet? | TUNAS ESTA INDONESIA",
  description:
    "Pelajari tentang sarang burung walet (edible bird’s nest): pengertian, kandungan nutrisi, manfaat, jenis & grade, serta proses pengolahan yang benar.",
  keywords: [
    "sarang burung walet",
    "edible bird nest",
    "manfaat sarang walet",
    "kandungan nutrisi sarang walet",
    "grade sarang walet",
    "proses pengolahan sarang walet",
    "TUNAS ESTA INDONESIA",
  ],
  openGraph: {
    title: "Apa itu Sarang Burung Walet? | TUNAS ESTA INDONESIA",
    description:
      "Mengenal sarang burung walet: kandungan, manfaat kesehatan, jenis & grade, serta proses pengolahan berkualitas.",
    type: "article",
    locale: "id_ID",
  },
  alternates: {
    canonical: "/tentang/apa-itu-sarang-burung-walet",
  },
};

// >>> tambah dua baris ini <<<
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default function Page() {
  // Keep this file lean; all interactivity hidup di <content.tsx />
  return <ApaItuSarangBurungWaletContent />;
}
