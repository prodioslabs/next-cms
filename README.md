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

These components can be created using `createSingletonReader` function. It would return the `Singleton` component that can be used for rendering the content.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| config    | Config | Configuration object  |
| name      | string | Name of the singleton |

### Single Reader Component

`SingletonReader` component is used to read the content of a singleton. It accepts a `renderItem` prop that is called with the content of the singleton.

| Prop       | Type                                         | Description     |
| ---------- | -------------------------------------------- | --------------- |
| renderItem | (args: { data: SingletonData }) => ReactNode | Render function |

The `data` object contains the content of the singleton. As this library is fully typed, you can use the intellisense to see the type of the content. This is the same type that is used in the configuration file.

```tsx
import cmsConfig from '~/cms.config'
import { createSingletonReader } from '~/cms/core'

const HomePageHeroSectionSingleton = createSingletonReader(cmsConfig, 'homePageHeroSection')

export default function HeroSection() {
  return (
    <HomePageHeroSectionSingleton
      renderItem={({ item: { title, content } }) => {
        return (
          <div className="grid grid-cols-2">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
              <div className="mb-4 text-muted-foreground">
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

These components can be created using `createCollectionReader` function. It would return the `Singleton` component that can be used for rendering the content.

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| config    | Config | Configuration object   |
| name      | string | Name of the collection |

### Collection Reader Component

`CollectionReader` component is used to read the content of a collection. It either accepts `renderItems` prop that is called with the content of the collection or it accepts `renderItem` prop that can be used to a particular item of the collection.

| Prop        | Type                                                                                       | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| type        | `element` or `list`                                                                        | Type specifies whether you want to read the entire list or a particular element of the collection |
| renderItems | `(args: { items: { data: CollectionData, id: string, slug: string } }) => React.ReactNode` | Render function for the entire list                                                               |
| renderItem  | `(args: { item: { data: CollectionData, id: string, slug: string } }) => React.ReactNode`  | Render function for a particular item                                                             |
| elementId   | string                                                                                     | Id of the element to read. This is only used when `type` is `element`                             |
| elementSlug | string                                                                                     | Slug of the element to read. This is only used when `type` is `element`                           |

```tsx
import cmsConfig from '~/cms.config'
import { createCollectionReader } from '~/cms/core'

const BlogsCollection = createCollectionReader(cmsConfig, 'blogs')

export default function Blogs() {
  return (
    <BlogsCollection
      type="list"
      renderItems={({ items: blogs }) => {
        return (
          <div className="grid grid-cols-6 gap-4">
            {blogs.map(({ data: blog }, index) => {
              return (
                <div key={index} className="rounded-md border border-border p-4">
                  <Image
                    width={blog.coverImage.width}
                    height={blog.coverImage.height}
                    src={blog.coverImage.url}
                    alt={blog.title}
                    className="mb-2 h-40 w-full rounded-md object-cover"
                  />
                  <div className="font-medium text-foreground">{blog.title}</div>
                  <div className="text-sm text-muted-foreground">{blog.content.slice(0, 20)}</div>
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
