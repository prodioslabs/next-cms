import { createTRPCReact } from '@trpc/react-query'
import { loggerLink, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { AppRouter } from './router'

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCReact<AppRouter>()

export const trpcClient = api.createClient({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
})
