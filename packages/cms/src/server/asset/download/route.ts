import fs from 'fs/promises'
import { prisma } from '@nextjs-cms/core'
import contentDisposition from 'content-disposition'
import { handleError } from '../../../lib/api'

export async function downloadAssetHandler(request: Request, { params }: { params: { id: string } }) {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!file) {
      return new Response('File not found', { status: 404 })
    }

    // TODO: Check if it's possible to stream the file instead of loading it into memory
    const buffer = await fs.readFile(file.path)

    return new Response(buffer, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': contentDisposition(file.name, { type: 'inline' }),
      },
    })
  } catch (error) {
    return handleError(error)
  }
}
