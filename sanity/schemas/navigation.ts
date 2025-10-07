import { defineType, defineField } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "main",
      title: "Main Menu (Header)", // Judul diubah agar lebih jelas
      type: "array",
      of: [
        {
          name: "navItem", // Memberi nama pada objek ini adalah praktik yang baik
          title: "Menu Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              type: "string",
              title: "URL/Path",
              description: "Kosongkan jika ini adalah menu dropdown", // Tambahan deskripsi
              // Hapus validasi required() agar bisa dikosongkan
            }),
            // ===== INI BAGIAN YANG DITAMBAHKAN =====
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              // 'of' menunjuk ke tipe objek 'navLink' yang akan kita buat
              of: [{ type: 'navLink' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer Menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title", validation: (r) => r.required() },
            { name: "href", type: "string", title: "URL/Path", validation: (r) => r.required() },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "main.0.title" } },
});