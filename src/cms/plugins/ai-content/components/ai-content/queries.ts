import { z } from 'zod'
import { generateContentBodyValidationSchema, generateContentResponseValidationSchema } from '../../api/schema'

export async function generateContent(input: z.infer<typeof generateContentBodyValidationSchema>) {
  const res = await fetch('/cms/plugins/ai-content', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return generateContentResponseValidationSchema.parse(await res.json())
}
