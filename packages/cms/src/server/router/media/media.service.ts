import { z } from 'zod'
import { Prisma, PrismaClient } from '@nextjs-cms/core'
import {
  createFileSchema,
  createFolderSchema,
  deleteFolderSchema,
  getFolderContentSchema,
  updateFileSchema,
  updateFolderSchema,
} from './media.schema'

export const FOLDER_INCLUDE_FIELDS = {
  parent: true,
} as const satisfies Prisma.FolderInclude

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
    include: FOLDER_INCLUDE_FIELDS,
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
    include: FOLDER_INCLUDE_FIELDS,
  })
}

export function deleteFolder(input: z.infer<typeof deleteFolderSchema>, prisma: PrismaClient) {
  return prisma.folder.delete({
    where: {
      id: input.id,
    },
    include: FOLDER_INCLUDE_FIELDS,
  })
}

export const FILE_INCLUDE_FIELDS = {
  parent: true,
} as const satisfies Prisma.FileInclude

export function createFile(input: z.infer<typeof createFileSchema>, prisma: PrismaClient) {
  return prisma.file.create({
    data: {
      assetType: input.assetType,
      mimeType: input.mimeType,
      path: input.path,
      url: input.url,
      name: input.name,
      size: input.size,
      parent: input.folder ? { connect: { id: input.folder } } : undefined,
      metadata: input.metadata,
    },
    include: FILE_INCLUDE_FIELDS,
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
    include: FILE_INCLUDE_FIELDS,
  })
}

export function deleteFile(input: z.infer<typeof updateFileSchema>, prisma: PrismaClient) {
  return prisma.file.delete({
    where: {
      id: input.id,
    },
    include: FILE_INCLUDE_FIELDS,
  })
}

export async function getFolderContent(input: z.infer<typeof getFolderContentSchema>, prisma: PrismaClient) {
  const [folders, files] = await Promise.all([
    prisma.folder.findMany({
      where: {
        parentId: {
          isSet: typeof input.id === 'string',
          equals: input.id,
        },
      },
    }),
    prisma.file.findMany({
      where: {
        parentId: {
          isSet: typeof input.id === 'string',
          equals: input.id,
        },
      },
    }),
  ])

  return { folders, files }
}
