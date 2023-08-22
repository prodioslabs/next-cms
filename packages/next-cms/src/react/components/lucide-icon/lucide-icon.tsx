import dynamic from 'next/dynamic'
import { LucideProps, Shield } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { Skeleton } from 'ui'

interface IconProps extends LucideProps {
  name: string
}

export const lucideIconNames = Object.keys(dynamicIconImports)

export function LucideIcon({ name, ...props }: IconProps) {
  if (name in dynamicIconImports) {
    const Icon = dynamic(dynamicIconImports[name as keyof typeof dynamicIconImports], {
      loading: () => <Skeleton className={props.className} />,
    })
    return <Icon {...props} />
  }
  // eslint-disable-next-line no-console
  console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`)
  return <Shield {...props} />
}
