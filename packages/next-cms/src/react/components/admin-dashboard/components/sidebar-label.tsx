'use client'

import { cn } from '../../../lib/utils'
import { useStore } from '../../../stores'

type SidebarLabelProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function SidebarLabel({ children, className, style }: SidebarLabelProps) {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed)

  if (sidebarCollapsed) {
    return null
  }

  return (
    <div className={cn('px-1.5 text-xs uppercase text-secondary-foreground', className)} style={style}>
      {children}
    </div>
  )
}
