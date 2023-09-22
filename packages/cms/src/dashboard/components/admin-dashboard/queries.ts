import axios, { AxiosProgressEvent } from 'axios'
import { uploadAssetResponseSchema } from '../../../server/asset/upload/schema'

export async function uploadAsset(
  { file, folderId }: { file: File; folderId?: string },
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) {
  const formData = new FormData()
  formData.append('file', file)
  if (folderId) {
    formData.append('folderId', folderId)
  }

  const { data } = await axios.post('/cms/api/asset/upload', formData, {
    onUploadProgress,
  })

  return uploadAssetResponseSchema.parse(data)
}
