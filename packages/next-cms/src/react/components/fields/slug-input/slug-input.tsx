import { forwardRef } from 'react'
import { cn, Input, InputProps, Button } from '@next-cms/ui'

type SlugInputProps = InputProps & {
  onGenerateSlug: () => void
}

const SlugInput = forwardRef<HTMLInputElement, SlugInputProps>(({ className, style, onGenerateSlug, ...rest }, ref) => {
  return (
    <div className={cn('flex items-center space-x-2', className)} style={style}>
      <Input {...rest} className="flex-1" ref={ref} />
      <Button variant="outline" onClick={onGenerateSlug} type="button">
        Generate Slug
      </Button>
    </div>
  )
})

SlugInput.displayName = 'SlugInput'

export default SlugInput
