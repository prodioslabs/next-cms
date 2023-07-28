'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useMemo } from 'react'
import { cn, Loader } from 'ui'
import ContentManager from '../../content-manager'
import { CMSCollection } from '~/types/schema'
import { CMSField } from '~/types/field'
import { CMSPlugin } from '~/types/plugin'
import { api } from '~/server/api'

type CollectionElementPageProps = {
  collection: CMSCollection<Record<string, CMSField>>
  collectionName: string
  elementId: string
  redirectTo: string
  plugins?: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

export default function CollectionElementPage({
  collection,
  collectionName,
  elementId,
  redirectTo,
  plugins,
  className,
  style,
}: CollectionElementPageProps) {
  const collectionElementsQuery = api.collection.fetchCollectionElements.useQuery(
    {
      collectionName,
    },
    {
      enabled: false,
    },
  )
  const collectionElementQuery = api.collection.fetchCollectionElementById.useQuery({
    collectionName,
    elementId,
  })

  const content = useMemo(() => {
    if (collectionElementQuery.isLoading) {
      return <Loader message="Loading content manager..." />
    }

    if (collectionElementQuery.data) {
      return (
        <ContentManager
          schema={collection.schema}
          config={{ type: 'collection', collectionName, elementId, method: 'update' }}
          initialData={collectionElementQuery.data.data}
          plugins={plugins}
          redirectToOnSave={redirectTo}
          onUpdate={() => {
            collectionElementQuery.refetch()
            collectionElementsQuery.refetch()
          }}
          title={`Edit ${collection.label} item`}
        />
      )
    }

    return null
  }, [collectionElementQuery, collectionElementsQuery, collection, collectionName, plugins, redirectTo, elementId])

  return (
    <div className={cn('space-y-4', className)} style={style}>
      <div>
        <Link
          href={`/cms/admin/collection/${collectionName}`}
          className="flex items-center text-sm text-muted-foreground"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Show all items
        </Link>
      </div>
      {content}
    </div>
  )
}
