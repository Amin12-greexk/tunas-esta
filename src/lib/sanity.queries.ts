// src/lib/sanity.queries.ts
import { groq } from "next-sanity";

// Homepage
export const qHero = groq`*[_type=="hero"][0]{
  headline,
  subheadline,
  ctaText,
  ctaHref,
  "bgUrl": background.asset->url,
  "videoUrl": video.asset->url
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

// Products
export const qAllProduk = groq`*[_type=="produk"] | order(grade asc){
  _id,
  nama,
  deskripsi,
  grade,
  "fotoUrl": foto.asset->url,
  spesifikasi,
  "slug": slug.current
}`;

export const qProdukBySlug = groq`*[_type=="produk" && slug.current==$slug][0]{
  nama,
  deskripsi,
  grade,
  "fotoUrl": foto.asset->url,
  spesifikasi,
  "slug": slug.current
}`;

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