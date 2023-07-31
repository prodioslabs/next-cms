import { z } from 'zod'
import axios from 'axios'
import { generateContentBodyValidationSchema, generateContentResponseValidationSchema } from '../../api/schema'

export async function generateContent(input: z.infer<typeof generateContentBodyValidationSchema>) {
  const { data } = await axios.post('/cms/plugins/ai-content', input)
  return generateContentResponseValidationSchema.parse(data)
}
