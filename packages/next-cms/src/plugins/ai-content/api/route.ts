import { LLMChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { NextResponse } from 'next/server'
import { generateContentBodyValidationSchema } from './schema'
import { handleError } from '../../../utils/api'
import { env } from '../../../env'

export async function generateAIContent(request: Request) {
  try {
    const { fieldType, message } = generateContentBodyValidationSchema.parse(await request.json())

    const llm = new ChatOpenAI({
      openAIApiKey: env.OPENAI_API_KEY,
      temperature: 0.9,
    })

    const promptTemplate =
      fieldType === 'text'
        ? 'You are a professional chatbot meant to help the user of a CMS generate content for their website. Generate the content based on Message. Limit the content to no more than 1 paragraph.\n\nMessage: {message}\n\nContent:'
        : 'You are a professional chatbot meant to help the user of a CMS generate content for their website. Generate the content in markdown based on the Message. Limit the content to no more than 2 paragraphs.\n\nMessage: {message}\n\nContent:'

    const prompt = new PromptTemplate({ template: promptTemplate, inputVariables: ['message'] })
    const chain = new LLMChain({ llm, prompt })

    const { text } = await chain.call({
      message,
    })

    return NextResponse.json({ fieldType, content: text })
  } catch (error) {
    return handleError(error)
  }
}
