import { Collection, CollectionData, Singleton, getCollectionData, getSingletonData } from './collection'

export type Config = {
  collections: { [key: string]: Collection }
  singletons: { [key: string]: Singleton }
}

type ContainerProps = {
  'data-cms-type': 'collection' | 'singleton'
  'data-cms-id': string
}

export type CollectionProps<C extends Collection> = {
  children: (props: { items: CollectionData<C>[]; containerProps: ContainerProps }) => React.ReactNode
}

/**
 * Creates a data fetcher component for the collection. The component fetches data and passes to its children as a render prop.
 *
 * @param config CMS configuration
 * @param collectionId id of the collection
 * @returns component that fetches data from the collection and passes it to the children
 */
export function createCollectionComponentFromConfig<C extends Config, CollectionId extends keyof C['collections']>(
  config: C,
  collectionId: CollectionId,
) {
  async function CollectionComponent({ children }: CollectionProps<C['collections'][CollectionId]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const collection = config.collections[collectionId as string]
    const items = await getCollectionData(collection)

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-id': collectionId as string,
    } as const

    // Wrapped the children with Fragment because of this issue: https://github.com/vercel/next.js/issues/49280
    // TODO: Remove this if the issue is fixed
    // TODO: Remove the typecasting if possible
    return <>{children({ items: items as CollectionData<C['collections'][CollectionId]>[], containerProps })}</>
  }

  return CollectionComponent
}

export type SingletonProps<S extends Singleton> = {
  children: (props: { item: CollectionData<S>; containerProps: ContainerProps }) => React.ReactNode
}

/**
 * Creates a data fetcher component for the singleton. The component fetches data and passes to its children as a render prop.
 *
 * @param config CMS configuration
 * @param singletonId id of the singleton
 * @returns component that fetches data from the singleton and passes it to the children
 */
export function createSingletonComponentFromConfig<C extends Config, SingletonId extends keyof C['singletons']>(
  config: C,
  singletonId: SingletonId,
) {
  async function CollectionComponent({ children }: SingletonProps<C['singletons'][SingletonId]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const singleton = config.singletons[singletonId as string]
    const item = await getSingletonData(singleton)

    const containerProps = {
      'data-cms-type': 'singleton',
      'data-cms-id': singletonId as string,
    } as const

    // Wrapped the children with Fragment because of this issue: https://github.com/vercel/next.js/issues/49280
    // TODO: Remove this if the issue is fixed
    // TODO: Remove the typecasting if possible
    return <>{children({ item: item as CollectionData<C['singletons'][SingletonId]>, containerProps })}</>
  }

  return CollectionComponent
}
