import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(10),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).min(1).max(4),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
