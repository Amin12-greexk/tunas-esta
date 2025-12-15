import { defineType, defineField } from "sanity";

export default defineType({
  name: "karier",
  title: "Lowongan",
  type: "document",
  fields: [
    defineField({ name: "posisi", type: "string", title: "Posisi", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "posisi" }, validation: (r) => r.required() }),
    defineField({ name: "lokasi", type: "string", title: "Lokasi" }),
    defineField({ name: "tipe", type: "string", title: "Tipe", options: { list: ["Full-time", "Part-time", "Contract"] } }),
    defineField({
      name: "department",
      type: "string",
      title: "Department",
      options: {
        list: [
          { title: "Production", value: "Production" },
          { title: "Quality Control", value: "Quality Control" },
          { title: "Sales & Marketing", value: "Sales & Marketing" },
          { title: "Administration", value: "Administration" },
        ],
      },
      description: "Pilih departemen untuk filter karier.",
    }),
    defineField({ name: "deskripsi", type: "array", title: "Deskripsi", of: [{ type: "block" }] }),
    defineField({ name: "kualifikasi", type: "array", title: "Kualifikasi", of: [{ type: "string" }] }),
    defineField({ name: "emailTujuan", type: "string", title: "Email Tujuan" })
  ],
  preview: { select: { title: "posisi", subtitle: "lokasi" } }
});
