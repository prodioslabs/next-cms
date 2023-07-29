import { createPluginHandler } from 'next-cms'
import config from '~/cms.config'

export const { GET, POST } = createPluginHandler(config)
