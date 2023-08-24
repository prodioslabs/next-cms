import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../lib/utils'
import { LucideIcon } from '../../ui'

const loaderVariants = cva('flex animate-pulse items-center justify-center gap-2 rounded-md p-4 text-xs', {
  variants: {
    variant: {
      default: 'bg-muted text-secondary-foreground',
      outline: 'border text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type LoaderProps = VariantProps<typeof loaderVariants> & {
  message?: string
  className?: string
  style?: React.CSSProperties
}

export function Loader({ message = 'Loading...', variant, className, style }: LoaderProps) {
  return (
    <div className={cn(loaderVariants({ variant }), className)} style={style}>
      <LucideIcon name="loader-2" className="h-5 w-5 animate-spin" />
      <span>{message}</span>
    </div>
  )
}
