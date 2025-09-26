// src/app/(marketing)/produk/page.tsx
import { ProductCard } from "@/components/product-card";

type RawProduk = {
  _id?: string;
  slug?: string | { current?: string };
  title?: unknown;
  deskripsi?: unknown; // bisa PT, string, atau object
  grade?: unknown;     // bisa string atau {label,value}
  spesifikasi?: unknown[]; // item bisa string / {label,value}
  image?: { asset?: { url?: string } } | { url?: string } | string;
  fotoUrl?: string; // kalau sudah diproyeksikan di GROQ
};

// helper: ambil teks dari string / {label,value}
const toText = (v: any): string =>
  typeof v === "string" ? v : v?.label ?? v?.value ?? "";

const normalize = (p: RawProduk) => {
  const id =
    p._id ??
    (typeof p.slug === "string" ? p.slug : p.slug?.current) ??
    crypto.randomUUID();

  const nama = toText(p.title) || "Tanpa Judul";

  // deskripsi bisa: string | {plainText} | {label,value}
  let deskripsi = "";
  if (typeof p.deskripsi === "string") deskripsi = p.deskripsi;
  else if (p && (p as any).deskripsi?.plainText)
    deskripsi = (p as any).deskripsi.plainText;
  else deskripsi = toText(p.deskripsi) || "Belum ada deskripsi";

  const grade = toText(p.grade) || "N/A";

  const fotoUrl =
    typeof p.image === "string"
      ? p.image
      : (p.image as any)?.asset?.url ??
        (p.image as any)?.url ??
        p.fotoUrl ??
        undefined;

  const spesifikasi = Array.isArray(p.spesifikasi)
    ? p.spesifikasi.map(toText).filter(Boolean)
    : [];

  return { id, nama, deskripsi, grade, fotoUrl, spesifikasi };
};

export default function ProdukPage({ produk = [] as RawProduk[] }) {
  const items = produk.map(normalize);

  if (!items.length) return <p>Belum ada produk di CMS.</p>;

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map(({ id, ...rest }) => (
        <ProductCard key={id} {...rest} />
      ))}
    </div>
  );
}
