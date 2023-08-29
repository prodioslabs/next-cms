'use client'

import { useState } from 'react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '../dashboard/lib/utils'
import { ColorPalette } from './color-palette'

type ColorPickerProps = {
  value?: string
  onChange?: (value: string) => void
  showColor?: boolean
  className?: string
  style?: React.CSSProperties
}

export function ColorPicker({ value, onChange, showColor = true, className, style }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          icon={value ? <div style={{ backgroundColor: value }} className="rounded border" /> : undefined}
          className={cn('font-mono', className)}
          style={style}
        >
          {value ? (showColor ? value : undefined) : 'Select Color'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ColorPalette
          value={value}
          onChange={(colorSelected, fromColorPicker) => {
            onChange?.(colorSelected)
            if (!fromColorPicker) {
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
