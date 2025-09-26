import { defineType, defineField } from "sanity";

export default defineType({
  name: "galeriAlbum",
  title: "Album Galeri",
  type: "document",
  fields: [
    defineField({ name: "judul", type: "string", title: "Judul", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "judul" }, validation: (r) => r.required() }),
    defineField({ name: "deskripsi", type: "text", title: "Deskripsi" })
  ],
  preview: { select: { title: "judul" } }
});
