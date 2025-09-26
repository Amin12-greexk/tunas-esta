import { defineType, defineField } from "sanity";

export default defineType({
  name: "sertifikasi",
  title: "Sertifikasi",
  type: "document",
  fields: [
    defineField({ name: "nama", type: "string", title: "Nama Sertifikat", validation: (r) => r.required() }),
    defineField({ name: "nomor", type: "string", title: "Nomor Sertifikat" }),
    defineField({ name: "lembaga", type: "string", title: "Lembaga Penerbit" }),
    defineField({ name: "berlakuSampai", type: "date", title: "Berlaku Sampai" }),
    defineField({ name: "file", type: "image", title: "File/Foto", options: { hotspot: true } })
  ],
  preview: { select: { title: "nama", subtitle: "nomor", media: "file" } }
});
