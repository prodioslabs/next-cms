'use client'

import { redirect, useParams, useSearchParams } from 'next/navigation'
import { CMSConfig } from '~/cms/types/config'
import { CMSCollection, CMSSingleton } from '~/cms/types/schema'
import DashboardHome from './dashboard-home'
import { CMSField } from '~/cms/types/field'
import SingletonContentManager from './singleton-content-manager'
import CollectionPage from './collection-page'
import CollectionNewItemContentManager from './collection-new-item-content-manager'
import CollectionPageLayout from './collection-page-layout'
import CollectionElementPage from './collection-element-page'
import LoginPage from './login-page'

export default function createDashboardPage<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  function Page() {
    const params = useParams()
    const slug = params.slug?.split('/')

    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo') ?? '/'

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

        return (
          <SingletonContentManager
            singleton={singleton}
            singletonName={singletonName}
            plugins={config.plugins}
            redirectTo={redirectTo}
          />
        )
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
                redirectTo={redirectTo}
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
              redirectTo={redirectTo}
            />
          </CollectionPageLayout>
        )
      }

      default: {
        redirect('/404')
      }
    }
  }

  return Page
}
