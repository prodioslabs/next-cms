import { createTRPCHandler } from '@nextjs-cms/cms/server'
import config from '~/cms.config'

const trpcHandler = createTRPCHandler(config)
export { trpcHandler as GET, trpcHandler as POST }
