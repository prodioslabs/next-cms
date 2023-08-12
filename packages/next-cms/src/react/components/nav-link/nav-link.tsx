'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cloneElement, useMemo } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from 'ui'
import { useStore } from '../../stores'

type NavLinkProps = React.ComponentProps<typeof Link> & {
  icon: React.ReactElement<{ className?: string }>
  label: string
}

export default function NavLink({ icon, label, href, className, ...rest }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = useMemo(() => pathname.startsWith(href as string), [pathname, href])

  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed)
  const iconElement = cloneElement(icon, {
    className: 'h-4 w-4 flex-shrink-0',
  })

  return (
    <Link
      href={href}
      {...rest}
      className={cn(
        {
          'flex items-center space-x-2 truncate rounded-md border border-transparent p-1.5 text-sm text-muted-foreground hover:border-border hover:bg-muted':
            true,
          'border-border bg-muted text-secondary-foreground': isActive,
          'justify-center': sidebarCollapsed,
        },
        className,
      )}
    >
      {sidebarCollapsed ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{iconElement}</TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        iconElement
      )}
      {!sidebarCollapsed ? <span className="flex-1 truncate">{label}</span> : null}
    </Link>
  )
}
