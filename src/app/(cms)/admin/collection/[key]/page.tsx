import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LuChevronRight, LuPlus, LuTrash } from 'react-icons/lu'
import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'
import cmsConfig from '~/cms.config'
import { Button } from '~/components/ui/button'
import { resolveUrl } from '~/lib/api'

// TODO: Move it to builder pattern, so that both the CollectionContentManager and
// SingletonContentManager are created by makeContentManagerComponents(config)
const { getContentResponseSchema } = generateRouteHandlerSchemas(cmsConfig)

export default async function CollectionContentManager({ params: { key } }: { params: { key: string } }) {
  try {
    const collection = cmsConfig.collections[key as keyof typeof cmsConfig.collections]
    const res = await fetch(resolveUrl(`/cms/content?type=collection&id=${key}`), {
      cache: 'no-cache',
    })
    const data = getContentResponseSchema.parse(await res.json())

    if (data.type !== 'collection') {
      return redirect('/404')
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="flex-1 text-base font-medium text-foreground">Items</div>
          <Button icon={<LuPlus />}>Create New Item</Button>
        </div>
        {data.data.map((item, index) => {
          const itemIdentifier = item[collection.identifierKey]
          return (
            <div
              key={`${itemIdentifier}-${index}`}
              className="flex items-center space-x-2 truncate rounded-md border px-4 py-2"
            >
              <Link className="flex-1 space-y-1 truncate" href={`/admin/collection/${key}/${index}`}>
                <div className="truncate text-sm text-foreground">{itemIdentifier}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>Edit</span>
                  <LuChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
              <Button size="icon" icon={<LuTrash />} variant="secondary" />
            </div>
          )
        })}
      </div>
    )
  } catch (error) {}

  return redirect('/404')
}
