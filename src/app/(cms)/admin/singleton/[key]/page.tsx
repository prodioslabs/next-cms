import { redirect } from 'next/navigation'
import { File } from 'lucide-react'
import cmsConfig from '~/cms.config'
import ContentManager from '~/components/content-manager'
import { PageHeading } from '~/components/ui/page-heading'
import { getSingletonData } from '~/core/collection'

export default async function SingletonContentManager({
  params: { key },
  searchParams: { redirectTo },
}: {
  params: { key: string }
  searchParams: { redirectTo?: string }
}) {
  if (key in cmsConfig.singletons) {
    const singleton = cmsConfig.singletons[key as keyof typeof cmsConfig.singletons]
    const data = await getSingletonData(singleton, cmsConfig.basePath)

    return (
      <div className="p-4">
        <PageHeading
          className="mb-4"
          title={singleton.name}
          // TODO: Figure out the reason for typecasting and remove it
          description={'description' in singleton ? (singleton.description as string) : undefined}
          icon={<File />}
        />
        <ContentManager
          config={{ type: 'singleton' }}
          id={key}
          schema={singleton}
          initialData={data}
          redirectToOnSave={redirectTo}
        />
      </div>
    )
  }

  return redirect('/404')
}
