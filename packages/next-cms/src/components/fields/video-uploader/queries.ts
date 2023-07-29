import axios, { AxiosProgressEvent } from 'axios'
import { uploadVideoResponseSchema } from '../../../server/upload-asset/schema'

export async function uploadVideo(file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('assetType', 'video')
  const { data } = await axios.post('/cms/api/upload-asset', formData, {
    onUploadProgress,
  })
  return uploadVideoResponseSchema.parse(data)
}
