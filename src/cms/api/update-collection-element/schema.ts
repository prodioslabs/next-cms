import { z } from 'zod'

export const updateCollectionElementBodySchema = z.object({
  type: z.literal('collection'),
  method: z.literal('update'),
  collectionName: z.string(),
  elementId: z.string(),
  data: z.any(),
})

export type UpdateCollectionElementBodySchema = z.infer<typeof updateCollectionElementBodySchema>

export const updateCollectionElementResponseSchema = z.object({
  type: z.literal('collection'),
  collectionName: z.string(),
  elementId: z.string(),
  data: z.any(),
})

export type UpdateCollectionElementResponseSchema = z.infer<typeof updateCollectionElementResponseSchema>
