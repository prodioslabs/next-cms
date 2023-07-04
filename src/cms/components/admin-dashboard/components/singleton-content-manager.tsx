import { File } from 'lucide-react'
import { Singleton, SingletonData } from '~/cms/types/schema'
import ContentManager from '../../content-manager'
import { Field } from '~/cms/types/field'
import { fetchSingletonData } from '~/cms/core/data'
import { PageHeading } from '~/components/ui/page-heading'
import { cn } from '~/lib/utils'

type SingletonContentManagerProps = {
  singleton: Singleton<Record<string, Field>>
  singletonName: string
  className?: string
  style?: React.CSSProperties
}

export default async function SingletonContentManager({
  singleton,
  singletonName,
  className,
  style,
}: SingletonContentManagerProps) {
  const singletonData = await fetchSingletonData(singleton, singletonName)
  return (
    <div className={cn('space-y-4 p-4', className)} style={style}>
      <PageHeading title={singleton.label} icon={<File />} />
      <ContentManager
        schema={singleton.schema}
        config={{ type: 'singleton', singletonName }}
        initialData={singletonData.data as SingletonData<typeof singleton>}
      />
    </div>
  )
}
