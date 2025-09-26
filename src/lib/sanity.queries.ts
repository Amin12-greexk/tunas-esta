import { groq } from "next-sanity";

export const qHero = groq`*[_type=="hero"][0]{
  headline,
  subheadline,
  ctaText,
  ctaHref,
  "bgUrl": background.asset->url
}`;

export const qSettings = groq`*[_type=="settings"][0]{
  siteTitle,
  description,
  "logoUrl": logo.asset->url,
  socials
}`;
export const qPageBySlug = groq`*[_type=="page" && slug.current==$slug][0]{
  title,
  body
}`;
export const qAllProduk = groq`*[_type=="produk"] | order(grade asc){
  nama,
  deskripsi,
  grade,
  "fotoUrl": foto.asset->url,
  spesifikasi,
  "slug": slug.current
}`;
export const qAllFasilitas = groq`*[_type=="fasilitas"] | order(_createdAt desc){
  nama,
  lokasi,
  kapasitas,
  deskripsi,
  "fotoUrl": foto.asset->url
}`;
