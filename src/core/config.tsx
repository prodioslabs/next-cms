import { Slot } from '@radix-ui/react-slot'
import { nanoid } from 'nanoid'
import { Schema, ElementData, Singleton, Collection } from './collection'
import EditableLink from '~/components/editable-link/editable-link'
import { resolveUrl } from '~/lib/api'
import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'

export type Config = {
  basePath: string
  collections: { [key: string]: Collection }
  singletons: { [key: string]: Singleton }
}

export type CollectionProps<C extends Schema> = {
  render: (props: { items: ElementData<C>[] }) => React.ReactNode
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
  const { getContentResponseSchema } = generateRouteHandlerSchemas(config)

  async function CollectionComponent({ render }: CollectionProps<C['collections'][CollectionId]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const collection = config.collections[collectionId as string]
    const res = await fetch(resolveUrl(`/cms/content?type=collection&id=${collectionId as string}`), {
      cache: 'no-cache',
    })
    const items = getContentResponseSchema.parse(await res.json()).data

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
            items: items as ElementData<C['collections'][CollectionId]>[],
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
  render: (props: { item: ElementData<S> }) => React.ReactNode
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
  const { getContentResponseSchema } = generateRouteHandlerSchemas(config)

  async function SingletonComponent({ render }: SingletonProps<C['singletons'][SingletonId]>) {
    // TODO: Figure out the reason for typecasting and remove it later on if possible
    const singleton = config.singletons[singletonId as string]
    const res = await fetch(resolveUrl(`/cms/content?type=singleton&id=${singletonId as string}`), {
      cache: 'no-cache',
    })
    const item = getContentResponseSchema.parse(await res.json()).data

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
            item: item as ElementData<C['singletons'][SingletonId]>,
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
