import { defineType, defineField } from "sanity";

export default defineType({
  name: "inquiry",
  title: "Contact Inquiry",
  type: "document",
  fields: [
    defineField({ name: "nama", type: "string", title: "Nama", validation: (r) => r.required() }),
    defineField({ name: "email", type: "string", title: "Email", validation: (r) => r.required() }),
    defineField({ name: "pesan", type: "text", title: "Pesan", validation: (r) => r.required() }),
    defineField({ name: "createdAt", type: "datetime", title: "Created At", initialValue: () => new Date().toISOString() })
  ],
  preview: { select: { title: "nama", subtitle: "email" } }
});
