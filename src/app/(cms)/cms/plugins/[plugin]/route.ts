import config from '~/cms.config'
import { createPluginHandler } from '~/cms/server/plugin-handler'

export const { GET, POST } = createPluginHandler(config)
