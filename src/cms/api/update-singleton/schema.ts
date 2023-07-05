import { z } from 'zod'

export const updateSingletonBodySchema = z.object({
  type: z.literal('singleton'),
  method: z.literal('update'),
  singletonName: z.string(),
  data: z.any(),
})

export type UpdateSingletonBodySchema = z.infer<typeof updateSingletonBodySchema>

export const updateSingletonResponseSchema = z.object({
  type: z.literal('singleton'),
  singletonName: z.string(),
  data: z.any(),
})

export type UpdateSingletonResponseSchema = z.infer<typeof updateSingletonResponseSchema>
