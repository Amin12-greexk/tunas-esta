import { defineType, defineField } from "sanity";

export default defineType({
  name: "localizedBlock",
  title: "Konten (ID/EN/ZH)",
  type: "object",
  fields: [
    defineField({ name: "id", type: "array", title: "Indonesia", of: [{ type: "block" }] }),
    defineField({ name: "en", type: "array", title: "English", of: [{ type: "block" }] }),
    defineField({ name: "zh", type: "array", title: "Chinese", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "id.0.children.0.text", subtitle: "en.0.children.0.text" } },
});
