import { z } from 'zod'
import { trpc } from '../trpc'

export const router = trpc.router({
  test: trpc.router({
    hello: trpc.procedure.input(z.object({})).query(() => ({ text: 'hello world' })),
  }),
})

export type AppRouter = typeof router
