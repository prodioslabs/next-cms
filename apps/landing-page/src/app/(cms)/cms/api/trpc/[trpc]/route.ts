import { createTRPCHandler } from 'next-cms'
import config from '~/cms.config'

const trpcHandler = createTRPCHandler(config)
export { trpcHandler as GET, trpcHandler as POST }
