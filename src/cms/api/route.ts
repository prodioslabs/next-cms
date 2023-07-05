import { createOrUpdateContentBodySchema } from './schema'
import { handleError } from '../utils/api'
import { deleteCollectionItem } from './delete-collection-item/route'
import { uploadImage } from './upload-image/route'
import { CMSCollection, CMSSingleton } from '../types/schema'
import { CMSField } from '../types/field'
import { CMSConfig } from '../types/config'
import { createUpdateCollectionItemAPI } from './update-collection-element/route'
import { createCreateCollectionItemAPI } from './create-collection-element/route'
import { createUpdateSingletonAPI } from './update-singleton/route'

export function createRoute<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  /**
   * POST /cms/content
   *
   * Method to update the content of a singleton or a collection
   */
  async function contentManagerPOST(request: Request) {
    try {
      const input = createOrUpdateContentBodySchema.parse(await request.json())

      if (input.type === 'collection') {
        if (input.method === 'update') {
          return createUpdateCollectionItemAPI(config.collections)(input)
        }
        if (input.method === 'create') {
          return createCreateCollectionItemAPI(config.collections)(input)
        }
      } else if (input.type === 'singleton') {
        return createUpdateSingletonAPI(config.singletons)(input)
      }
    } catch (error) {
      return handleError(error)
    }
  }

  /**
   * DELETE /cms/content
   *
   * Method to delete the element of a collection
   */
  async function contentManagerDELETE(request: Request) {
    return deleteCollectionItem(request)
  }

  /**
   * Method to upload images to public directory
   */
  async function imageUploaderPOST(request: Request) {
    return uploadImage(request)
  }

  return {
    contentManager: {
      POST: contentManagerPOST,
      DELETE: contentManagerDELETE,
    },
    imageUploader: {
      POST: imageUploaderPOST,
    },
  }
}
