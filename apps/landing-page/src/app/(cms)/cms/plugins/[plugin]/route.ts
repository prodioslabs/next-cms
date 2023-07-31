import { createPluginHandler } from 'next-cms/server'
import config from '~/cms.config'

export const { GET, POST } = createPluginHandler(config)
