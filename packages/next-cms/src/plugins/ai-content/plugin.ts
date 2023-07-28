import { CMSPlugin } from '~/types/plugin'
import AIContent from './components/ai-content'
import { generateAIContent } from './api/route'

export function createAIContentPlugin(config: any): CMSPlugin {
  return {
    name: 'ai-content',
    config,
    enabledForFields: ['text', 'rich-text'],
    component: AIContent,
    api: {
      method: 'POST',
      handler: generateAIContent,
    },
  }
}
