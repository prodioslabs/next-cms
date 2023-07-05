import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import imageSize from 'image-size'
import { format } from 'date-fns'
import { CMSConfig } from '../types/config'
import { CMSField } from '../types/field'
import { CMSCollection, CMSSingleton } from '../types/schema'
import { createRouteSchema } from './schema'
import { prisma } from '../core/db'
import { isErrnoException } from '../core/utils/file'
import { updateCollectionItemData, updateSingletonData } from '../core/data'

export function createRoute<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  const { updateContentBodySchema, deleteCollectionElementQuerySchema } = createRouteSchema(config)

  /**
   * POST /cms/content
   *
   * Method to update the content of a singleton or a collection
   */
  async function ContentManagerPOST(request: Request) {
    try {
      const input = updateContentBodySchema.parse(await request.json())

      if (input.type === 'collection') {
        const collection = config.collections[input.collectionName]
        await updateCollectionItemData(collection, input.elementId, input.data)
        return NextResponse.json({ ...input })
      } else if (input.type === 'singleton') {
        const singleton = config.singletons[input.singletonName]
        await updateSingletonData(singleton, input.singletonName, input.data)
        return NextResponse.json({ ...input })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: { issues: error.issues, message: error.message, name: error.name } },
          { status: 422 },
        )
      }
      throw error
    }
  }

  /**
   * DELETE /cms/content
   *
   * Method to delete the element of a collection
   */
  async function ContentManagerDELETE(request: Request) {
    const { searchParams } = new URL(request.url)

    try {
      const { id } = deleteCollectionElementQuerySchema.parse({
        id: Number.parseInt(searchParams.get('id') as string),
      })

      await prisma.collectionElement.delete({
        where: {
          id,
        },
      })

      return NextResponse.json({ id })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: { issues: error.issues, message: error.message, name: error.name } },
          { status: 422 },
        )
      }
      throw error
    }
  }

  /**
   * Method to upload images to public directory
   */
  async function ImageUploaderPOST(request: Request) {
    async function getUploadDirectory(basePath: string) {
      const currentDate = format(new Date(), 'dd-MM-yyyy')
      const uploadDirectory = path.resolve(basePath, 'uploads', currentDate)
      try {
        await fs.stat(uploadDirectory)
      } catch (error) {
        if (isErrnoException(error) && error.code === 'ENOENT') {
          await fs.mkdir(uploadDirectory, { recursive: true })
        } else {
          throw error
        }
      }
      return uploadDirectory
    }
    const formData = await request.formData()
    const file = formData.get('file') as Blob | undefined
    if (file) {
      const fileName = file.name
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const { width, height, type } = await imageSize(fileBuffer)

      const basePath = `${process.cwd()}/public`
      const uploadDirectory = await getUploadDirectory(basePath)
      const filepathWithDimensions = `${width}x${height}_${fileName}`
      await fs.writeFile(path.resolve(uploadDirectory, filepathWithDimensions), fileBuffer)

      const assetUrl = path.resolve(uploadDirectory, filepathWithDimensions).replace(basePath, '')

      return NextResponse.json({ url: assetUrl, width, height, type }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Missing file' }, { status: 400 })
    }
  }

  return {
    contentManager: {
      POST: ContentManagerPOST,
      DELETE: ContentManagerDELETE,
    },
    imageUploader: {
      POST: ImageUploaderPOST,
    },
  }
}
