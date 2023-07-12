import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'
import config from '~/cms.config'
import { createSingletonReader, createCollectionReader } from '~/cms/core/components'
import { Button } from '~/components/ui/button'
import { LucideIcon } from '~/components/ui/lucide-icon'

const HomePageHeroSectionSingleton = createSingletonReader(config, 'homePageHeroSection')
const BlogsCollection = createCollectionReader(config, 'blogs')

export default function Home() {
  return (
    <div className="space-y-8">
      <HomePageHeroSectionSingleton
        renderItem={({ data: { title, content, coverImage, callToAction, callToActionIcon } }) => {
          return (
            <div className="mx-auto grid grid-cols-2 items-center gap-12 bg-primary">
              <div className="ml-auto max-w-xl">
                <h1 className="mb-8 text-5xl font-medium text-primary-foreground">{title}</h1>
                <div className="prose-base mb-8 text-muted-foreground">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                <Button
                  variant="secondary"
                  icon={
                    callToActionIcon && callToActionIcon.iconLib === 'lucide' ? (
                      <LucideIcon name={callToActionIcon.name} />
                    ) : undefined
                  }
                >
                  {callToAction}
                </Button>
              </div>
              <div className="relative col-span-1 min-h-[400px]">
                <svg
                  viewBox="0 0 10 10"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-0 top-0 h-full w-20"
                >
                  <path d="M0 0 L10 0 L0 10 Z" className="fill-primary" />
                </svg>
                <Image
                  alt=""
                  src={coverImage[0].url}
                  height={coverImage[0].height}
                  width={coverImage[0].width}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
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
                        <ReactMarkdown>{blog.data.content}</ReactMarkdown>
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
