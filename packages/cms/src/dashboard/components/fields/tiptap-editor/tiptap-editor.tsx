'use client'

import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import LinkExtension from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import EditorToolbar, { HEADING_LEVELS } from './components/editor-toolbar'
import { cn } from '../../../lib/utils'

// const EditorContent = dynamic(() => import('@tiptap/react').then((mod) => mod.EditorContent), { ssr: false })
// const useEditor = dynamic(() => import('@tiptap/react').then((mod) => mod.useEditor), { ssr: false })

const CustomTextStyle = TextStyle.extend({
  priority: 1000,
})

type TiptapEditorProps = {
  /**
   * HTML String
   */
  value: string
  onChange: (value: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function TiptapEditor({ value, onChange, className, style }: TiptapEditorProps) {
  /**
   * internalValue -> the internal value, used to compare the value and internalValue
   * @see updateContentOnValueChange
   */
  const [internalValue, setInternalValue] = useState(value)

  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: HEADING_LEVELS,
        },
      }),
      Underline,
      Color.configure({
        types: ['textStyle'],
      }),
      CustomTextStyle,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          style: 'table-layout: fixed; width: 100%;',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
    ],
    onUpdate: () => {
      const html = editor?.getHTML()
      if (html) {
        onChange(html)
        setInternalValue(html)
      }
    },
  })

  useEffect(
    function updateContentOnValueChange() {
      if (typeof value === 'string' && value !== internalValue) {
        editor?.commands.setContent(value)
      }
    },
    [value, internalValue, editor],
  )

  return (
    <div className={cn('space-y-4', className)} style={style}>
      {editor ? (
        <>
          <EditorToolbar editor={editor} />
          <EditorContent
            editor={editor}
            className={String.raw`editor-container prose prose-zinc !max-w-none rounded-md border px-3 py-2 text-sm text-foreground dark:prose-invert focus-within:border-primary/50 prose-table:table-fixed prose-table:border-collapse prose-table:border [&>.ProseMirror]:focus-within:outline-none [&_.ProseMirror-selectednode]:ring-2 [&_.ProseMirror-selectednode]:ring-ring [&_.column-resize-handle]:pointer-events-none [&_.column-resize-handle]:absolute [&_.column-resize-handle]:bottom-0 [&_.column-resize-handle]:right-0 [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:w-0.5 [&_.column-resize-handle]:cursor-col-resize [&_.column-resize-handle]:bg-primary/50 [&_.selectedCell]:after:pointer-events-none [&_.selectedCell]:after:absolute [&_.selectedCell]:after:inset-0 [&_.selectedCell]:after:bg-primary/10 [&_td]:relative [&_td]:border [&_td]:p-2 [&_td_p]:m-0 [&_th>p]:m-0 [&_th]:relative [&_th]:border [&_th]:bg-muted [&_th]:p-2`}
          />
        </>
      ) : null}
    </div>
  )
}
