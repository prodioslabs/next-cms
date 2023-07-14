import { CMSField } from '../types/field'
import { CMSSingleton, CMSSingletonData } from '../types/schema'
import { fetchSingletonData } from './data'

export function createSingletonBlock<Schema extends Record<string, CMSField>, Props extends Record<string, any>>({
  config: singleton,
}: {
  config: CMSSingleton<Schema>
  props: React.ComponentType<Props>
}): React.ComponentType<Props & { cmsData: CMSSingletonData<CMSSingleton<Schema>> }> {
  const cmsData = await fetchSingletonData(config)
}
