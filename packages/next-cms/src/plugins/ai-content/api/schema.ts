import { z } from 'zod'

export const generateContentBodyValidationSchema = z.object({
  message: z.string().min(1),
  fieldType: z.enum(['text', 'rich-text']),
})

export const generateContentResponseValidationSchema = z.object({
  content: z.string().min(1),
  fieldType: z.enum(['text', 'rich-text']),
})
