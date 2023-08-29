import { z } from 'zod'

export const fetchCollectionElementsSchema = z.object({
  collectionName: z.string(),
})

export const fetchCollectionElementByIdSchema = z.object({
  collectionName: z.string(),
  elementId: z.string(),
})

export const fetchCollectionElementBySlugSchema = z.object({
  collectionName: z.string(),
  slug: z.string(),
})

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
