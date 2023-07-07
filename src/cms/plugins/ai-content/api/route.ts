import { LLMChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { NextResponse } from 'next/server'
import { handleError } from '~/cms/utils/api'
import { generateContentBodyValidationSchema } from './schema'
import { env } from '~/env'

export async function generateContentPOST(request: Request) {
  try {
    const { fieldType, message } = generateContentBodyValidationSchema.parse(await request.json())

    const llm = new ChatOpenAI({
      streaming: true,
      openAIApiKey: env.OPENAI_API_KEY,
    })

    const prompt =
      fieldType === 'text'
        ? new PromptTemplate({
            template:
              'Generate content for a CMS based on the following message. Limit the content to no more than 1 paragraph.\n\nMessage: {message}\n\nContent:',
            inputVariables: ['message'],
          })
        : new PromptTemplate({
            template:
              'Generate content for a CMS based on the following message.Generate the content in markdown.\n\nMessage: {message}\n\nContent:',
            inputVariables: ['message'],
          })

    const chain = new LLMChain({ llm, prompt })

    const chainRes = await chain.call({
      message,
    })
    return NextResponse.json({
      fieldType,
      content: chainRes.text,
    })
  } catch (error) {
    return handleError(error)
  }
}
