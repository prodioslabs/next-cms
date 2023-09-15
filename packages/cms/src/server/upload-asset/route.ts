import fs from 'fs/promises'
import path from 'path'
import imageSize from 'image-size'
import { format } from 'date-fns'
import { isErrnoException } from '../../lib/file'
import { uploadAssetBodySchema } from './schema'
import { handleError } from '../../lib/api'

function getRelativeAssetUrl(basePath: string, filePath: string) {
  const assetUrl = path.relative(basePath, filePath)
  return `/${path.posix.join(...assetUrl.split(path.sep))}`
}

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

    const basePath = path.join(process.cwd(), 'public')
    const uploadDirectory = await getUploadDirectory(basePath, assetType)

    switch (assetType) {
      case 'image': {
        const fileName = file.name
        const fileBuffer = Buffer.from(await file.arrayBuffer())
        const { width, height, type } = imageSize(fileBuffer)
        const fileNameWithDimensions = `${width}x${height}_${fileName}`

        const filePath = path.resolve(uploadDirectory, fileNameWithDimensions)
        await fs.writeFile(filePath, fileBuffer)

        const assetUrl = getRelativeAssetUrl(basePath, filePath)

        return Response.json({ url: assetUrl, width, height, type, assetType: 'image' }, { status: 200 })
      }

      case 'video': {
        const fileName = file.name
        const fileBuffer = Buffer.from(await file.arrayBuffer())

        const filePath = path.resolve(uploadDirectory, fileName)
        await fs.writeFile(path.resolve(uploadDirectory, fileName), fileBuffer)

        const assetUrl = getRelativeAssetUrl(basePath, filePath)

        return Response.json({ url: assetUrl, assetType: 'video' }, { status: 200 })
      }
    }
  } catch (error) {
    return handleError(error)
  }
}
