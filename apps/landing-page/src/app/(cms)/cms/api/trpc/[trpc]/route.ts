import config from '~/cms.config'
import { createTRPCHandler } from '~/cms/server/trpc-handler'

const trpcHandler = createTRPCHandler(config)
export { trpcHandler as GET, trpcHandler as POST }
