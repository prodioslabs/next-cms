import axios, { AxiosProgressEvent } from 'axios'
import { uploadImageResponseSchema } from '~/cms/server/upload-image/schema'

export async function uploadImage(file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await axios.post('/cms/image', formData, {
    onUploadProgress,
  })
  return uploadImageResponseSchema.parse(data)
}
