'use client'

import { CMSField } from '~/cms/types/field'
import UpdateSingletonForm from './components/update-singleton-form'
import { CMSPlugin } from '~/cms/types/plugin'
import UpdateCollectionElementForm from './components/update-collection-element-form'
import CreateCollectionElementForm from './components/create-collection-element-form'

type Config =
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

type ContentManagerProps = {
  config: Config
  schema: Record<string, CMSField>
  initialData: any
  plugins?: CMSPlugin[]
  redirectToOnSave: string
  className?: string
  style?: React.CSSProperties
}

export default function ContentManager({ config, ...rest }: ContentManagerProps) {
  switch (config.type) {
    case 'singleton': {
      return <UpdateSingletonForm {...rest} singletonName={config.singletonName} />
    }

    case 'collection': {
      switch (config.method) {
        case 'create': {
          return <CreateCollectionElementForm {...rest} collectionName={config.collectionName} />
        }

        case 'update': {
          return (
            <UpdateCollectionElementForm
              {...rest}
              collectionName={config.collectionName}
              elementId={config.elementId}
            />
          )
        }

        default: {
          return null
        }
      }
    }

    default: {
      return null
    }
  }
}
