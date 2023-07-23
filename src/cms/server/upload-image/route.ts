import fs from 'fs/promises'
import path from 'path'
import imageSize from 'image-size'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'
import { isErrnoException } from '~/cms/utils/file'

export async function POST(request: Request) {
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
