'use client'

import { File } from 'lucide-react'
import { useMemo } from 'react'
import { PageHeading, cn, Loader } from 'ui'
import { CMSSingleton } from '../../../../types/schema'
import ContentManager from '../../content-manager'
import { CMSField } from '../../../../types/field'
import { CMSPlugin } from '../../../../types/plugin'
import { api } from '../../../../server/api'

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
          onUpdate={() => {
            query.refetch()
          }}
          title={singleton.label}
        />
      )
    }

    return null
  }, [query, redirectTo, plugins, singleton, singletonName])

  return (
    <div className={cn('space-y-4 p-4', className)} style={style}>
      <PageHeading title={singleton.label} icon={<File />} />
      {content}
    </div>
  )
}
