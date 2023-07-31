import { createRouter, protectedProcedure, publicProcedure } from '../../trpc'
import { fetchSingletonSchema, updateSingletonSchema } from './singleton.schema'
import { fetchSingleton, updateSingleton } from './singleton.service'

export const singletonRouter = createRouter({
  fetchSingleton: publicProcedure
    .input(fetchSingletonSchema)
    .query(({ input, ctx: { config, prisma } }) => fetchSingleton(input, config, prisma)),
  updateSingleton: protectedProcedure
    .input(updateSingletonSchema)
    .mutation(({ input, ctx: { prisma, config } }) => updateSingleton(input, config, prisma)),
})
