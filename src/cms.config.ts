import { createUnsplashPlugin } from './cms/plugins/unsplash-image/plugin'
import { createCMSConfig } from './cms/core/config'
import { createAIContentPlugin } from './cms/plugins/ai-content/plugin'

const config = createCMSConfig({
  singletons: {
    homePageHeroSection: {
      label: 'Home Page Hero Section',
      description: 'Hero section on the home page',
      schema: {
        title: {
          label: 'Title',
          type: 'rich-text',
          required: true,
        },
        content: {
          label: 'Content',
          type: 'rich-text',
          required: true,
        },
        callToActionIcon: {
          label: 'Call to Action Icon',
          type: 'icon',
          required: true,
        },
        callToAction: {
          label: 'Call to Action',
          type: 'text',
          required: true,
          default: 'Learn More',
        },
        coverImage: {
          label: 'Cover Image',
          type: 'image',
          required: true,
        },
        options: {
          label: 'Options',
          type: 'select',
          options: [
            {
              value: 'first',
              label: 'First',
            },
            {
              value: 'second',
              label: 'Second',
            },
          ],
        },
      },
    },
  },
  collections: {
    blogs: {
      label: 'Blogs',
      slugField: 'slug',
      nameField: 'title',
      schema: {
        coverImage: {
          label: 'Cover Image',
          type: 'image',
          required: true,
        },
        title: {
          label: 'Title',
          type: 'text',
          required: true,
        },
        slug: {
          label: 'Slug',
          type: 'slug',
          from: 'title',
          required: true,
        },
        content: {
          label: 'Content',
          type: 'rich-text',
          required: true,
        },
      },
    },
  },
  plugins: [
    createAIContentPlugin({
      OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    }),
    createUnsplashPlugin({
      UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY!,
    }),
  ],
})

export default config
