import { CMSConfig } from '../types/config'
import { CMSField } from '../types/field'
import { CMSPlugin } from '../types/plugin'
import { CMSCollection, CMSSingleton } from '../types/schema'

export function createCMSConfig<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>({
  collections = {} as CMSCollections,
  singletons = {} as CMSSingletons,
  plugins = [],
}: {
  collections?: CMSCollections
  singletons?: CMSSingletons
  plugins?: CMSPlugin[]
}): CMSConfig<CMSCollections, CMSSingletons> {
  return {
    storage: 'database',
    collections,
    singletons,
    plugins: plugins ?? [],
  }
}
