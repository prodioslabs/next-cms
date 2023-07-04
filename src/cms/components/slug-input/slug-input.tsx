'use client'

import { cn } from '~/lib/utils'
import { Input, InputProps } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

type SlugInputProps = InputProps & {
  onGenerateSlug: () => void
}

export default function SlugInput({ className, style, onGenerateSlug, ...rest }: SlugInputProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)} style={style}>
      <Input {...rest} className="flex-1" />
      <Button variant="outline" onClick={onGenerateSlug} type="button">
        Generate Slug
      </Button>
    </div>
  )
}
