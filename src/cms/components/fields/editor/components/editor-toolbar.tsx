import { useActive, useCommands, useAttrs } from '@remirror/react'
import {
  Italic,
  Underline,
  Bold,
  Strikethrough,
  Undo,
  Redo,
  List,
  ListOrdered,
  Quote,
  RemoveFormatting,
} from 'lucide-react'
import { CMSColorData } from '~/cms/types/field'
import { ColorPicker } from '~/components/ui/color-picker'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '~/components/ui/select'
import { Toggle } from '~/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

const HEADING_LEVELS = [1, 2, 3, 4, 5]

type EditorToolbarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function EditorToolbar({ className, style }: EditorToolbarProps) {
  const {
    focus,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrike,
    toggleBulletList,
    toggleOrderedList,
    toggleBlockquote,
    undo,
    redo,
    toggleHeading,
    setTextColor,
    removeTextColor,
  } = useCommands()
  const { bold, italic, underline, strike, bulletList, orderedList, blockquote } = useActive()
  const { textColor, heading } = useAttrs()

  return (
    <div className={cn('flex items-center space-x-2', className)} style={style}>
      <Toggle
        onPressedChange={() => {
          toggleBold()
        }}
        disabled={toggleBold.enabled() === false}
        pressed={bold()}
        size="sm"
        variant="outline"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          toggleItalic()
        }}
        disabled={toggleItalic.enabled() === false}
        pressed={italic()}
        size="sm"
        variant="outline"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          toggleUnderline()
        }}
        disabled={toggleUnderline.enabled() === false}
        pressed={underline()}
        size="sm"
        variant="outline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          toggleStrike()
        }}
        disabled={toggleStrike.enabled() === false}
        pressed={strike()}
        size="sm"
        variant="outline"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <div className="h-6 border-r" />
      <Toggle
        onPressedChange={() => {
          toggleBulletList()
          focus()
        }}
        disabled={toggleBulletList.enabled() === false}
        pressed={bulletList()}
        size="sm"
        variant="outline"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          toggleOrderedList()
          focus()
        }}
        disabled={toggleOrderedList.enabled() === false}
        pressed={orderedList()}
        size="sm"
        variant="outline"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          toggleBlockquote()
        }}
        disabled={toggleBlockquote.enabled() === false}
        pressed={blockquote()}
        size="sm"
        variant="outline"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <div className="h-6 border-r" />
      <Select
        value={`${heading()?.level ?? 'normal'}`}
        onValueChange={(args) => {
          if (args === 'normal') {
            toggleHeading()
          } else {
            toggleHeading({ level: Number.parseInt(args, 10) })
          }
          requestAnimationFrame(() => {
            focus()
          })
        }}
      >
        <SelectTrigger className="w-[210px]">
          <SelectValue placeholder="Text Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="normal" value="normal">
            Normal Text
          </SelectItem>
          {HEADING_LEVELS.map((headingLevel) => {
            return (
              <SelectItem key={headingLevel} value={`${headingLevel}`}>
                Heading {headingLevel}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <div className="h-6 border-r" />
      <ColorPicker
        value={textColor()?.color as CMSColorData | undefined}
        onChange={(value) => {
          setTextColor(value)
        }}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              onPressedChange={() => {
                removeTextColor()
              }}
              pressed={false}
              size="sm"
              variant="outline"
            >
              <RemoveFormatting className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>Remove Color</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex-1" />
      <Toggle
        onPressedChange={() => {
          undo()
        }}
        disabled={undo.enabled() === false}
        pressed={false}
        size="sm"
        variant="outline"
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          redo()
        }}
        disabled={redo.enabled() === false}
        pressed={false}
        size="sm"
        variant="outline"
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
