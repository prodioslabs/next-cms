import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { CMSConfig } from '~/cms/types/config'
import { CMSCollection, CMSSingleton } from '~/cms/types/schema'
import DashboardHome from './dashboard-home'
import { CMSField } from '~/cms/types/field'
import SingletonContentManager from './singleton-content-manager'
import CollectionPage from './collection-page'
import CollectionNewItemContentManager from './collection-new-item-content-manager'
import CollectionPageLayout from './collection-page-layout'
import { CollectionElementPage } from './collection-element-page'
import LoginPage from './login-page'

export default function createDashboardPage<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  async function generateMetadata({ params: { slug } }: { params: { slug?: string[] } }): Promise<Metadata> {
    if (typeof slug === 'undefined') {
      return {
        title: 'CMS Dashboard',
      }
    }

    const pageType = slug[0]

    switch (pageType) {
      case 'login': {
        return {
          title: 'CMS Login',
        }
      }

      case 'singleton': {
        const singletonName = slug[1]
        return {
          title: `CMS Singleton: ${singletonName}`,
        }
      }

      case 'collection': {
        const collectionName = slug[1]
        return {
          title: `CMS Collection: ${collectionName}`,
        }
      }

      default: {
        redirect('/404')
      }
    }
  }

  function Page({ params: { slug } }: { params: { slug?: string[] } }) {
    if (typeof slug === 'undefined') {
      return <DashboardHome config={config} />
    }

    const pageType = slug[0]

    switch (pageType) {
      case 'login': {
        return <LoginPage />
      }

      case 'singleton': {
        const singletonName = slug[1]
        if (!singletonName) {
          redirect('/404')
        }

        const singleton = config.singletons[singletonName]
        if (!singleton) {
          redirect('/404')
        }

        return <SingletonContentManager singleton={singleton} singletonName={singletonName} plugins={config.plugins} />
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

        const collectionElementId = slug[2]

        if (typeof collectionElementId === 'undefined') {
          return (
            <CollectionPageLayout collection={collection}>
              <CollectionPage collection={collection} collectionName={collectionName} />
            </CollectionPageLayout>
          )
        }

        if (collectionElementId === 'new') {
          return (
            <CollectionPageLayout collection={collection}>
              <CollectionNewItemContentManager
                collection={collection}
                collectionName={collectionName}
                plugins={config.plugins}
              />
            </CollectionPageLayout>
          )
        }

        return (
          <CollectionPageLayout collection={collection}>
            <CollectionElementPage
              collection={collection}
              collectionName={collectionName}
              elementId={collectionElementId}
              plugins={config.plugins}
            />
          </CollectionPageLayout>
        )
      }

      default: {
        redirect('/404')
      }
    }
  }

  return { Page, generateMetadata }
}
