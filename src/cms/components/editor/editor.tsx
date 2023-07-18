'use client'

import { useRemirror, Remirror, EditorComponent } from '@remirror/react'
import {
  MarkdownExtension,
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  OrderedListExtension,
  StrikeExtension,
  UnderlineExtension,
  HistoryExtension,
  TextColorExtension,
} from 'remirror/extensions'
import { forwardRef, useImperativeHandle } from 'react'
import { cn } from '~/lib/utils'
import MarkdownUpdater from './components/markdown-updater'
import EditorToolbar from './components/editor-toolbar'

type EditorRef = {
  setContent: (markdownContent: string) => void
}

type EditorProps = {
  value: string
  onChange: (markdownContent: string) => void
  className?: string
  style?: React.CSSProperties
}

const Editor = forwardRef<EditorRef, EditorProps>(({ value, onChange, className, style }, ref) => {
  const editor = useRemirror({
    extensions: () => [
      new MarkdownExtension({ copyAsMarkdown: false }),
      new LinkExtension({ autoLink: true }),
      new BoldExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new HistoryExtension(),
      new TextColorExtension(),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    stringHandler: 'markdown',
    content: value,
  })

  useImperativeHandle(ref, () => ({
    setContent(markdownContent) {
      editor.getContext()?.setContent(markdownContent)
    },
  }))

  return (
    <div className={cn(className)} style={style}>
      <Remirror manager={editor.manager} initialContent={editor.state}>
        <EditorToolbar className="mb-2" />
        <div className="editor-container prose !max-w-none rounded-md border px-3 py-2 text-sm  text-foreground [&>.remirror-editor-wrapper>div]:focus-within:outline-none">
          <EditorComponent />
        </div>
        <MarkdownUpdater onChange={onChange} />
      </Remirror>
    </div>
  )
})

Editor.displayName = 'Editor'

export default Editor
