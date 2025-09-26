import { defineType, defineField } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "main",
      title: "Main Menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title", validation: (r) => r.required() },
            { name: "href", type: "string", title: "URL/Path", validation: (r) => r.required() }
          ]
        }
      ]
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
            { name: "href", type: "string", title: "URL/Path", validation: (r) => r.required() }
          ]
        }
      ]
    })
  ],
  preview: { select: { title: "main.0.title" } }
});
