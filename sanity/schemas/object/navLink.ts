// sanity/schemas/objects/navLink.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Judul Teks',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      type: 'string',
      title: 'URL / Link Tujuan',
      description: 'Gunakan path relatif (contoh: /produk) atau URL lengkap (https://...)'
    }),
  ],
})