import Image from 'next/image'
import Link from 'next/link'
import config from '~/cms.config'
import { createSingletonReader, createCollectionReader } from '~/cms/core/components'
import Markdown from '~/cms/components/markdown'
import HeroSection from '~/blocks/hero-section'

const HomePageHeroSectionSingleton = createSingletonReader(config, 'homePageHeroSection')
const BlogsCollection = createCollectionReader(config, 'blogs')

export default function Home() {
  return (
    <div className="space-y-8 p-8">
      <HomePageHeroSectionSingleton
        renderItem={({ data: { title, content, callToAction, callToActionIcon, coverImage } }) => {
          return (
            <HeroSection
              title={title}
              description={content}
              image={coverImage}
              callToAction={callToAction}
              callToActionIcon={callToActionIcon.name}
            />
          )
        }}
      />
      <BlogsCollection
        type="list"
        renderItems={({ items: blogs }) => {
          return (
            <div className="mx-auto max-w-screen-2xl rounded-md bg-primary p-8">
              <div className="mb-2 text-center text-2xl font-semibold text-primary-foreground">Blogs</div>
              <div className="mb-4 flex items-center justify-center">
                <Link href="/blogs" className="mx-auto flex items-center text-sm text-muted-foreground">
                  Read more blogs...
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {blogs.map((blog, index) => {
                  return (
                    <Link
                      href={`/blogs/${blog.elementSlug}`}
                      key={index}
                      className="overflow-hidden rounded-md bg-primary"
                    >
                      <Image
                        width={blog.data.coverImage.width}
                        height={blog.data.coverImage.height}
                        src={blog.data.coverImage.url}
                        alt={blog.data.title}
                        className="h-48 w-full object-cover"
                      />
                      <div className="bg-background p-4">
                        <div className="line-clamp-2 font-medium text-foreground">{blog.data.title}</div>
                        <div className="line-clamp-2 text-sm text-muted-foreground">
                          <Markdown>{blog.data.content}</Markdown>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
