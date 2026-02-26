import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        published: z.boolean().default(false),
        date: z.string(), // Keep as string since your dates are in ISO format
        tags: z.array(z.string()).optional(),
        description: z.string().optional(),
        cover: z.string().optional(),
        video: z.string().optional(),
        excerpt: z.string().optional(),
        shortDesc: z.string().optional(),
        author: z.string().optional(),
        featured: z.boolean().optional(),
        series: z.string().optional(),
        seriesOrder: z.number().optional(),
        seriesTitle: z.string().optional()
      })
    }),
    newsletter: defineCollection({
      type: 'page',
      source: 'newsletter/**/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        published: z.boolean().default(false),
        date: z.string(),
        description: z.string().optional(),
        excerpt: z.string().optional()
      })
    }),
    speaking: defineCollection({
      type: 'page',
      source: 'speaking/**/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        published: z.boolean().default(false),
        date: z.string(),
        conference: z.string(),
        conferenceUrl: z.string().optional(),
        location: z.string(),
        description: z.string().optional()
      })
    })
  }
})