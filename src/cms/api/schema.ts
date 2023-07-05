import { z } from 'zod'
import { updateSingletonBodySchema } from './update-singleton/schema'
import { updateCollectionElementBodySchema } from './update-collection-element/schema'
import { createCollectionElementBodySchema } from './create-collection-element/schema'
export {
  deleteCollectionItemParamSchema,
  type DeleteCollectionItemParamSchema,
  deleteCollectionItemResponseSchema,
  type DeleteCollectionItemResponseSchema,
} from './delete-collection-item/schema'
export { uploadImageResponseSchema, type UploadImageResponseSchema } from './upload-image/schema'

export const createOrUpdateContentBodySchema = z.union([
  updateSingletonBodySchema,
  updateCollectionElementBodySchema,
  createCollectionElementBodySchema,
])

export type CreateOrUpdateContentBodySchema = z.infer<typeof createOrUpdateContentBodySchema>
