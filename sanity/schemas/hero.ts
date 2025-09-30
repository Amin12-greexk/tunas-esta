import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Homepage Hero",
  type: "document",
  fields: [
    defineField({ name: "headline", type: "string", title: "Headline", validation: (R) => R.required() }),
    defineField({ name: "subheadline", type: "string", title: "Subheadline" }),
    defineField({ name: "ctaText", type: "string", title: "CTA Text" }),
    defineField({ name: "ctaHref", type: "string", title: "CTA Link" }),

    // Tetap ada: legacy single background (biar nggak breaking)
    defineField({
      name: "background",
      type: "image",
      title: "Background (Legacy - optional)",
      options: { hotspot: true },
    }),

    // Baru: multiple backgrounds untuk slideshow
    defineField({
      name: "backgrounds",
      type: "array",
      title: "Backgrounds (Slideshow)",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
          ],
        },
      ],
      options: { layout: "grid" },
      // opsional: validasi minimal 1 gambar
      // validation: (R) => R.min(1),
    }),
  ],
});
