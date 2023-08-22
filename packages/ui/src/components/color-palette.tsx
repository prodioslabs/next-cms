'use client'

import { HexColorPicker } from 'react-colorful'
import colors from 'tailwindcss/colors'
import { cn } from '../lib/utils'

type ColorPaletteProps = {
  value?: string
  onChange?: (value: string, fromColorPicker: boolean) => void
  showColor?: boolean
  className?: string
  style?: React.CSSProperties
}

function convertToHex(rgb: string) {
  const result = rgb.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/) // Extract numbers with a regex
  if (!result) {
    return rgb
  }

  return (
    '#' +
    result
      .slice(1)
      .map((part: string) => {
        const hex = parseInt(part).toString(16) // Convert to hexadecimal
        return hex.length === 1 ? '0' + hex : hex // Add zero if we get only one character
      })
      .join('')
  )
}

const COLORS = [
  {
    colors: [colors.white, colors.black],
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

export function ColorPalette({ value, onChange, className, style }: ColorPaletteProps) {
  return (
    <div className={cn('space-y-4', className)} style={style}>
      <HexColorPicker
        className="!w-full"
        color={value ? convertToHex(value) : undefined}
        onChange={(selectedColor) => {
          onChange?.(selectedColor, true)
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
                      style={{ backgroundColor: color }}
                      className={cn(
                        'h-5 w-5 rounded-full ring-current focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                        color === colors.white ? 'border' : undefined,
                      )}
                      onClick={() => {
                        onChange?.(color, false)
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
  )
}
