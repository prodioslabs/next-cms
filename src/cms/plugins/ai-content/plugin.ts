import { CMSPlugin } from '~/cms/types/plugin'
import AIContent from './components/ai-content'

export function createAIContentPlugin(config: any): CMSPlugin {
  return {
    name: 'ai-content',
    config,
    enabledForFields: ['text', 'rich-text'],
    component: AIContent,
  }
}
