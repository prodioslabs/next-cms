import { z } from 'zod'

export const fetchSingletonSchema = z.object({
  singletonName: z.string(),
})

export const updateSingletonSchema = z.object({
  singletonName: z.string(),
  data: z.any(),
})
