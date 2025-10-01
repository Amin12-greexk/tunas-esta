// src/app/(marketing)/produk/page.tsx
import { fetchSanity } from "@/lib/sanity.client";
import { qAllProduk } from "@/lib/sanity.queries";
import { ProdukPageClient } from "@/components/produk-page-client";

interface Product {
  _id: string;
  nama: string;
  deskripsi?: string;
  fotoUrl?: string;
  spesifikasi?: string[];
}

export default async function ProdukPage() {
  const products = await fetchSanity<Product[]>(qAllProduk) || [];

  return <ProdukPageClient products={products} />;
}