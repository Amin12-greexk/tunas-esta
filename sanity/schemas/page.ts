import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Halaman Statis",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Judul Halaman" }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" } }),
    defineField({ name: "body", type: "array", title: "Isi", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "title" } },
});
