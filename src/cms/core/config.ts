import { Config } from '../types/config'
import { Field } from '../types/field'
import { Collection, Singleton } from '../types/schema'

export function createConfig<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
>({
  collections,
  singletons,
}: {
  collections?: Collections
  singletons?: Singletons
}): Config<Collections, Singletons> {
  return {
    storage: 'database',
    collections,
    singletons,
  }
}
