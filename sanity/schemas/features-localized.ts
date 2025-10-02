// schemas/features.ts
import { defineType, defineField } from 'sanity'
import { FileCheck, Utensils, Heart, Sparkles } from 'lucide-react'

export default defineType({
  name: 'features',
  title: 'Features Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main title for the features section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Legal/Certificate', value: 'legal' },
                  { title: 'Quality/Service', value: 'quality' },
                  { title: 'Customization', value: 'custom' },
                  { title: 'Customer Focus', value: 'customer' }
                ],
                layout: 'dropdown'
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this feature appears (1-4)',
              validation: (Rule) => Rule.required().min(1).max(4),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              order: 'order'
            },
            prepare({ title, subtitle, order }) {
              return {
                title: `${order}. ${title}`,
                subtitle: subtitle
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      features: 'features'
    },
    prepare({ title, features }) {
      return {
        title: title || 'Features Section',
        subtitle: `${features?.length || 0} features`
      }
    }
  }
})

// Alternative schema with localization support
// schemas/features-localized.ts
export const featuresLocalized = defineType({
  name: 'featuresLocalized',
  title: 'Features Section (Localized)',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Indonesian', value: 'id' },
          { title: 'English', value: 'en' },
          { title: 'Chinese', value: 'zh' }
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'object',
              fields: [
                { name: 'id', type: 'string', title: 'Indonesian' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'zh', type: 'string', title: 'Chinese' }
              ]
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'id', type: 'text', title: 'Indonesian', rows: 3 },
                { name: 'en', type: 'text', title: 'English', rows: 3 },
                { name: 'zh', type: 'text', title: 'Chinese', rows: 3 }
              ]
            }),
            defineField({
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Legal/Certificate', value: 'legal' },
                  { title: 'Quality/Service', value: 'quality' },
                  { title: 'Customization', value: 'custom' },
                  { title: 'Customer Focus', value: 'customer' }
                ]
              }
            }),
            defineField({
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(4),
            }),
          ],
          preview: {
            select: {
              title: 'title.id',
              titleEn: 'title.en',
              order: 'displayOrder'
            },
            prepare({ title, titleEn, order }) {
              return {
                title: `${order}. ${title || titleEn}`,
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().length(4),
    }),
  ],
})

// Usage in sanity.config.ts
// Add to your schema types array:
// import features from './schemas/features'
// import { featuresLocalized } from './schemas/features-localized'
// 
// export default defineConfig({
//   // ... other config
//   schema: {
//     types: [features, featuresLocalized, /* other schemas */]
//   }
// })