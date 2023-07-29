'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { cn } from '../lib/utils'

type NavLinkProps = React.ComponentProps<typeof Link> & { activeClassName?: string }

export default function NavLink({ href, activeClassName, className: _className, ...rest }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = useMemo(() => pathname.startsWith(href as string), [pathname, href])
  const className = cn(_className, activeClassName ? { [activeClassName]: isActive } : undefined)

  return <Link href={href} {...rest} className={className} />
}
