"use client";

import dynamic from "next/dynamic";

// Reuse the existing educational content about sarang burung walet.
const ApaItuSarangBurungWaletContent = dynamic(
  () => import("../tentang/apa-itu-sarang-burung-walet/content"),
  { ssr: false },
);

export default function BurungPage() {
  return <ApaItuSarangBurungWaletContent />;
}
