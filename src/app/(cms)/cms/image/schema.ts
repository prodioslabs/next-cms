import { z } from 'zod'

export const uploadImageResponseSchema = z.object({
  url: z.string().min(1),
  width: z.number(),
  height: z.number(),
  type: z.string().min(1),
})
