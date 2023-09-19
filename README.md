# next-cms

# Configuration

To get started, first create a configuration file.

```tsx
// cms.config.ts
import { createCMSConfig } from "next-cms";
import { createAIContentPlugin, createUnsplashPlugin } from "next-cms/plugins";

const config = createCMSConfig({
  singletons: {
    homePageHeroSection: {
      label: "Home Page Hero Section",
      description: "Hero section on the home page",
      schema: {
        title: {
          label: "Title",
          type: "rich-text",
          required: true,
        },
        content: {
          label: "Content",
          type: "rich-text",
          required: true,
        },
        callToActionIcon: {
          label: "Call to Action Icon",
          type: "icon",
          required: true,
        },
        callToAction: {
          label: "Call to Action",
          type: "text",
          required: true,
          default: "Learn More",
        },
        coverImage: {
          label: "Cover Image",
          type: "image",
          required: true,
        },
        coverVideo: {
          label: "Cover Video",
          type: "video",
          required: true,
        },
      },
    },
    features: {
      label: "Features",
      description: "Features section on the home page",
      schema: {
        heading: {
          label: "Heading",
          type: "rich-text",
          required: true,
        },
        description: {
          label: "Description",
          type: "rich-text",
          required: true,
        },
        features: {
          type: "object",
          label: "Features",
          required: true,
          multiple: true,
          schema: {
            featureName: {
              label: "Feature Name",
              type: "rich-text",
              required: true,
            },
            featureDescription: {
              label: "Feature Description",
              type: "rich-text",
              required: true,
            },
            icon: {
              label: "Feature Icon",
              type: "icon",
              required: true,
            },
            tags: {
              type: "text",
              label: "Feature Tags",
              required: true,
              multiple: true,
            },
          },
        },
      },
    },
  },
  collections: {
    blogs: {
      label: "Blogs",
      slugField: "slug",
      nameField: "title",
      schema: {
        coverImage: {
          label: "Cover Image",
          type: "image",
          required: true,
        },
        title: {
          label: "Title",
          type: "text",
          required: true,
        },
        slug: {
          label: "Slug",
          type: "slug",
          from: "title",
          required: true,
        },
        content: {
          label: "Content",
          type: "rich-text",
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
});

export default config;
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
import cmsConfig from "~/cms.config";
import { createSingletonReader } from "next-cms/react";

const HomePageHeroSectionSingleton = createSingletonReader(
  cmsConfig,
  "homePageHeroSection"
);

export default function HeroSection() {
  return (
    <HomePageHeroSectionSingleton
      renderItem={({ item: { title, content } }) => {
        return (
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-foreground mb-2 text-2xl font-bold">
                {title}
              </h1>
              <div className="text-muted-foreground mb-4">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              <Button icon={<FaGoogle />}>Click Here</Button>
            </div>
          </div>
        );
      }}
    />
  );
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
import cmsConfig from "~/cms.config";
import { createCollectionReader } from "next-cms/react";

const BlogsCollection = createCollectionReader(cmsConfig, "blogs");

export default function Blogs() {
  return (
    <BlogsCollection
      type="list"
      renderItems={({ items: blogs }) => {
        return (
          <div className="grid grid-cols-6 gap-4">
            {blogs.map(({ data: blog }, index) => {
              return (
                <div
                  key={index}
                  className="border-border rounded-md border p-4"
                >
                  <Image
                    width={blog.coverImage.metadata.width}
                    height={blog.coverImage.metadata.height}
                    src={blog.coverImage.url}
                    alt={blog.title}
                    className="mb-2 h-40 w-full rounded-md object-cover"
                  />
                  <div className="text-foreground font-medium">
                    {blog.title}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {blog.content.slice(0, 20)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}
```
