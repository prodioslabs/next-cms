import { Slot } from '@radix-ui/react-slot'
import {
  fetchCollectionElementById,
  fetchCollectionElementBySlug,
  fetchCollectionElements,
  fetchSingleton,
} from '@nextjs-cms/cms/core'
import { EditableLink } from '@nextjs-cms/cms/element'
import { generateRandomString } from '../lib/random'
import { pascalCase } from '../lib/string'
import type {
  CollectionElementReaderProps,
  CollectionListReaderProps,
  CollectionReaderProps,
  SingletonReaderProps,
} from '../types/components'
import type { CMSConfig } from '../types/config'
import type { CMSField } from '../types/field'
import type { CMSCollection, CMSCollectionData, CMSSingleton, CMSSingletonData } from '../types/schema'

export function createCollectionReader<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
  CollectionName extends keyof CMSCollections = keyof CMSCollections,
>(config: CMSConfig<CMSCollections, CMSSingletons>, collectionName: CollectionName & string) {
  async function CollectionListReader({ renderItems }: CollectionListReaderProps<CMSCollections[CollectionName]>) {
    const collection = config.collections?.[collectionName]
    if (!collection) {
      throw new Error(`Collection ${collectionName} not found`)
    }

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-label': collection.label,
      'data-cms-id': collectionName as string,
      id: generateRandomString(16),
    } as const

    const items = await fetchCollectionElements(collection, collectionName)

    return (
      <>
        <Slot {...containerProps}>
          {renderItems({
            items: items.map((item) => ({
              id: item.id,
              elementSlug: item.slug,
              data: item.data as CMSCollectionData<CMSCollections[CollectionName]>,
            })),
          })}
        </Slot>
        <EditableLink
          label={collection.label}
          url={`/cms/admin/collection/${collectionName}`}
          containerElementId={containerProps.id}
        />
      </>
    )
  }
  CollectionListReader.displayName = `${pascalCase(collectionName)}ListReader`

  async function CollectionElementReader({
    elementId,
    elementSlug,
    renderItem,
  }: CollectionElementReaderProps<CMSCollections[CollectionName]>) {
    if (typeof elementId === 'undefined' && typeof elementSlug === 'undefined') {
      throw new Error('Either elementId or elementSlug must be provided')
    }

    const collection = config.collections?.[collectionName]
    if (!collection) {
      throw new Error(`Collection ${collectionName} not found`)
    }

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-label': collection.label,
      'data-cms-id': collectionName as string,
      'data-cms-slug': elementSlug,
      className: 'group',
      id: generateRandomString(16),
    } as const

    const item = elementSlug
      ? await fetchCollectionElementBySlug(collection, collectionName, elementSlug)
      : await fetchCollectionElementById(collection, elementId!) // as we have already checked that either elementId or elementSlug is defined, we can safely assume that elementId is defined

    return (
      <>
        <Slot {...containerProps}>
          {renderItem({
            data: item.data as CMSCollectionData<CMSCollections[CollectionName]>,
            id: item.id,
            elementSlug: item.slug,
          })}
        </Slot>
        <EditableLink
          label={collection.label}
          url={`/cms/admin/collection/${collectionName}/${item.id}`}
          containerElementId={containerProps.id}
        />
      </>
    )
  }
  CollectionElementReader.displayName = `${pascalCase(collectionName)}ElementReader`

  function CollectionReader(props: CollectionReaderProps<CMSCollections[CollectionName]>) {
    switch (props.type) {
      case 'list': {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, ...rest } = props
        return <CollectionListReader {...rest} />
      }

      case 'element': {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type, ...rest } = props
        return <CollectionElementReader {...rest} />
      }

      default: {
        return null
      }
    }
  }
  CollectionReader.displayName = `${pascalCase(collectionName)}CollectionReader`
  return CollectionReader
}

export function createSingletonReader<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
  SingletonName extends keyof CMSSingletons = keyof CMSSingletons,
>(config: CMSConfig<CMSCollections, CMSSingletons>, singletonName: SingletonName & string) {
  async function SingletonReader({ renderItem }: SingletonReaderProps<CMSSingletons[SingletonName]>) {
    const singleton = config.singletons?.[singletonName]
    if (!singleton) {
      throw new Error(`Singleton ${singletonName} not found`)
    }

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-label': singleton.label,
      'data-cms-id': singletonName as string,
      className: 'group',
      id: generateRandomString(16),
    } as const

    const item = await fetchSingleton(singleton, singletonName)

    return (
      <>
        <Slot {...containerProps}>
          {renderItem({ data: item.data as CMSSingletonData<CMSSingletons[SingletonName]> })}
        </Slot>
        <EditableLink
          label={singleton.label}
          url={`/cms/admin/singleton/${singletonName}`}
          containerElementId={containerProps.id}
        />
      </>
    )
  }
  SingletonReader.displayName = `${pascalCase(singletonName)}SingletonReader`
  return SingletonReader
}
