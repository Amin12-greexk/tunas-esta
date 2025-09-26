import { defineType, defineField } from "sanity";

export default defineType({
  name: "galeriFoto",
  title: "Foto Galeri",
  type: "document",
  fields: [
    defineField({ name: "album", type: "reference", title: "Album", to: [{ type: "galeriAlbum" }], validation: (r) => r.required() }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
    defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true } })
  ],
  preview: { select: { title: "caption", media: "image" } }
});
