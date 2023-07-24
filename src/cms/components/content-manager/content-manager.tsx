'use client'

import UpdateSingletonForm from './components/update-singleton-form'
import UpdateCollectionElementForm from './components/update-collection-element-form'
import CreateCollectionElementForm from './components/create-collection-element-form'
import { ContentManagerProps } from './types'

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
