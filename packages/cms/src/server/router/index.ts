import { createRouter } from '../trpc'
import { collectionRouter } from './collection/collection.router'
import { mediaRouter } from './media/media.router'
import { singletonRouter } from './singleton/singleton.router'

export const router = createRouter({
  singleton: singletonRouter,
  collection: collectionRouter,
  media: mediaRouter,
})

export type AppRouter = typeof router
