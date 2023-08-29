'use client'

import { notFound, useParams, useSearchParams } from 'next/navigation'
import { CMSConfig } from '../../../../types/config'
import { CMSCollection, CMSSingleton } from '../../../../types/schema'
import DashboardHome from './dashboard-home'
import { CMSField } from '../../../../types/field'
import SingletonContentManager from './singleton-content-manager'
import CollectionPage from './collection-page'
import CollectionNewItemContentManager from './collection-new-item-content-manager'
import CollectionPageLayout from './collection-page-layout'
import CollectionElementPage from './collection-element-page'
import LoginPage from './login-page'
import MediaLibrary from './media-library'

export default function createDashboardPage<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  /**
   * Remove the api field from all the plugins, as these handlers are not
   * meant to be used on the client side
   */
  const clientSideConfig: CMSConfig<CMSCollections, CMSSingletons> = {
    ...config,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    plugins: (config.plugins ?? []).map(({ api, ...rest }) => {
      return {
        ...rest,
      }
    }),
  }

  return function Page() {
    const params = useParams()
    const slug = params.slug

    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo') ?? '/'

    if (typeof slug === 'undefined') {
      return <DashboardHome config={clientSideConfig} />
    }

    const pageType = slug[0]

    switch (pageType) {
      case 'login': {
        return <LoginPage />
      }

      case 'media-library': {
        const parentFolderId = slug[1]

        return <MediaLibrary folderId={parentFolderId} />
      }

      case 'singleton': {
        const singletonName = slug[1]
        if (!singletonName) {
          return notFound()
        }

        const singleton = clientSideConfig.singletons[singletonName]
        if (!singleton) {
          return notFound()
        }

        return (
          <SingletonContentManager
            singleton={singleton}
            singletonName={singletonName}
            plugins={clientSideConfig.plugins}
            redirectTo={redirectTo}
          />
        )
      }

      case 'collection': {
        const collectionName = slug[1]
        if (!collectionName) {
          return notFound()
        }

        const collection = clientSideConfig.collections[collectionName]
        if (!collection) {
          return notFound()
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
                plugins={clientSideConfig.plugins}
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
              plugins={clientSideConfig.plugins}
              redirectTo={redirectTo}
            />
          </CollectionPageLayout>
        )
      }

      default: {
        return notFound()
      }
    }
  }
}
