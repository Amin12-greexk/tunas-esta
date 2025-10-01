// schemas/produk.ts
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

    // ✅ Free-text (tanpa list)
    defineField({
      name: "tipe",
      type: "string",
      title: "Tipe Produk",
      description: "Contoh: Oval, Sudut, Patahan, Pure Nest, Mangkok, dll.",
    }),

    // ✅ Free-text (tanpa list)
    defineField({
      name: "ukuran",
      type: "string",
      title: "Ukuran",
      description: "Contoh: 3.8 cm, Jumbo, Super, Premium, dst.",
    }),

    defineField({
      name: "foto",
      type: "image",
      title: "Foto Produk",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "nama", subtitle: "tipe", media: "foto" },
  },
});
