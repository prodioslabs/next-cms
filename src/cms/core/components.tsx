import { camelCase } from 'lodash-es'
import { nanoid } from 'nanoid'
import { Slot } from '@radix-ui/react-slot'
import {
  CollectionElementReaderProps,
  CollectionListReaderProps,
  CollectionReaderProps,
  SingletonReaderProps,
} from '../types/components'
import { Config } from '../types/config'
import { Field } from '../types/field'
import { Collection, CollectionData, Singleton, SingletonData } from '../types/schema'
import EditableLink from '../components/editable-link'
import {
  fetchCollectionElementDataById,
  fetchCollectionElementDataBySlug,
  fetchCollectionsListData,
  fetchSingletonData,
} from './data'

export function createCollectionReader<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
  CollectionName extends keyof Collections = keyof Collections,
>(config: Config<Collections, Singletons>, collectionName: CollectionName & string) {
  async function CollectionListReader({ renderItems }: CollectionListReaderProps<Collections[CollectionName]>) {
    const collection = config.collections?.[collectionName]
    if (!collection) {
      throw new Error(`Collection ${collectionName} not found`)
    }

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-name': collection.label,
      'data-cms-id': collectionName as string,
      className: 'group',
      id: nanoid(),
    } as const

    const items = await fetchCollectionsListData(collection, collectionName)

    return (
      <>
        <Slot {...containerProps}>
          {renderItems({
            items: items.map((item) => ({
              id: item.id,
              elementSlug: item.slug,
              data: item.data as CollectionData<Collections[CollectionName]>,
            })),
          })}
        </Slot>
        <EditableLink
          label={collection.label}
          url={`/admin/collection/${collectionName}`}
          containerElementId={containerProps.id}
        />
      </>
    )
  }
  CollectionListReader.displayName = `${camelCase(collectionName)}ListReader`

  async function CollectionElementReader({
    elementId,
    elementSlug,
    renderItem,
  }: CollectionElementReaderProps<Collections[CollectionName]>) {
    if (typeof elementId === 'undefined' && typeof elementSlug === 'undefined') {
      throw new Error('Either elementId or elementSlug must be provided')
    }

    const collection = config.collections?.[collectionName]
    if (!collection) {
      throw new Error(`Collection ${collectionName} not found`)
    }

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-name': collection.label,
      'data-cms-id': collectionName as string,
      'data-cms-slug': elementSlug,
      className: 'group',
      id: nanoid(),
    } as const

    const item = elementSlug
      ? await fetchCollectionElementDataBySlug(collection, collectionName, elementSlug)
      : await fetchCollectionElementDataById(collection, elementId!) // as we have already checked that either elementId or elementSlug is defined, we can safely assume that elementId is defined

    return (
      <>
        <Slot {...containerProps}>
          {renderItem({
            data: item.data as CollectionData<Collections[CollectionName]>,
            id: item.id,
            elementSlug: item.slug,
          })}
        </Slot>
        <EditableLink
          label={collection.label}
          url={`/admin/collection/${collectionName}/${item.id}`}
          containerElementId={containerProps.id}
        />
      </>
    )
  }
  CollectionElementReader.displayName = `${camelCase(collectionName)}ElementReader`

  function CollectionReader(props: CollectionReaderProps<Collections[CollectionName]>) {
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
  CollectionReader.displayName = `${camelCase(collectionName)}CollectionReader`
  return CollectionReader
}

export function createSingletonReader<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
  SingletonName extends keyof Singletons = keyof Singletons,
>(config: Config<Collections, Singletons>, singletonName: SingletonName & string) {
  async function SingletonReader({ renderItem }: SingletonReaderProps<Singletons[SingletonName]>) {
    const singleton = config.singletons?.[singletonName]
    if (!singleton) {
      throw new Error(`Singleton ${singletonName} not found`)
    }

    const containerProps = {
      'data-cms-type': 'collection',
      'data-cms-name': singleton.label,
      'data-cms-id': singletonName as string,
      className: 'group',
      id: nanoid(),
    } as const

    const item = await fetchSingletonData(singleton, singletonName)

    return (
      <>
        <Slot {...containerProps}>{renderItem({ data: item.data as SingletonData<Singletons[SingletonName]> })}</Slot>
        <EditableLink
          label={singleton.label}
          url={`/admin/singleton/${singletonName}`}
          containerElementId={containerProps.id}
        />
      </>
    )
  }
  SingletonReader.displayName = `${camelCase(singletonName)}SingletonReader`
  return SingletonReader
}
