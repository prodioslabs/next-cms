import { Field } from './field'
import { Collection, CollectionData, Singleton, SingletonData } from './schema'

export type CollectionReaderProps<_Collection extends Collection<Record<string, Field>>> =
  | ({
      type: 'list'
    } & CollectionListReaderProps<_Collection>)
  | ({
      type: 'element'
    } & CollectionElementReaderProps<_Collection>)

export type CollectionListReaderProps<_Collection extends Collection<Record<string, Field>>> = {
  renderItems: (args: {
    items: { data: CollectionData<_Collection>; id: string; elementSlug: string }[]
  }) => React.ReactNode
}

export type CollectionElementReaderProps<_Collection extends Collection<Record<string, Field>>> = {
  elementId?: string
  elementSlug?: string
  renderItem: (args: { data: CollectionData<_Collection>; elementSlug: string; id: string }) => React.ReactNode
}

export type SingletonReaderProps<_Singleton extends Singleton<Record<string, Field>>> = {
  renderItem: (args: { data: SingletonData<_Singleton> }) => React.ReactNode
}
