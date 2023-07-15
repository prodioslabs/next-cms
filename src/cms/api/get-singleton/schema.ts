import { z } from 'zod'

export const getSingletonBodySchema = z.object({
  type: z.literal('singleton'),
  singletonName: z.string(),
})
