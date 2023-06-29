# next-cms

# Configuration

To get started, first create a configuration file.

```tsx
// cms.config.ts
import { type Config } from '~/cms/core'

export const config = {
  singletons: {
    homePageHeroSection: {
      name: 'Home Page Hero Section',
      path: 'home-page/hero-section',
      fields: {
        title: {
          type: 'text',
          required: true,
        },
        content: {
          type: 'rich-text',
          required: true,
        },
      },
    },
  },
  collections: {
    blogs: {
      name: 'Blogs',
      path: 'blogs',
      fields: {
        coverImage: {
          type: 'image',
          required: true,
        },
        title: {
          type: 'text',
          required: true,
        },
        content: {
          type: 'rich-text',
          required: true,
        },
      },
    },
  },
} as const satisfies Config
```

## Singleton

`Singleton` component provides a way to create a singleton content type. These are one-of-a-kind content types that are not meant to be repeated. For example, a hero section on a home page.

These components can be created using `createSingletonComponentFromConfig` function. It would return the `Singleton` component that can be used for rendering the content.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| config    | Config | Configuration object  |
| name      | string | Name of the singleton |

```tsx
import cmsConfig from '~/cms.config'
import { createSingletonComponentFromConfig } from '~/cms/core'

const HomePageHeroSectionSingleton = createSingletonComponentFromConfig(cmsConfig, 'homePageHeroSection')

export default function HeroSection() {
  return (
    <HomePageHeroSectionSingleton
      render={({ item: { title, content } }) => {
        return (
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-foreground mb-2 text-2xl font-bold">{title}</h1>
              <div className="text-muted-foreground mb-4">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              <Button icon={<FaGoogle />}>Click Here</Button>
            </div>
          </div>
        )
      }}
    />
  )
}
```

## Collection

`Collection` component provides a way to create a collection content type. These are content types that are meant to be repeated. For example, a list of blog posts.

These components can be created using `createCollectionComponentFromConfig` function. It would return the `Singleton` component that can be used for rendering the content.

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| config    | Config | Configuration object   |
| name      | string | Name of the collection |

```tsx
import cmsConfig from '~/cms.config'
import { createCollectionComponentFromConfig } from '~/cms/core'

const BlogsCollection = createCollectionComponentFromConfig(cmsConfig, 'blogs')

export default function Blogs() {
  return (
    <BlogsCollection
      render={({ items: blogs }) => {
        return (
          <div className="grid grid-cols-6 gap-4">
            {blogs.map((blog, index) => {
              return (
                <div key={index} className="border-border rounded-md border p-4">
                  <Image
                    width={blog.coverImage.width}
                    height={blog.coverImage.height}
                    src={blog.coverImage.url}
                    alt={blog.title}
                    className="mb-2 h-40 w-full rounded-md object-cover"
                  />
                  <div className="text-foreground font-medium">{blog.title}</div>
                  <div className="text-muted-foreground text-sm">{blog.content.slice(0, 20)}</div>
                </div>
              )
            })}
          </div>
        )
      }}
    />
  )
}
```
