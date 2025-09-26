import { defineType, defineField } from "sanity";

export default defineType({
  name: "produk",
  title: "Produk",
  type: "document",
  fields: [
    defineField({ name: "nama", type: "string", title: "Nama Produk" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "nama" },
    }),
    defineField({
      name: "deskripsi",
      type: "text",
      title: "Deskripsi",
    }),
    defineField({
      name: "grade",
      type: "string",
      title: "Grade",
      options: {
        list: ["A", "B", "C", "Premium", "Export"],
      },
    }),
    defineField({
      name: "foto",
      type: "image",
      title: "Foto Produk",
      options: { hotspot: true },
    }),
    defineField({
      name: "spesifikasi",
      type: "array",
      title: "Spesifikasi QC",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "nama", subtitle: "grade", media: "foto" } },
});
