/**
 * Seed FULL mock data to Sanity (TypeScript)
 * Run: npm run seed
 *
 * - Upload placeholder images from URL (Unsplash)
 * - Create/replace docs across all schemas
 * - Idempotent: fixed _id per doc
 */

import * as path from "node:path";
import { config as loadEnv } from "dotenv";
loadEnv({ path: path.resolve(process.cwd(), ".env.local") });

import { createClient } from "@sanity/client";

// --- ENV & Client ---
const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "❌ Missing ENV. Tambahkan ke .env.local:\n" +
      "SANITY_PROJECT_ID atau NEXT_PUBLIC_SANITY_PROJECT_ID\n" +
      "SANITY_DATASET atau NEXT_PUBLIC_SANITY_DATASET\n" +
      "SANITY_API_WRITE_TOKEN (WRITE token)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-10-01",
  token,
  useCdn: false,
});

// ====== Helper: robust fetch with retry & fallback ======
async function uploadImageFromUrl(url: string, filename: string) {
  const ua = "tunas-esta-seed/1.0 (+https://tunasesta.co.id)";
  const fallbacks = [
    url,
    // fallback 1: picsum (random)
    "https://picsum.photos/seed/tunas-esta-1/1600/900",
    // fallback 2: placehold.co (teks)
    "https://placehold.co/1600x900/png?text=TUNAS+ESTA+INDONESIA",
  ];

  let lastErr: unknown;
  for (const candidate of fallbacks) {
    try {
      const ac = new AbortController();
      const to = setTimeout(() => ac.abort(), 15000); // 15s timeout
      const res = await fetch(candidate, {
        headers: { "User-Agent": ua, Accept: "image/*" },
        signal: ac.signal,
      });
      clearTimeout(to);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buff = Buffer.from(await res.arrayBuffer());
      const asset = await client.assets.upload("image", buff, { filename });
      return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    } catch (err) {
      lastErr = err;
      // try next fallback
    }
  }
  throw new Error(`Failed to fetch/upload image after fallbacks: ${String(lastErr)}`);
}


