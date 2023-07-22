import { createRouter, protectedProcedure } from '../../trpc'
import { updateSingletonSchema } from './singleton.schema'
import { updateSingleton } from './singleton.service'

export const singletonRouter = createRouter({
  updateSingleton: protectedProcedure
    .input(updateSingletonSchema)
    .mutation(({ input, ctx: { prisma, config } }) => updateSingleton(input, config, prisma)),
})
