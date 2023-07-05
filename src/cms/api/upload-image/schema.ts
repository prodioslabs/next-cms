import { z } from 'zod'

export const uploadImageResponseSchema = z.object({
  url: z.string().min(1),
  width: z.number(),
  height: z.number(),
  type: z.string().min(1),
})

export type UploadImageResponseSchema = z.infer<typeof uploadImageResponseSchema>
