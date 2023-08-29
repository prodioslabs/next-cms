import type { CMSField, CMSCollection, CMSCollectionData, CMSSingleton, CMSSingletonData } from '@nextjs-cms/core'

export type CollectionReaderProps<_Collection extends CMSCollection<Record<string, CMSField>>> =
  | ({
      type: 'list'
    } & CollectionListReaderProps<_Collection>)
  | ({
      type: 'element'
    } & CollectionElementReaderProps<_Collection>)

export type CollectionListReaderProps<_Collection extends CMSCollection<Record<string, CMSField>>> = {
  renderItems: (args: {
    items: { data: CMSCollectionData<_Collection>; id: string; elementSlug: string }[]
  }) => React.ReactNode
}

export type CollectionElementReaderProps<_Collection extends CMSCollection<Record<string, CMSField>>> = {
  elementId?: string
  elementSlug?: string
  renderItem: (args: { data: CMSCollectionData<_Collection>; elementSlug: string; id: string }) => React.ReactNode
}

export type SingletonReaderProps<_Singleton extends CMSSingleton<Record<string, CMSField>>> = {
  renderItem: (args: { data: CMSSingletonData<_Singleton> }) => React.ReactNode
}
