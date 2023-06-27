import { Collection, CollectionData, CollectionProps, Singleton, SingletonProps } from './collection'
import { getCollectionData, getSingletonData } from './data'

export type Config = {
  collections: { [key: string]: Collection }
  singletons: { [key: string]: Singleton }
}

/**
 * Creates a data fetcher component for the collection. The component fetches data and passes to its children as a render prop.
 *
 * @param config CMS configuration
 * @param collectionName name of the collection
 * @returns component that fetches data from the collection and passes it to the children
 */
export function createCollectionComponentFromConfig<C extends Config, CollectionName extends keyof C['collections']>(
  config: C,
  collectionName: CollectionName,
) {
  async function CollectionComponent({ children }: CollectionProps<C['collections'][CollectionName]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const collection = config.collections[collectionName as string]
    const items = await getCollectionData(collection)
    // Wrapped the children with Fragment because of this issue: https://github.com/vercel/next.js/issues/49280
    // TODO: Remove this if the issue is fixed
    // TODO: Remove the typecasting if possible
    return <>{children({ items: items as CollectionData<C['collections'][CollectionName]>[] })}</>
  }

  return CollectionComponent
}

/**
 * Creates a data fetcher component for the singleton. The component fetches data and passes to its children as a render prop.
 *
 * @param config CMS configuration
 * @param singletonName name of the singleton
 * @returns component that fetches data from the singleton and passes it to the children
 */
export function createSingletonComponentFromConfig<C extends Config, SingletonName extends keyof C['singletons']>(
  config: C,
  singletonName: SingletonName,
) {
  async function CollectionComponent({ children }: SingletonProps<C['singletons'][SingletonName]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const singleton = config.singletons[singletonName as string]
    const item = await getSingletonData(singleton)
    // Wrapped the children with Fragment because of this issue: https://github.com/vercel/next.js/issues/49280
    // TODO: Remove this if the issue is fixed
    // TODO: Remove the typecasting if possible
    return <>{children({ item: item as CollectionData<C['singletons'][SingletonName]> })}</>
  }

  return CollectionComponent
}
