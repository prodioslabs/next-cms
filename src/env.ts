import { z } from 'zod'

const serverEnvSchema = z.object({
  /**
   * Next.js environment variables
   */
  NODE_ENV: z.enum(['development', 'production']),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

  /**
   * NextCMS configuration
   */
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),

  /**
   * AI-Content Plugin
   */
  OPENAI_API_KEY: z.string().min(1).optional(),

  /**
   * Unsplash Plugin
   */
  UNSPLASH_ACCESS_KEY: z.string().min(1).optional(),
  UNSPLASH_SECRET_KEY: z.string().min(1).optional(),
})

const clientEnvSchema = z.object({})

const envSchema = serverEnvSchema.merge(clientEnvSchema)

const isServer = typeof window === 'undefined'

const parsed = (isServer ? envSchema.parse(process.env) : clientEnvSchema.parse(process.env)) as z.infer<
  typeof envSchema
>

const env = new Proxy(parsed, {
  get(target, prop) {
    if (typeof prop !== 'string') {
      return undefined
    }

    if (!isServer && prop !== 'NODE_ENV' && !prop.startsWith('NEXT_PUBLIC_')) {
      throw new Error(`Cannot access non-public environment variable "${prop}" on the client`)
    }

    return target[prop as keyof typeof target]
  },
})

export { env }
