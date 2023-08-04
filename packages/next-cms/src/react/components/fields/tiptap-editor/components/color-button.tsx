'use client'

import { useCallback } from 'react'
import { Editor } from '@tiptap/react'
import { Baseline, RemoveFormatting } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { Button, ColorPalette, Popover, PopoverContent, PopoverTrigger, Toggle } from 'ui'

type ColorButtonProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

export default function ColorButton({ editor, className, style }: ColorButtonProps) {
  const colorActive = editor.getAttributes('textStyle')?.color

  const handleColorChangeWithDebounce = useDebouncedCallback((color: string) => {
    editor.chain().focus().setColor(color).run()
  }, 1000)

  const handleColorChange = useCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run()
    },
    [editor],
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle className={className} style={style} variant="outline">
          <Baseline className="h-4 w-4" style={{ color: colorActive }} />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent sideOffset={12}>
        <div className="space-y-4">
          <ColorPalette
            value={colorActive}
            onChange={(colorSelected, fromPicker) => {
              if (fromPicker) {
                handleColorChangeWithDebounce(colorSelected)
              } else {
                handleColorChange(colorSelected)
              }
            }}
          />
          {colorActive ? (
            <>
              <div className="border-b" />
              <Button
                variant="outline"
                icon={<RemoveFormatting />}
                size="sm"
                onClick={() => {
                  editor.chain().focus().unsetColor().run()
                }}
              >
                Remove Formatting
              </Button>
            </>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}
