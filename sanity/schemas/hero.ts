import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Homepage Hero",
  type: "document",
  fields: [
    defineField({ name: "headline", type: "string", title: "Headline" }),
    defineField({ name: "subheadline", type: "string", title: "Subheadline" }),
    defineField({ name: "ctaText", type: "string", title: "CTA Text" }),
    defineField({ name: "ctaHref", type: "string", title: "CTA Link" }),
    defineField({
      name: "background",
      type: "image",
      title: "Background",
      options: { hotspot: true },
    }),
  ],
});
