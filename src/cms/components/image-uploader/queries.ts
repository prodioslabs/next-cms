import { uploadImageResponseSchema } from '~/cms/api/schema'

export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/cms/image', { method: 'POST', body: formData, cache: 'no-cache' })
  return uploadImageResponseSchema.parse(await res.json())
}
