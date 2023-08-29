'use client'

import { Editor } from '@tiptap/react'
import { Level } from '@tiptap/extension-heading'
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  TerminalSquare,
  Underline,
  Undo,
} from 'lucide-react'
import LinkButton from './link-button'
import TableMenu from './table-menu'
import ImageButton from './image-button'
import ColorButton from './color-button'
import { Toggle } from '../../../../../ui/toggle'
import { cn } from '../../../../lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../../ui/select'

type EditorToolbarProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

export const HEADING_LEVELS: Level[] = [1, 2, 3, 4, 5]

export default function EditorToolbar({ editor, className, style }: EditorToolbarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} style={style}>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run()
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        pressed={editor.isActive('bold')}
        variant="outline"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run()
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        pressed={editor.isActive('italic')}
        variant="outline"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleUnderline().run()
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        pressed={editor.isActive('underline')}
        variant="outline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run()
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        pressed={editor.isActive('strike')}
        variant="outline"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleCode().run()
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        pressed={editor.isActive('code')}
        variant="outline"
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleCodeBlock().run()
        }}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        pressed={editor.isActive('codeBlock')}
        variant="outline"
      >
        <TerminalSquare className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run()
        }}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}
        variant="outline"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run()
        }}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}
        variant="outline"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().toggleBlockquote().run()
        }}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive('blockqoute')}
        variant="outline"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Select
        value={`${editor.getAttributes('heading')?.level ?? 'normal'}`}
        onValueChange={(args) => {
          if (args === 'normal') {
            const currentHeadingLevel = editor.getAttributes('heading')?.level
            if (currentHeadingLevel) {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: currentHeadingLevel as Level })
                .run()
            }
          } else {
            editor
              .chain()
              .toggleHeading({ level: Number.parseInt(args, 10) as Level })
              .focus()
              .focus()
              .run()
          }
          setTimeout(() => {
            editor.chain().focus().run()
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
      <ColorButton editor={editor} />
      <LinkButton editor={editor} />
      <TableMenu editor={editor} />
      <ImageButton editor={editor} />
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().undo().run()
        }}
        disabled={!editor.can().undo()}
        pressed={false}
        variant="outline"
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => {
          editor.chain().focus().redo().run()
        }}
        disabled={!editor.can().redo()}
        pressed={false}
        variant="outline"
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </div>
  )
}
