'use client'

import dynamic from 'next/dynamic'
import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { Skeleton } from '../../../react/ui/skeleton'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export const lucideIconNames = Object.keys(dynamicIconImports)

export type LucideIconName = keyof typeof dynamicIconImports

export function LucideIcon({ name, ...props }: IconProps) {
  let iconName = name
  if (!(iconName in dynamicIconImports)) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`)
    iconName = 'shield'
  }

  const Icon = dynamic(dynamicIconImports[iconName], {
    loading: () => <Skeleton className={props.className} />,
  })
  return <Icon {...props} />
}
