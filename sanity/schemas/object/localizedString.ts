import { defineType, defineField } from "sanity";

export default defineType({
  name: "localizedString",
  title: "Teks (ID/EN/ZH)",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string", title: "Indonesia" }),
    defineField({ name: "en", type: "string", title: "English" }),
    defineField({ name: "zh", type: "string", title: "Chinese" }),
  ],
  preview: { select: { title: "id", subtitle: "en" } },
});
