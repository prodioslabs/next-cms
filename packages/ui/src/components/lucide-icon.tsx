import * as LucideIcons from 'lucide-react'

type LucideIconProps = React.ComponentProps<(typeof LucideIcons)['Accessibility']> & {
  name: string
}

export function LucideIcon({ name, ...rest }: LucideIconProps) {
  if (name in LucideIcons && name !== 'createLucideIcon') {
    const Icon = LucideIcons[name as Exclude<keyof typeof LucideIcons, 'createLucideIcon'>]
    return <Icon {...rest} />
  }

  // eslint-disable-next-line no-console
  console.warn(`Icon "${name}" does not exist. Using default ShieldQuestion icon`)
  return <LucideIcons.ShieldQuestion {...rest} />
}
