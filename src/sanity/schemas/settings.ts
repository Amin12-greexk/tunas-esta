import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", title: "Site Title" }),
    defineField({ name: "description", type: "text", title: "Description" }),
    defineField({ name: "logo", type: "image", title: "Logo", options: { hotspot: true } }),
    defineField({
      name: "socials",
      type: "object",
      fields: [
        { name: "instagram", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "whatsapp", type: "url" },
        { name: "email", type: "string" },
        { name: "phone", type: "string" }
      ]
    })
  ],
  preview: { select: { title: "siteTitle" } }
});
