import { z } from 'zod'

export const updateSingletonSchema = z.object({
  singletonName: z.string(),
  data: z.any(),
})
