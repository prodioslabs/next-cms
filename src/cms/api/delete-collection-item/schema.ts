import { z } from 'zod'

export const deleteCollectionItemParamSchema = z.object({
  type: z.literal('collection'),
  elementId: z.string(),
})

export type DeleteCollectionItemParamSchema = z.infer<typeof deleteCollectionItemParamSchema>

export const deleteCollectionItemResponseSchema = z.object({
  type: z.literal('collection'),
  elementId: z.string(),
})

export type DeleteCollectionItemResponseSchema = z.infer<typeof deleteCollectionItemResponseSchema>
