import { z } from 'zod'

export const uploadAssetBodySchema = z.object({
  file: z.instanceof(Blob),
  assetType: z.enum(['image', 'video']),
})

export const uploadImageResponseSchema = z.object({
  assetType: z.literal('image'),
  url: z.string().min(1),
  width: z.number(),
  height: z.number(),
  type: z.string().min(1),
})

export const uploadVideoResponseSchema = z.object({
  assetType: z.literal('video'),
  url: z.string().min(1),
})
