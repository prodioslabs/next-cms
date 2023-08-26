'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { ChevronRight, PackageOpen, Plus } from 'lucide-react'
import DeleteCollectionItem from '../../delete-collection-item'
import { CMSCollection } from '../../../../types/schema'
import { CMSField } from '../../../../types/field'
import { api } from '../../../../server/api'
import { Loader } from '../../../ui/loader'
import { Button } from '../../../ui/button'
import { cn } from '../../../lib/utils'

type CollectionPageProps = {
  collection: CMSCollection<Record<string, CMSField>>
  collectionName: string
  className?: string
  style?: React.CSSProperties
}

export default function CollectionPage({ collection, collectionName, className, style }: CollectionPageProps) {
  const query = api.collection.fetchCollectionElements.useQuery({ collectionName })

  const content = useMemo(() => {
    if (query.isLoading) {
      return <Loader message={`Loading ${collection.label} elements...`} />
    }

    if (query.data) {
      if (query.data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
            <PackageOpen className="mb-2 h-10 w-10 text-muted-foreground opacity-20" />
            <div className="mb-2 text-sm text-muted-foreground">
              No elements found for {collection.label} collection
            </div>
            <Link href={`/cms/admin/collection/${collectionName}/new`}>
              <Button icon={<Plus />} size="sm" variant="outline">
                Create New Item
              </Button>
            </Link>
          </div>
        )
      }

      return query.data.map((item, index) => {
        const itemId = item.id
        const itemSlug = item.slug
        const itemIdentifier = collection.nameField
          ? item[collection.nameField as keyof typeof item] ?? itemSlug
          : itemSlug

        return (
          <div key={itemId} className="flex items-center space-x-2 truncate rounded-md border px-4 py-2">
            <Link className="flex-1 space-y-1 truncate" href={`/cms/admin/collection/${collectionName}/${itemId}`}>
              <div className="truncate text-sm text-foreground">
                {typeof itemIdentifier === 'string' || typeof itemIdentifier === 'number' ? itemIdentifier : index}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Edit</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
            <DeleteCollectionItem
              elementId={itemId}
              onDelete={() => {
                query.refetch()
              }}
            />
          </div>
        )
      })
    }
  }, [query, collection, collectionName])

  return (
    <>
      <title>Content Manager - {collection.label}</title>
      <div className={cn('space-y-4', className)} style={style}>
        <div className="flex items-center">
          <div className="flex-1 text-base font-medium text-foreground">Items</div>
          <Link href={`/cms/admin/collection/${collectionName}/new`}>
            <Button icon={<Plus />}>Create New Item</Button>
          </Link>
        </div>
        {content}
      </div>
    </>
  )
}
