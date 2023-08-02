import { z } from 'zod'
import { Prisma, PrismaClient } from '@prisma/client'
import {
  createFileSchema,
  createFolderSchema,
  deleteFolderSchema,
  getFolderContentSchema,
  updateFileSchema,
  updateFolderSchema,
} from './media.schema'

export const FOLDER_SELECT_FIELDS = {
  parent: true,
} as const satisfies Prisma.FolderSelect

export function createFolder(input: z.infer<typeof createFolderSchema>, prisma: PrismaClient) {
  return prisma.folder.create({
    data: {
      name: input.name,
      parent: input.parent
        ? {
            connect: {
              id: input.parent,
            },
          }
        : undefined,
    },
    select: FOLDER_SELECT_FIELDS,
  })
}

export function updateFolder(input: z.infer<typeof updateFolderSchema>, prisma: PrismaClient) {
  return prisma.folder.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      parent: input.parent
        ? {
            connect: { id: input.parent },
          }
        : undefined,
    },
    select: FOLDER_SELECT_FIELDS,
  })
}

export function deleteFolder(input: z.infer<typeof deleteFolderSchema>, prisma: PrismaClient) {
  return prisma.folder.delete({
    where: {
      id: input.id,
    },
    select: FOLDER_SELECT_FIELDS,
  })
}

export const FILE_SELECT_FIELDS = {
  parent: true,
} as const satisfies Prisma.FileSelect

export function createFile(input: z.infer<typeof createFileSchema>, prisma: PrismaClient) {
  return prisma.file.create({
    data: {
      name: input.name,
      path: input.path,
      parent: input.folder ? { connect: { id: input.folder } } : undefined,
    },
    select: FILE_SELECT_FIELDS,
  })
}

export function updateFile(input: z.infer<typeof updateFileSchema>, prisma: PrismaClient) {
  return prisma.file.update({
    where: {
      id: input.id,
    },
    data: {
      name: input.name,
      path: input.path,
      parent: input.folder ? { connect: { id: input.folder } } : undefined,
    },
    select: FILE_SELECT_FIELDS,
  })
}

export function deleteFile(input: z.infer<typeof updateFileSchema>, prisma: PrismaClient) {
  return prisma.file.delete({
    where: {
      id: input.id,
    },
    select: FILE_SELECT_FIELDS,
  })
}

export function getFolderContent(input: z.infer<typeof getFolderContentSchema>, prisma: PrismaClient) {
  return Promise.all([
    prisma.folder.findMany({
      where: {
        parentId: input.id,
      },
    }),
    prisma.file.findMany({
      where: {
        parentId: input.id,
      },
    }),
  ])
}
