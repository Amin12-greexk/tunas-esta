// src/lib/sanity.queries.ts
import { groq } from "next-sanity";

// Homepage
export const qHero = groq`*[_type=="hero"][0]{
  headline,
  subheadline,
  ctaText,
  ctaHref,
  // slideshow: pakai backgrounds[] kalau ada; kalau tidak, fallback ke background tunggal
  "bgUrls": coalesce(backgrounds[].asset->url, select(defined(background)=>[background.asset->url], [])),
  "bgUrl": background.asset->url // optional: untuk fallback di komponen lama
}`;

// Settings
export const qSettings = groq`*[_type=="settings"][0]{
  siteTitle,
  description,
  "logoUrl": logo.asset->url,
  socials
}`;

// Pages
export const qPageBySlug = groq`*[_type=="page" && slug.current==$slug][0]{
  title,
  body,
  "slug": slug.current
}`;

// — PRODUCTS — (updated)
export const qAllProduk = groq`*[_type=="produk"]{
  _id,
  nama,
  "deskripsi": coalesce(string(deskripsi), pt::text(deskripsi)),
  "tipe": coalesce(tipe, ""),
  "ukuran": coalesce(ukuran, ""),
  "fotoUrl": foto.asset->url,
  "slug": slug.current
} | order(tipe asc, ukuran asc)`;

export const qProdukBySlug = groq`*[_type=="produk" && slug.current==$slug][0]{
  nama,
  "deskripsi": coalesce(string(deskripsi), pt::text(deskripsi)),
  "tipe": coalesce(tipe, ""),
  "ukuran": coalesce(ukuran, ""),
  "fotoUrl": foto.asset->url,
  "slug": slug.current
}`;

// Opsional: filter by tipe (tetap bisa, karena tipe sekarang string biasa)
export const qProdukByTipe = groq`*[_type=="produk" && tipe==$tipe]{
  _id,
  nama,
  "deskripsi": coalesce(string(deskripsi), pt::text(deskripsi)),
  "tipe": coalesce(tipe, ""),
  "ukuran": coalesce(ukuran, ""),
  "fotoUrl": foto.asset->url,
  "slug": slug.current
} | order(ukuran asc)`;
// Facilities
export const qAllFasilitas = groq`*[_type=="fasilitas"] | order(_createdAt desc){
  _id,
  nama,
  lokasi,
  kapasitas,
  deskripsi,
  "fotoUrl": foto.asset->url
}`;

// News/Berita
export const qAllBerita = groq`*[_type=="berita"] | order(date desc){
  _id,
  title,
  slug,
  excerpt,
  "coverUrl": cover.asset->url,
  tags,
  date
}`;

export const qLatestBerita = groq`*[_type=="berita"] | order(date desc)[0...3]{
  _id,
  title,
  slug,
  excerpt,
  "coverUrl": cover.asset->url,
  tags,
  date
}`;

export const qBeritaBySlug = groq`*[_type=="berita" && slug.current==$slug][0]{
  title,
  slug,
  excerpt,
  "coverUrl": cover.asset->url,
  body,
  tags,
  date
}`;

// Career
export const qAllKarier = groq`*[_type=="karier"] | order(_createdAt desc){
  _id,
  posisi,
  slug,
  lokasi,
  tipe,
  deskripsi,
  kualifikasi,
  emailTujuan
}`;

export const qKarierBySlug = groq`*[_type=="karier" && slug.current==$slug][0]{
  posisi,
  slug,
  lokasi,
  tipe,
  deskripsi,
  kualifikasi,
  emailTujuan
}`;

// Certifications
export const qAllSertifikasi = groq`*[_type=="sertifikasi"] | order(berlakuSampai desc){
  _id,
  nama,
  nomor,
  lembaga,
  berlakuSampai,
  "fileUrl": file.asset->url
}`;

// Gallery
export const qAllGaleriAlbum = groq`*[_type=="galeriAlbum"] | order(_createdAt desc){
  _id,
  judul,
  slug,
  deskripsi
}`;

export const qGaleriFotoByAlbum = groq`*[_type=="galeriFoto" && album._ref==$albumId] | order(_createdAt desc){
  _id,
  caption,
  "imageUrl": image.asset->url,
  album->{
    judul,
    slug
  }
}`;

export const qAllGaleriFoto = groq`*[_type=="galeriFoto"] | order(_createdAt desc){
  _id,
  caption,
  "imageUrl": image.asset->url,
  album->{
    judul,
    slug
  }
}`;

// Navigation
export const qNavigation = groq`*[_type=="navigation"][0]{
  main[]{
    title,
    href
  },
  footer[]{
    title,
    href
  }
}`;

export const qTentang = groq`*[_type=="tentang"][0]{
  title,
  "heroUrl": heroImage.asset->url,
  overview,
  milestones,
  values
}`;