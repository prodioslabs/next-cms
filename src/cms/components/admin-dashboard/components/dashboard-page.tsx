import { redirect } from 'next/navigation'
import { Config } from '~/cms/types/config'
import { Collection, Singleton } from '~/cms/types/schema'
import DashboardHome from './dashboard-home'
import { Field } from '~/cms/types/field'
import SingletonContentManager from './singleton-content-manager'
import CollectionPage from './collection-page'
import CollectionNewItemContentManager from './collection-new-item-content-manager'
import CollectionPageLayout from './collection-page-layout'

export default function createDashboardPage<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
>(config: Config<Collections, Singletons>) {
  function Page({ params: { slug } }: { params: { slug?: string[] } }) {
    if (typeof slug === 'undefined') {
      return <DashboardHome config={config} />
    }

    const pageType = slug[0]

    switch (pageType) {
      case 'singleton': {
        const singletonName = slug[1]
        if (!singletonName) {
          redirect('/404')
        }

        const singleton = config.singletons[singletonName]
        if (!singleton) {
          redirect('/404')
        }

        return <SingletonContentManager singleton={singleton} singletonName={singletonName} />
      }

      case 'collection': {
        const collectionName = slug[1]
        if (!collectionName) {
          redirect('/404')
        }

        const collection = config.collections[collectionName]
        if (!collection) {
          redirect('/404')
        }

        const collectionItemSlug = slug[2]

        if (typeof collectionItemSlug === 'undefined') {
          return (
            <CollectionPageLayout collection={collection}>
              <CollectionPage collection={collection} collectionName={collectionName} />
            </CollectionPageLayout>
          )
        }

        if (collectionItemSlug === 'new') {
          return (
            <CollectionPageLayout collection={collection}>
              <CollectionNewItemContentManager collection={collection} collectionName={collectionName} />
            </CollectionPageLayout>
          )
        }

        return null
      }

      default: {
        redirect('/404')
      }
    }
  }

  return Page
}
