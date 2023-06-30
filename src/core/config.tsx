import { Slot } from '@radix-ui/react-slot'
import { nanoid } from 'nanoid'
import { Collection, CollectionData, Singleton, getCollectionData, getSingletonData } from './collection'
import EditableLink from '~/components/editable-link/editable-link'

export type Config = {
  collections: { [key: string]: Collection }
  singletons: { [key: string]: Singleton }
}

export type CollectionProps<C extends Collection> = {
  render: (props: { items: CollectionData<C>[] }) => React.ReactNode
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
  async function CollectionComponent({ render }: CollectionProps<C['collections'][CollectionId]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const collection = config.collections[collectionId as string]
    const items = await getCollectionData(collection)

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-name': collection.name,
      'data-cms-id': collectionId as string,
      className: 'group',
      id: nanoid(),
    } as const

    // TODO: Remove the typecasting if possible
    return (
      <>
        <Slot {...containerProps}>
          {render({
            items: items as CollectionData<C['collections'][CollectionId]>[],
          })}
        </Slot>
        <EditableLink
          collection={collection}
          collectionId={collectionId as string}
          elementId={containerProps.id}
          type="collection"
        />
      </>
    )
  }

  return CollectionComponent
}

export type SingletonProps<S extends Singleton> = {
  render: (props: { item: CollectionData<S> }) => React.ReactNode
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
  async function SingletonComponent({ render }: SingletonProps<C['singletons'][SingletonId]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const singleton = config.singletons[singletonId as string]
    const item = await getSingletonData(singleton)

    const containerProps = {
      'data-cms-type': 'singleton',
      'data-cms-name': singleton.name,
      'data-cms-id': singletonId as string,
      className: 'group',
      id: nanoid(),
    } as const

    // TODO: Remove the typecasting if possible
    return (
      <>
        <Slot {...containerProps}>
          {render({
            item: item as CollectionData<C['singletons'][SingletonId]>,
          })}
        </Slot>
        <EditableLink
          collection={singleton}
          collectionId={singletonId as string}
          elementId={containerProps.id}
          type="singleton"
        />
      </>
    )
  }

  return SingletonComponent
}
