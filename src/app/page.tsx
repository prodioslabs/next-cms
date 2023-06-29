import { FaGoogle } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import cmsConfig from '~/cms.config'
import { Button } from '~/components/ui/button'
import { createCollectionComponentFromConfig, createSingletonComponentFromConfig } from '~/core/config'

const HomePageHeroSectionSingleton = createSingletonComponentFromConfig(cmsConfig, 'homePageHeroSection')
const BlogsCollection = createCollectionComponentFromConfig(cmsConfig, 'blogs')

export default function Home() {
  return (
    <div className="space-y-4 p-4">
      <HomePageHeroSectionSingleton
        render={({ item: { title, content } }) => {
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
      <div>
        <div className="mb-4 text-lg font-semibold text-foreground">Blogs</div>
        <BlogsCollection
          render={({ items: blogs }) => {
            return (
              <div className="grid grid-cols-6 gap-4">
                {blogs.map((blog, index) => {
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
      </div>
    </div>
  )
}
