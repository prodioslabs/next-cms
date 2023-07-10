import { z } from 'zod'

export const searchImageQueryParamsSchema = z.object({
  query: z.string(),
  page: z.string().optional(),
})

export const searchImageResponseSchema = z.object({
  photos: z.object({
    total: z.number(),
    total_pages: z.number(),
    results: z.array(
      z.object({
        id: z.string(),
        height: z.number(),
        width: z.number(),
        description: z.string().nullable(),
        urls: z.object({
          full: z.string(),
          raw: z.string(),
          regular: z.string(),
          small: z.string(),
          thumb: z.string(),
        }),
      }),
    ),
  }),
})
