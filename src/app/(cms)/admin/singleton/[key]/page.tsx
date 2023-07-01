import { redirect } from 'next/navigation'
import { LuFile } from 'react-icons/lu'
import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'
import cmsConfig from '~/cms.config'
import ContentManager from '~/components/content-manager'
import { PageHeading } from '~/components/ui/page-heading'
import { resolveUrl } from '~/lib/api'

const { getContentResponseSchema } = generateRouteHandlerSchemas(cmsConfig)

export default async function SingletonContentManager({ params: { key } }: { params: { key: string } }) {
  if (key in cmsConfig.singletons) {
    const singleton = cmsConfig.singletons[key as keyof typeof cmsConfig.singletons]

    // TODO: Check if this is slower than directly calling the function
    const res = await fetch(resolveUrl(`/cms/content?type=singleton&id=${key}`), {
      cache: 'no-cache',
    })
    const data = getContentResponseSchema.parse(await res.json())

    return (
      <div className="p-4">
        <PageHeading
          className="mb-4"
          title={singleton.name}
          // TODO: Figure out the reason for typecasting and remove it
          description={'description' in singleton ? (singleton.description as string) : undefined}
          icon={<LuFile />}
        />
        <ContentManager config={{ type: 'singleton' }} id={key} schema={singleton} initialData={data.data} />
      </div>
    )
  }

  return redirect('/404')
}
