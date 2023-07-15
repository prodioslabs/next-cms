import { CMSField } from '../types/field'
import { CMSSingleton, CMSSingletonData } from '../types/schema'
import { createSingletonReader } from './components'
import { createCMSConfig } from './config'

export function createSingletonBlock<Schema extends Record<string, CMSField>, Props extends Record<string, any>>(
  singletonName: string,
  singleton: CMSSingleton<Schema>,
  Component: React.ComponentType<Props & { cmsData: CMSSingletonData<CMSSingleton<Schema>> }>,
): { Block: React.ComponentType<Props> } {
  const SingletonReader = createSingletonReader(
    createCMSConfig({ singletons: { [singletonName]: singleton } }),
    singletonName,
  )

  function Block(props: Props) {
    return (
      <SingletonReader
        renderItem={({ data }) => {
          return <Component cmsData={data} {...props} />
        }}
      />
    )
  }

  Block.displayName = `${singletonName}Block`

  return {
    Block,
    singleton: {},
  }
}

export const { Block, singleton } = createSingletonBlock(
  'heroSection',
  {
    label: 'Hero Section',
    schema: {
      title: { type: 'text', label: 'Title' },
    },
  },
  ({ cmsData: { title } }) => {
    return <div>{title}</div>
  },
)
