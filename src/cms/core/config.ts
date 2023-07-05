import { CMSConfig } from '../types/config'
import { CMSField } from '../types/field'
import { CMSCollection, CMSSingleton } from '../types/schema'

export function createCMSConfig<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>({
  collections,
  singletons,
}: {
  collections: CMSCollections
  singletons: CMSSingletons
}): CMSConfig<CMSCollections, CMSSingletons> {
  return {
    storage: 'database',
    collections,
    singletons,
  }
}
