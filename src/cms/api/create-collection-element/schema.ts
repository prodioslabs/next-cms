import { z } from 'zod'

export const createCollectionElementBodySchema = z.object({
  type: z.literal('collection'),
  method: z.literal('create'),
  collectionName: z.string(),
  data: z.any(),
})

export type CreateCollectionElementBodySchema = z.infer<typeof createCollectionElementBodySchema>

export const createCollectionElementResponseSchema = z.object({
  type: z.literal('collection'),
  collectionName: z.string(),
  data: z.any(),
})

export type CreateCollectionElementResponseSchema = z.infer<typeof createCollectionElementResponseSchema>
