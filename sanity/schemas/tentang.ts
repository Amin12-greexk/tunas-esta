// sanity/schemas/tentang.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "tentang",
  title: "Tentang Kami",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Judul" }),
    defineField({ name: "heroImage", type: "image", title: "Hero Image", options: { hotspot: true } }),
    defineField({ name: "overview", type: "array", title: "Overview", of: [{ type: "block" }] }),
    defineField({
      name: "milestones",
      type: "array",
      title: "Milestones",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", type: "string", title: "Year" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "values",
      type: "array",
      title: "Company Values",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            { name: "icon", type: "string", title: "Icon (optional manual)" },
          ],
        },
      ],
    }),
  ],
});
