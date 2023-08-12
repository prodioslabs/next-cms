import { icons } from 'lucide-react'

type LucideIconProps = React.ComponentProps<typeof icons.Accessibility> & {
  name: string
}

export function LucideIcon({ name, ...rest }: LucideIconProps) {
  if (name in icons) {
    const Icon = icons[name as keyof typeof icons]
    return <Icon {...rest} />
  }

  // eslint-disable-next-line no-console
  console.warn(`Icon "${name}" does not exist. Using default ShieldQuestion icon`)
  return <icons.ShieldQuestion {...rest} />
}
