import { createRouter, protectedProcedure } from '../../trpc'
import {
  createFileSchema,
  createFolderSchema,
  deleteFileSchema,
  deleteFolderSchema,
  getFolderContentSchema,
  updateFileSchema,
  updateFolderSchema,
} from './media.schema'
import {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  getFolderContent,
  updateFile,
  updateFolder,
} from './media.service'

export const mediaRouter = createRouter({
  createFolder: protectedProcedure
    .input(createFolderSchema)
    .mutation(({ input, ctx: { prisma } }) => createFolder(input, prisma)),
  updateFolder: protectedProcedure
    .input(updateFolderSchema)
    .mutation(({ input, ctx: { prisma } }) => updateFolder(input, prisma)),
  deleteFolder: protectedProcedure
    .input(deleteFolderSchema)
    .mutation(({ input, ctx: { prisma } }) => deleteFolder(input, prisma)),
  createFile: protectedProcedure
    .input(createFileSchema)
    .mutation(({ input, ctx: { prisma } }) => createFile(input, prisma)),
  updateFile: protectedProcedure
    .input(updateFileSchema)
    .mutation(({ input, ctx: { prisma } }) => updateFile(input, prisma)),
  deleteFile: protectedProcedure
    .input(deleteFileSchema)
    .mutation(({ input, ctx: { prisma } }) => deleteFile(input, prisma)),
  getFolderContent: protectedProcedure
    .input(getFolderContentSchema)
    .query(({ input, ctx: { prisma } }) => getFolderContent(input, prisma)),
})
