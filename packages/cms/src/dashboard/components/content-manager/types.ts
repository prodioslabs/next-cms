import type { CMSField, CMSPlugin } from '@nextjs-cms/core'

export type Config =
  | {
      type: 'singleton'
      method: 'update'
      singletonName: string
    }
  | {
      type: 'collection'
      method: 'create'
      collectionName: string
    }
  | {
      type: 'collection'
      method: 'update'
      elementId: string
      collectionName: string
    }

export type ContentManagerProps = {
  config: Config
  title?: string
  schema: Record<string, CMSField>
  initialData: any
  plugins?: CMSPlugin[]
  onUpdate: () => void
  redirectToOnSave: string
  className?: string
  style?: React.CSSProperties
}
