import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { cn } from '~/lib/utils'

type MarkdownProps = React.ComponentProps<typeof ReactMarkdown> & {
  className?: string
  style?: React.CSSProperties
}

export default function Markdown({ children, className, style, rehypePlugins = [], ...props }: MarkdownProps) {
  return (
    <div className={cn('prose', className)} style={style}>
      <ReactMarkdown rehypePlugins={[...rehypePlugins, rehypeRaw]} {...props}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