async function main() {
  console.log("🌱 Seeding FULL mock data to Sanity...");

  // --- Upload all placeholders in parallel ---
  const [
    imgLogo,
    imgHero,
    imgProdukA,
    imgProdukB,
    imgProdukC,
    imgFasilitas1,
    imgFasilitas2,
    imgCert,
    imgNews,
    imgGallery1,
    imgGallery2,
    imgGallery3,
  ] = await Promise.all([
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1524594154905-91174cfa9953?q=80&w=400",
      "logo-placeholder.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1526312426976-593c9f8d79aa?q=80&w=1600",
      "hero-bg.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1585238342020-96629c0808f8?q=80&w=1200",
      "produk-a.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1200",
      "produk-b.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200",
      "produk-c.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400",
      "facility-1.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1581091870622-1e7b1e6f7d93?q=80&w=1400",
      "facility-2.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1557264305-1491a7f31f3b?q=80&w=800",
      "certificate.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
      "news-cover.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
      "gallery-1.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200",
      "gallery-2.jpg"
    ),
    uploadImageFromUrl(
      "https://images.unsplash.com/photo-1524594154905-91174cfa9953?q=80&w=1200",
      "gallery-3.jpg"
    ),
  ]);

  // --- Documents payload ---
  const docs: any[] = [
    // SETTINGS (singleton)
    {
      _id: "settings-singleton",
      _type: "settings",
      siteTitle: "TUNAS ESTA INDONESIA",
      description: "Produsen sarang burung walet terpercaya.",
      logo: imgLogo,
      socials: {
        instagram: "https://instagram.com/placeholder",
        linkedin: "https://linkedin.com/company/placeholder",
        whatsapp: "https://wa.me/628123456789",
        email: "info@tunasesta.co.id",
        phone: "+62 812-3456-789",
        address: "Jl. Contoh No. 1, Surabaya, Jawa Timur",
        mapEmbed: "",
      },
      defaultOg: imgHero,
    },

    // NAVIGATION (singleton)
    {
      _id: "navigation-main",
      _type: "navigation",
      main: [
        { title: "Tentang", href: "/tentang" },
        { title: "Produk", href: "/produk" },
        { title: "Fasilitas", href: "/fasilitas" },
        { title: "Sertifikasi", href: "/sertifikasi" },
        { title: "Berita", href: "/berita" },
        { title: "Karier", href: "/karier" },
        { title: "Galeri", href: "/galeri" },
        { title: "Kontak", href: "/kontak" },
      ],
      footer: [
        { title: "Kebijakan Privasi", href: "/privacy" },
        { title: "Syarat Layanan", href: "/terms" },
      ],
    },

    // HERO (singleton)
    {
      _id: "hero-home",
      _type: "hero",
      headline: "Sarang Walet Berkualitas Ekspor",
      subheadline: "Dari Indonesia untuk dunia",
      ctaText: "Lihat Produk",
      ctaHref: "/produk",
      background: imgHero,
    },

    // PAGE — Tentang
    {
      _id: "page-tentang",
      _type: "page",
      title: "Tentang Kami",
      slug: { _type: "slug", current: "tentang" },
      body: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text:
                "TUNAS ESTA INDONESIA adalah produsen sarang burung walet yang berfokus pada kualitas, keamanan pangan, dan keberlanjutan.",
            },
          ],
        },
      ],
    },

    // PRODUK (A/B/C)
    {
      _id: "produk-grade-a",
      _type: "produk",
      nama: "Sarang Walet Grade A",
      slug: { _type: "slug", current: "sarang-walet-grade-a" },
      deskripsi: "Bersih, utuh, kualitas premium untuk ekspor.",
      grade: "A",
      foto: imgProdukA,
      spesifikasi: [
        { label: "Kelembaban", value: "< 10%" },
        { label: "Warna", value: "Putih Murni" },
        { label: "Bentuk", value: "Utuh" },
      ],
    },
    {
      _id: "produk-grade-b",
      _type: "produk",
      nama: "Sarang Walet Grade B",
      slug: { _type: "slug", current: "sarang-walet-grade-b" },
      deskripsi: "Sedikit pecahan, tetap berkualitas tinggi.",
      grade: "B",
      foto: imgProdukB,
      spesifikasi: [
        { label: "Kelembaban", value: "< 12%" },
        { label: "Warna", value: "Putih Tulang" },
        { label: "Bentuk", value: "Campuran Pecahan" },
      ],
    },
    {
      _id: "produk-grade-c",
      _type: "produk",
      nama: "Sarang Walet Grade C",
      slug: { _type: "slug", current: "sarang-walet-grade-c" },
      deskripsi: "Pilihan ekonomis untuk kebutuhan tertentu.",
      grade: "C",
      foto: imgProdukC,
      spesifikasi: [
        { label: "Kelembaban", value: "< 14%" },
        { label: "Warna", value: "Off White" },
        { label: "Bentuk", value: "碎/Remukan" },
      ],
    },

    // FASILITAS (2)
    {
      _id: "fasilitas-surabaya",
      _type: "fasilitas",
      nama: "Pabrik Surabaya",
      lokasi: "Surabaya, Jawa Timur",
      kapasitas: "2 ton/bulan",
      foto: imgFasilitas1,
      deskripsi: "Fasilitas produksi higienis dengan standar internasional.",
    },
    {
      _id: "fasilitas-semarang",
      _type: "fasilitas",
      nama: "Gudang Semarang",
      lokasi: "Semarang, Jawa Tengah",
      kapasitas: "1 ton/bulan",
      foto: imgFasilitas2,
      deskripsi: "Gudang penyimpanan terkontrol untuk bahan baku.",
    },

    // SERTIFIKASI (4)
    {
      _id: "sertifikasi-haccp",
      _type: "sertifikasi",
      nama: "HACCP",
      nomor: "HACCP-12345",
      lembaga: "BPOM",
      berlakuSampai: "2026-12-31",
      file: imgCert,
    },
    {
      _id: "sertifikasi-halal",
      _type: "sertifikasi",
      nama: "Sertifikat Halal",
      nomor: "HALAL-98765",
      lembaga: "BPJPH",
      berlakuSampai: "2026-06-30",
      file: imgCert,
    },
    {
      _id: "sertifikasi-bpom",
      _type: "sertifikasi",
      nama: "BPOM",
      nomor: "BPOM-2025-01",
      lembaga: "BPOM",
      berlakuSampai: "2027-01-01",
      file: imgCert,
    },
    {
      _id: "sertifikasi-iso22000",
      _type: "sertifikasi",
      nama: "ISO 22000",
      nomor: "ISO-22000-001",
      lembaga: "ISO",
      berlakuSampai: "2027-12-31",
      file: imgCert,
    },

    // BERITA (3)
    {
      _id: "berita-ekspor-jepang",
      _type: "berita",
      title: "Ekspor Perdana ke Jepang",
      slug: { _type: "slug", current: "ekspor-perdana-ke-jepang" },
      excerpt: "Resmi mengekspor sarang walet ke pasar Jepang.",
      cover: imgNews,
      date: new Date().toISOString(),
      body: [
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Konten berita demo..." }] },
      ],
      tags: ["ekspor", "jepang"],
    },
    {
      _id: "berita-peresmian-pabrik",
      _type: "berita",
      title: "Peresmian Pabrik Baru",
      slug: { _type: "slug", current: "peresmian-pabrik-baru" },
      excerpt: "Peningkatan kapasitas produksi untuk memenuhi permintaan.",
      cover: imgNews,
      date: new Date().toISOString(),
      body: [
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Konten berita demo..." }] },
      ],
      tags: ["fasilitas"],
    },
    {
      _id: "berita-iso22000-update",
      _type: "berita",
      title: "Perbarui Sertifikasi ISO 22000",
      slug: { _type: "slug", current: "perbarui-sertifikasi-iso" },
      excerpt: "Komitmen berkelanjutan terhadap keamanan pangan.",
      cover: imgNews,
      date: new Date().toISOString(),
      body: [
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Konten berita demo..." }] },
      ],
      tags: ["sertifikasi"],
    },

    // KARIER (2)
    {
      _id: "karier-qc-officer",
      _type: "karier",
      posisi: "Quality Control Officer",
      slug: { _type: "slug", current: "quality-control-officer" },
      lokasi: "Surabaya",
      tipe: "Full-time",
      kualifikasi: ["Min. D3 Teknologi Pangan", "Pengalaman QC 1 tahun"],
      emailTujuan: "hr@tunasesta.co.id",
      deskripsi: [{ _type: "block", style: "normal", children: [{ _type: "span", text: "Deskripsi pekerjaan demo." }] }],
    },
    {
      _id: "karier-warehouse-staff",
      _type: "karier",
      posisi: "Warehouse Staff",
      slug: { _type: "slug", current: "warehouse-staff" },
      lokasi: "Semarang",
      tipe: "Contract",
      kualifikasi: ["Familiar FIFO/FEFO", "Cekatan, teliti"],
      emailTujuan: "hr@tunasesta.co.id",
      deskripsi: [{ _type: "block", style: "normal", children: [{ _type: "span", text: "Deskripsi pekerjaan demo." }] }],
    },

    // GALERI
    {
      _id: "album-produksi",
      _type: "galeriAlbum",
      judul: "Kegiatan Produksi",
      slug: { _type: "slug", current: "kegiatan-produksi" },
      deskripsi: "Dokumentasi proses produksi di pabrik.",
    },
    {
      _id: "foto-1",
      _type: "galeriFoto",
      album: { _type: "reference", _ref: "album-produksi" },
      caption: "Produksi harian",
      image: imgGallery1,
    },
    {
      _id: "foto-2",
      _type: "galeriFoto",
      album: { _type: "reference", _ref: "album-produksi" },
      caption: "Pengecekan QC",
      image: imgGallery2,
    },
    {
      _id: "foto-3",
      _type: "galeriFoto",
      album: { _type: "reference", _ref: "album-produksi" },
      caption: "Packing",
      image: imgGallery3,
    },
  ];

  // --- Commit (createOrReplace) ---
  const tx = client.transaction();
  docs.forEach((d) => tx.createOrReplace(d));
  await tx.commit();

  console.log("✅ Seed completed.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
