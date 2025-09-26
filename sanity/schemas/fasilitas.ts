import { defineType, defineField } from "sanity";

export default defineType({
  name: "fasilitas",
  title: "Fasilitas",
  type: "document",
  fields: [
    defineField({ name: "nama", type: "string", title: "Nama Fasilitas" }),
    defineField({ name: "lokasi", type: "string", title: "Lokasi" }),
    defineField({ name: "kapasitas", type: "string", title: "Kapasitas Produksi" }),
    defineField({
      name: "deskripsi",
      type: "text",
      title: "Deskripsi",
    }),
    defineField({
      name: "foto",
      type: "image",
      title: "Foto Fasilitas",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "nama", subtitle: "lokasi", media: "foto" } },
});
