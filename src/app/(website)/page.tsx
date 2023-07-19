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
    <div className="space-y-8">
      <HomePageHeroSectionSingleton
        renderItem={({ data: { title, content, coverImage, callToAction, callToActionIcon } }) => {
          return (
            <HeroSection
              title={title}
              description={content}
              image={coverImage[0]}
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
            <div className="mx-auto max-w-screen-xl">
              <div className="mb-2 text-center text-2xl font-semibold text-foreground">Blogs</div>
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
                      className="rounded-md border border-border p-4"
                    >
                      <Image
                        width={blog.data.coverImage[0].width}
                        height={blog.data.coverImage[0].height}
                        src={blog.data.coverImage[0].url}
                        alt={blog.data.title}
                        className="mb-2 h-40 w-full rounded-md object-cover"
                      />
                      <div className="line-clamp-2 font-medium text-foreground">{blog.data.title}</div>
                      <div className="line-clamp-2 text-sm text-muted-foreground">
                        <Markdown>{blog.data.content}</Markdown>
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
