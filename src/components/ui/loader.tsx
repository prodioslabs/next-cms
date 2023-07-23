import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'

type LoaderProps = {
  message?: string
  className?: string
  style?: React.CSSProperties
}

export function Loader({ message = 'Loading...', className, style }: LoaderProps) {
  return (
    <div
      className={cn(
        'flex animate-pulse items-center justify-center gap-2 rounded-md border bg-muted p-4 text-xs text-muted-foreground',
        className,
      )}
      style={style}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{message}</span>
    </div>
  )
}
