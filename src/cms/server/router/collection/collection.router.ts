import { createRouter, protectedProcedure } from '../../trpc'
import {
  createCollectionElementSchema,
  deleteCollectionElementSchema,
  updateCollectionElementSchema,
} from './collection.schema'
import { createCollectionElement, deleteCollectionElement, updateCollectionElement } from './collection.service'

export const collectionRouter = createRouter({
  createCollectionElement: protectedProcedure
    .input(createCollectionElementSchema)
    .mutation(({ input, ctx: { prisma, config } }) => createCollectionElement(input, config, prisma)),
  updateCollectionElement: protectedProcedure
    .input(updateCollectionElementSchema)
    .mutation(({ input, ctx: { prisma, config } }) => updateCollectionElement(input, config, prisma)),
  deleteCollectionElement: protectedProcedure
    .input(deleteCollectionElementSchema)
    .mutation(({ input, ctx: { prisma } }) => deleteCollectionElement(input, prisma)),
})
