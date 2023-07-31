import fs from 'fs/promises'
import path from 'path'
import imageSize from 'image-size'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'
import { isErrnoException } from '../../utils/file'
import { uploadAssetBodySchema } from './schema'
import { handleError } from '../../utils/api'

async function getUploadDirectory(basePath: string, assetType: 'image' | 'video') {
  const currentDate = format(new Date(), 'dd-MM-yyyy')
  const uploadDirectory = path.resolve(basePath, 'uploads', assetType, currentDate)
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

export async function uploadAssetHandler(request: Request) {
  try {
    const formData = await request.formData()
    const { file, assetType } = uploadAssetBodySchema.parse({
      file: formData.get('file'),
      assetType: formData.get('assetType'),
    })

    const basePath = `${process.cwd()}/public`
    const uploadDirectory = await getUploadDirectory(basePath, assetType)

    switch (assetType) {
      case 'image': {
        const fileName = file.name
        const fileBuffer = Buffer.from(await file.arrayBuffer())
        const { width, height, type } = await imageSize(fileBuffer)

        const filepathWithDimensions = `${width}x${height}_${fileName}`
        await fs.writeFile(path.resolve(uploadDirectory, filepathWithDimensions), fileBuffer)

        const assetUrl = path.resolve(uploadDirectory, filepathWithDimensions).replace(basePath, '')

        return NextResponse.json({ url: assetUrl, width, height, type, assetType: 'image' }, { status: 200 })
      }

      case 'video': {
        const fileName = file.name
        const fileBuffer = Buffer.from(await file.arrayBuffer())

        await fs.writeFile(path.resolve(uploadDirectory, fileName), fileBuffer)

        const assetUrl = path.resolve(uploadDirectory, fileName).replace(basePath, '')

        return NextResponse.json({ url: assetUrl, assetType: 'video' }, { status: 200 })
      }
    }
  } catch (error) {
    return handleError(error)
  }
}
