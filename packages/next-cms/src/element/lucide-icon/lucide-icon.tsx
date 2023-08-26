'use client'

import dynamic from 'next/dynamic'
import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { useMemo } from 'react'
import { Skeleton } from '../../dashboard/ui/skeleton'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export type LucideIconName = keyof typeof dynamicIconImports

export const lucideIconNames = Object.keys(dynamicIconImports) as LucideIconName[]

export function LucideIcon({ name, ...props }: IconProps) {
  let iconName = name
  if (!(iconName in dynamicIconImports)) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`)
    iconName = 'shield'
  }

  const Icon = useMemo(
    () =>
      dynamic(dynamicIconImports[iconName], {
        loading: () => <Skeleton className={props.className} style={props.style} />,
      }),
    // we can safely ignore this warning, because we only want to render the icon on iconName change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [iconName],
  )

  return <Icon {...props} />
}
