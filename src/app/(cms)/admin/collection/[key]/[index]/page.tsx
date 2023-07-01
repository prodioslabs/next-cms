import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import cmsConfig from '~/cms.config'
import ContentManager from '~/components/content-manager/content-manager'
import { ElementData, getCollectionData } from '~/core/collection'

export default async function CollectionElementContentManager({
  params: { key, index },
}: {
  params: { key: string; index: string }
}) {
  const elementIndex = Number.parseInt(index)
  if (isNaN(elementIndex)) {
    redirect('/404')
  }

  if (key in cmsConfig.collections) {
    try {
      const collection = cmsConfig.collections[key as keyof typeof cmsConfig.collections]
      const data = (await getCollectionData(collection, cmsConfig.basePath)) as ElementData<typeof collection>[]
      const elementData = data[elementIndex] ?? {}

      return (
        <div className="space-y-4">
          <div>
            <Link href={`/admin/collection/${key}`} className="flex items-center text-sm text-muted-foreground">
              <ChevronLeft className="mr-2 h-5 w-5" />
              Show all items
            </Link>
          </div>
          <ContentManager
            config={{ type: 'collection', elementIndex }}
            id={key}
            schema={collection}
            initialData={elementData}
            redirectToOnSave={`/admin/collection/${key}`}
          />
        </div>
      )
    } catch (error) {}
  }
}
