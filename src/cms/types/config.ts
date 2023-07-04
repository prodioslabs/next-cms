import { Field } from './field'
import { Collection, Singleton } from './schema'

export type Config<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
> = {
  // storage method
  // later on multiple storage solutions, file file storage would be added
  storage: 'database'
  collections: Collections
  singletons: Singletons
}
