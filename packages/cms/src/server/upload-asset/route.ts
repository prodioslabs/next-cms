import fs from 'fs/promises'
import path from 'path'
import imageSize from 'image-size'
import { format } from 'date-fns'
import { prisma } from '@nextjs-cms/core'
import filenamify from 'filenamify'
import { nanoid } from 'nanoid'
import { isErrnoException } from '../../lib/file'
import { uploadAssetBodySchema } from './schema'
import { handleError } from '../../lib/api'

function getAssetType(blob: Blob) {
  return /^(?<type>.+)\/(?<subtype>.+)$/.exec(blob.type)?.groups?.type
}

type GetMetadataOptions = {
  blob: Blob
  assetType?: ReturnType<typeof getAssetType>
  buffer?: Buffer
}

/**
 * Get metadata for an asset (e.g. image dimensions)
 */
async function getMetadata({ blob, buffer: incomigBuffer, assetType: incomingAssetType }: GetMetadataOptions) {
  const assetType = incomingAssetType ?? getAssetType(blob)
  const commonMetadata = { name: blob.name }

  if (assetType === 'image') {
    const buffer = incomigBuffer ?? Buffer.from(await blob.arrayBuffer())
    const size = imageSize(buffer)
    return {
      ...commonMetadata,
      width: size.width,
      height: size.height,
      type: size.type,
    }
  }

  return commonMetadata
}

function getRelativeAssetUrl(basePath: string, filePath: string) {
  const assetUrl = path.relative(basePath, filePath)
  return `/${path.posix.join(...assetUrl.split(path.sep))}`
}

async function getUploadDirectory(basePath: string, assetType: 'image' | 'video') {
  const currentDate = format(new Date(), 'dd-MM-yyyy')
  const uploadDirectory = path.join(basePath, 'uploads', assetType, currentDate)
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
    const incomingFile = formData.get('file')
    const incomeAssetType = formData.get('assetType')
    const incomingFolderId = formData.get('folderId')

    // Validate if file is a blob first before validating the rest of the body
    const { file } = uploadAssetBodySchema.pick({ file: true }).parse({ file: incomingFile })
    const { assetType, folderId } = uploadAssetBodySchema.omit({ file: true }).parse({
      assetType: incomeAssetType ?? getAssetType(file),
      folderId: incomingFolderId ?? undefined,
    })

    // Add prefix to prevent name collisions and sanitize file name
    const sanitizedFileName = `${nanoid(6)}-${filenamify(file.name)}`

    // Calculate path where file will be saved
    const basePath = path.resolve('public')
    const uploadDirectory = await getUploadDirectory(basePath, assetType)
    const absoluteFilePath = path.resolve(uploadDirectory, sanitizedFileName)
    const relativeFilePath = path.relative(basePath, absoluteFilePath)

    // Write to disk
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(absoluteFilePath, buffer)

    // Create file record in database
    const createdFile = await prisma.file.create({
      data: {
        assetType,
        mimeType: file.type,
        name: file.name,
        path: relativeFilePath,
        size: file.size,
        // URL where file can be accessed
        url: getRelativeAssetUrl(basePath, absoluteFilePath),
        metadata: await getMetadata({ blob: file, buffer, assetType }),
        parentId: folderId,
      },
    })

    return new Response(
      JSON.stringify({ assetType: createdFile.assetType, url: createdFile.url, metadata: createdFile.metadata }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return handleError(error)
  }
}
