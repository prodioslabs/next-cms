'use client'

import { File } from 'lucide-react'
import { useMemo } from 'react'
import { CMSSingleton } from '~/cms/types/schema'
import ContentManager from '../../content-manager'
import { CMSField } from '~/cms/types/field'
import { PageHeading } from '~/components/ui/page-heading'
import { cn } from '~/lib/utils'
import { CMSPlugin } from '~/cms/types/plugin'
import { api } from '~/cms/server/api'
import { Loader } from '~/components/ui/loader'

type SingletonContentManagerProps = {
  singleton: CMSSingleton<Record<string, CMSField>>
  singletonName: string
  plugins?: CMSPlugin[]
  redirectTo: string
  className?: string
  style?: React.CSSProperties
}

export default function SingletonContentManager({
  singleton,
  singletonName,
  plugins,
  redirectTo,
  className,
  style,
}: SingletonContentManagerProps) {
  const query = api.singleton.fetchSingleton.useQuery({ singletonName })

  const content = useMemo(() => {
    if (query.isLoading) {
      return <Loader message="Loading Content Manager..." />
    }

    if (query.data) {
      return (
        <ContentManager
          redirectToOnSave={redirectTo}
          schema={singleton.schema}
          config={{ type: 'singleton', singletonName, method: 'update' }}
          initialData={query.data.data}
          plugins={plugins}
        />
      )
    }

    return null
  }, [query, redirectTo, plugins, singleton, singletonName])

  return (
    <div className={cn('space-y-4 p-4', className)} style={style}>
      <title>{`Content Manager | ${singleton.label}`}</title>
      <PageHeading title={singleton.label} icon={<File />} />
      {content}
    </div>
  )
}
