import { cloneElement } from 'react'
import { cn } from '../lib/utils'

type PageHeadingProps = {
  title: string
  icon: React.ReactElement<{ className?: string }>
  description?: string
  className?: string
  style?: React.CSSProperties
}

export function PageHeading({ title, icon, description, className, style }: PageHeadingProps) {
  return (
    <div className={cn('flex items-center space-x-4', className)} style={style}>
      <div className="rounded-md border bg-muted p-2">
        {cloneElement(icon, { className: cn(icon.props.className, 'h-6 w-6') })}
      </div>
      <div>
        <div className="text-base font-medium text-foreground">{title}</div>
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
      </div>
    </div>
  )
}
