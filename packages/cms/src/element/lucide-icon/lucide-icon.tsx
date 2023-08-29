import * as LucideIcons from 'lucide-react'

interface IconProps extends LucideIcons.LucideProps {
  name: string
}

export type LucideIconName = keyof typeof LucideIcons.icons

export const lucideIconNames = Object.keys(LucideIcons.icons) as LucideIconName[]

export function LucideIcon({ name, ...props }: IconProps) {
  let iconName = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') as LucideIconName
  if (!(iconName in LucideIcons.icons)) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${name}" is not supported. Falling back to Shield icon.`)
    iconName = 'Shield'
  }

  const Icon = LucideIcons.icons[iconName]

  return <Icon {...props} />
}
