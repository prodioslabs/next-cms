import { FaGoogle } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import cmsConfig from '~/cms.config'
import { Button } from '~/components/ui/button'
import { createSingletonComponentFromConfig } from '~/core/config'

const Singleton = createSingletonComponentFromConfig(cmsConfig, 'homePageHeroSection')

export default function Home() {
  return (
    <div className="p-4">
      <Singleton>
        {({ item: { title, content }, containerProps }) => {
          return (
            <div {...containerProps}>
              <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
              <div className="mb-4 text-muted-foreground">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              <Button icon={<FaGoogle />}>Click Here</Button>
            </div>
          )
        }}
      </Singleton>
    </div>
  )
}
