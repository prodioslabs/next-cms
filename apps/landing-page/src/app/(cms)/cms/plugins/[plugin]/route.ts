import { createPluginHandler } from '@nextjs-cms/cms/server'
import config from '~/cms.config'

export const { GET, POST } = createPluginHandler(config)
