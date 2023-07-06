export type AIContentPlugin = {
  name: 'ai-content'
  config: {
    OPEN_AI_API_KEY: string
  }
}

export type CMSPlugin = AIContentPlugin
