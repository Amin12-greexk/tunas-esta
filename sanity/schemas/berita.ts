import { defineType, defineField } from "sanity";

export default defineType({
  name: "berita",
  title: "Berita",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Judul", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", title: "Excerpt" }),
    defineField({ name: "cover", type: "image", title: "Cover", options: { hotspot: true } }),
    defineField({ name: "body", type: "array", title: "Isi", of: [{ type: "block" }] }),
    defineField({ name: "tags", type: "array", title: "Tags", of: [{ type: "string" }] }),
    defineField({ name: "date", type: "datetime", title: "Tanggal" })
  ],
  preview: { select: { title: "title", subtitle: "date", media: "cover" } }
});
