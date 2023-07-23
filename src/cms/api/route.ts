import { uploadImage } from './upload-image/route'
import { CMSCollection, CMSSingleton } from '../types/schema'
import { CMSField } from '../types/field'
import { CMSConfig } from '../types/config'

export function createRoute<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config: CMSConfig<CMSCollections, CMSSingletons>,
) {
  /**
   * Method to upload images to public directory
   */
  async function imageUploaderPOST(request: Request) {
    return uploadImage(request)
  }

  return {
    imageUploader: {
      POST: imageUploaderPOST,
    },
  }
}
