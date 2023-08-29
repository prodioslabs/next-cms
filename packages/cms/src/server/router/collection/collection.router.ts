import { createRouter, protectedProcedure, publicProcedure } from '../../trpc'
import {
  createCollectionElementSchema,
  deleteCollectionElementSchema,
  fetchCollectionElementByIdSchema,
  fetchCollectionElementBySlugSchema,
  fetchCollectionElementsSchema,
  updateCollectionElementSchema,
} from './collection.schema'
import {
  createCollectionElement,
  deleteCollectionElement,
  fetchCollectionElementById,
  fetchCollectionElementBySlug,
  fetchCollectionElements,
  updateCollectionElement,
} from './collection.service'

export const collectionRouter = createRouter({
  fetchCollectionElements: publicProcedure
    .input(fetchCollectionElementsSchema)
    .query(({ input, ctx: { prisma, config } }) => fetchCollectionElements(input, config, prisma)),
  fetchCollectionElementById: publicProcedure
    .input(fetchCollectionElementByIdSchema)
    .query(({ input, ctx: { prisma, config } }) => fetchCollectionElementById(input, config, prisma)),
  fetchCollectionElementBySlug: publicProcedure
    .input(fetchCollectionElementBySlugSchema)
    .query(({ input, ctx: { prisma, config } }) => fetchCollectionElementBySlug(input, config, prisma)),
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
