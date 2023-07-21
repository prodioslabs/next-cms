import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

type MarkdownProps = React.ComponentProps<typeof ReactMarkdown>

export default function Markdown({ children, rehypePlugins = [], ...props }: MarkdownProps) {
  return (
    <ReactMarkdown rehypePlugins={[...rehypePlugins, rehypeRaw]} {...props}>
      {children}
    </ReactMarkdown>
  )
}
