import { createRouter } from '../trpc'
import { collectionRouter } from './collection/collection.router'
import { singletonRouter } from './singleton/singleton.router'

export const router = createRouter({
  singleton: singletonRouter,
  collection: collectionRouter,
})

export type AppRouter = typeof router
