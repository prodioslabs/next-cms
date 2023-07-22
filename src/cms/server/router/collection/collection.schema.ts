import { z } from 'zod'

export const createCollectionElementSchema = z.object({
  collectionName: z.string(),
  data: z.any(),
})

export const updateCollectionElementSchema = z.object({
  collectionName: z.string(),
  elementId: z.string(),
  data: z.any(),
})

export const deleteCollectionElementSchema = z.object({
  elementId: z.string(),
})
