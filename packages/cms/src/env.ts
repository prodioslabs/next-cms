import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
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
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,

    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
  },
})
