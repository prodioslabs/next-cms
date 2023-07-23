import { File } from 'lucide-react'
import { CMSSingleton, CMSSingletonData } from '~/cms/types/schema'
import ContentManager from '../../content-manager'
import { CMSField } from '~/cms/types/field'
import { fetchSingletonData } from '~/cms/core/data'
import { PageHeading } from '~/components/ui/page-heading'
import { cn } from '~/lib/utils'
import { CMSPlugin } from '~/cms/types/plugin'

type SingletonContentManagerProps = {
  singleton: CMSSingleton<Record<string, CMSField>>
  singletonName: string
  plugins?: CMSPlugin[]
  redirectTo: string
  className?: string
  style?: React.CSSProperties
}

export default async function SingletonContentManager({
  singleton,
  singletonName,
  plugins,
  redirectTo,
  className,
  style,
}: SingletonContentManagerProps) {
  const singletonData = await fetchSingletonData(singleton, singletonName)
  return (
    <div className={cn('space-y-4 p-4', className)} style={style}>
      <PageHeading title={singleton.label} icon={<File />} />
      <ContentManager
        redirectToOnSave={redirectTo}
        schema={singleton.schema}
        config={{ type: 'singleton', singletonName, method: 'update' }}
        initialData={singletonData.data as CMSSingletonData<typeof singleton>}
        plugins={plugins}
      />
    </div>
  )
}
