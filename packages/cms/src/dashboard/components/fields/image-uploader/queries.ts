import axios, { AxiosProgressEvent } from 'axios'
import { uploadImageResponseSchema } from '../../../../server/asset/upload/schema'

export async function uploadImage(file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('assetType', 'image')
  const { data } = await axios.post('/cms/api/asset/upload', formData, {
    onUploadProgress,
  })
  return uploadImageResponseSchema.parse(data)
}
