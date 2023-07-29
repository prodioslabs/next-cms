import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    /**
     * Next.js environment variables
     */
    NODE_ENV: z.enum(['development', 'production']),
    NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
  },
})
