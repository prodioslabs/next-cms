import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChevronRight, Plus } from 'lucide-react'
import cmsConfig from '~/cms.config'
import DeleteCollectionItem from '~/components/delete-collection-item/delete-collection-item'
import { Button } from '~/components/ui/button'
import { ElementData, getCollectionData } from '~/core/collection'

// TODO: Move it to builder pattern, so that both the CollectionContentManager and
// SingletonContentManager are created by makeContentManagerComponents(config)
export default async function CollectionContentManager({ params: { key } }: { params: { key: string } }) {
  if (key in cmsConfig.collections) {
    const collection = cmsConfig.collections[key as keyof typeof cmsConfig.collections]
    const data = (await getCollectionData(collection, cmsConfig.basePath)) as ElementData<typeof collection>[]

    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex-1 text-base font-medium text-foreground">Items</div>
          <Link href={`/admin/collection/${key}/${data.length}`}>
            <Button icon={<Plus />}>Create New Item</Button>
          </Link>
        </div>
        {(data as ElementData<typeof collection>[]).map((item, index) => {
          const itemIdentifier = item[collection.identifierKey]
          return (
            <div
              key={`${itemIdentifier}-${index}`}
              className="flex items-center space-x-2 truncate rounded-md border px-4 py-2"
            >
              <Link className="flex-1 space-y-1 truncate" href={`/admin/collection/${key}/${index}`}>
                <div className="truncate text-sm text-foreground">
                  {typeof itemIdentifier === 'string' || typeof itemIdentifier === 'number' ? itemIdentifier : index}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Edit</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
              <DeleteCollectionItem collectionId={key} elementIndex={index} />
            </div>
          )
        })}
      </div>
    )
  }

  return redirect('/404')
}
