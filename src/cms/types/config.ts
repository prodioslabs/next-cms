import { CMSField } from './field'
import { CMSCollection, CMSSingleton } from './schema'

export type CMSConfig<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
> = {
  // storage method
  // later on multiple storage solutions, file file storage would be added
  storage: 'database'
  collections: CMSCollections
  singletons: CMSSingletons
}
