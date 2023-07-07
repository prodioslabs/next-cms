import { z } from 'zod'
import { CMSPlugin } from '~/cms/types/plugin'
import AIContent from './components/ai-content'

const aiContentPluginSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
})

export function createAIContentPlugin(config: z.infer<typeof aiContentPluginSchema>): CMSPlugin {
  aiContentPluginSchema.parse(config)

  return {
    name: 'ai-content',
    config,
    enabledForFields: ['text', 'rich-text'],
    component: AIContent,
  }
}
