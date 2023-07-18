import { HexColorPicker } from 'react-colorful'
import colors from 'tailwindcss/colors'
import { useState } from 'react'
import { CMSColorData } from '~/cms/types/field'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '~/lib/utils'

type ColorPickerProps = {
  value?: CMSColorData
  onChange?: (value: CMSColorData) => void
  className?: string
  style?: React.CSSProperties
}

const COLORS = [
  {
    colors: ['#ffffff', '#000000'],
  },
  {
    heading: 'Slate',
    colors: Object.values(colors.slate),
  },
  {
    heading: 'Gray',
    colors: Object.values(colors.gray),
  },
  {
    heading: 'Zinc',
    colors: Object.values(colors.zinc),
  },
  {
    heading: 'Neutral',
    colors: Object.values(colors.neutral),
  },
  {
    heading: 'Stone',
    colors: Object.values(colors.stone),
  },
  {
    heading: 'Red',
    colors: Object.values(colors.red),
  },
  {
    heading: 'Orange',
    colors: Object.values(colors.orange),
  },
  {
    heading: 'Amber',
    colors: Object.values(colors.amber),
  },
  {
    heading: 'Yellow',
    colors: Object.values(colors.yellow),
  },
  {
    heading: 'Lime',
    colors: Object.values(colors.lime),
  },
  {
    heading: 'Green',
    colors: Object.values(colors.green),
  },
  {
    heading: 'Emerald',
    colors: Object.values(colors.emerald),
  },
  {
    heading: 'Teal',
    colors: Object.values(colors.teal),
  },
  {
    heading: 'Cyan',
    colors: Object.values(colors.cyan),
  },
  {
    heading: 'Sky',
    colors: Object.values(colors.sky),
  },
  {
    heading: 'Blue',
    colors: Object.values(colors.blue),
  },
  {
    heading: 'Indigo',
    colors: Object.values(colors.indigo),
  },
  {
    heading: 'Violet',
    colors: Object.values(colors.violet),
  },
  {
    heading: 'Purple',
    colors: Object.values(colors.purple),
  },
  {
    heading: 'Fuchsia',
    colors: Object.values(colors.fuchsia),
  },
  {
    heading: 'Pink',
    colors: Object.values(colors.pink),
  },
  {
    heading: 'Rose',
    colors: Object.values(colors.rose),
  },
]

export function ColorPicker({ value, onChange, className, style }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          icon={<div style={{ backgroundColor: value }} className="rounded border" />}
          className={cn('font-mono', className)}
          style={style}
        >
          {value ?? 'Select Color'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <HexColorPicker
            className="!w-full"
            onChange={(selectedColor) => {
              onChange?.(selectedColor as CMSColorData)
            }}
          />
          <div className="max-h-[120px] space-y-4 overflow-auto">
            {COLORS.map((block, index) => {
              return (
                <div key={index} className="space-y-2">
                  {block.heading ? <div className="text-sm font-medium text-foreground">{block.heading}</div> : null}
                  <div className="flex flex-wrap gap-2">
                    {block.colors.map((color) => {
                      return (
                        <button
                          key={color}
                          style={{ backgroundColor: color, color }}
                          className="h-5 w-5 rounded-full border ring-current focus:outline-none focus:ring-2"
                          onClick={() => {
                            onChange?.(color as CMSColorData)
                            setOpen(false)
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
