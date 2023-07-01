import { redirect } from 'next/navigation'
import { LuFolderOpen } from 'react-icons/lu'
import cmsConfig from '~/cms.config'
import { PageHeading } from '~/components/ui/page-heading'

export default async function CollectionContentManager({
  children,
  params: { key },
}: {
  children: React.ReactNode
  params: { key: string }
}) {
  if (key in cmsConfig.collections) {
    const collection = cmsConfig.collections[key as keyof typeof cmsConfig.collections]

    return (
      <div className="space-y-4 p-4">
        <PageHeading
          className="mb-4"
          title={collection.name}
          // TODO: Figure out the reason for typecasting and remove it
          description={'description' in collection ? (collection.description as string) : undefined}
          icon={<LuFolderOpen />}
        />
        {children}
      </div>
    )
  }

  return redirect('/404')
}
