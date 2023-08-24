'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tiptap/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../ui/dialog'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../../../../ui/menu-bar'
import { Button } from '../../../../ui/button'
import { Form, FormControl, FormFieldWithController, FormItem, FormLabel, FormMessage } from '../../../../ui/form'
import { Input } from '../../../../ui/input'
import { LucideIcon } from '../../../../../ui'

export const TABLE_SIZES = [
  {
    cols: 3,
    rows: 4,
  },
  {
    cols: 4,
    rows: 4,
  },
  {
    cols: 5,
    rows: 4,
  },
  {
    cols: 6,
    rows: 4,
  },
]

const validationSchema = z.object({
  rows: z.number().int().positive().min(1),
  cols: z.number().int().positive().min(1),
})

type TableMenuProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

export default function TableMenu({ editor, className, style }: TableMenuProps) {
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      rows: 1,
      cols: 1,
    },
  })

  const handleInsertTable = useCallback(
    (rows: number, cols: number) => {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
      setTimeout(() => {
        editor.chain().focus().run()
      })
    },
    [editor],
  )

  const [customTableDialogOpen, setCustomTableDialogOpen] = useState(false)

  return (
    <Dialog open={customTableDialogOpen} onOpenChange={setCustomTableDialogOpen}>
      <Menubar className="border-none p-0">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              icon={<LucideIcon name="table" />}
              type="button"
              className={className}
              style={style}
            />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Insert Table</MenubarSubTrigger>
              <MenubarSubContent>
                {TABLE_SIZES.map((tableSize) => (
                  <MenubarItem
                    key={`${tableSize.rows}x${tableSize.cols}`}
                    onClick={() => {
                      handleInsertTable(tableSize.rows, tableSize.cols)
                    }}
                  >
                    {tableSize.rows} x {tableSize.cols}
                  </MenubarItem>
                ))}
                <MenubarSeparator />
                <DialogTrigger>
                  <MenubarItem>Custom Table Size</MenubarItem>
                </DialogTrigger>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().addColumnBefore().run()
              }}
            >
              Add Column Before
            </MenubarItem>
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().addColumnAfter().run()
              }}
            >
              Add Column After
            </MenubarItem>
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().deleteColumn().run()
              }}
            >
              Delete Column
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().addRowBefore().run()
              }}
            >
              Add Row Before
            </MenubarItem>
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().addRowAfter().run()
              }}
            >
              Add Row After
            </MenubarItem>
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().deleteRow().run()
              }}
            >
              Delete Row
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              disabled={!editor.can().chain().mergeCells().run()}
              onClick={() => {
                editor.chain().focus().mergeCells().run()
              }}
            >
              Merge Cells
            </MenubarItem>
            <MenubarItem
              disabled={!editor.can().chain().splitCell().run()}
              onClick={() => {
                editor.chain().focus().splitCell().run()
              }}
            >
              Split Cell
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              disabled={!editor.isActive('table')}
              onClick={() => {
                editor.chain().focus().deleteTable().run()
              }}
              className="text-destructive"
            >
              Delete Table
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create custom table</DialogTitle>
          <DialogDescription>Add rows and cols size</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.stopPropagation()
              form.handleSubmit(({ rows, cols }) => {
                handleInsertTable(rows, cols)
                setCustomTableDialogOpen(false)
              })(event)
            }}
            className="space-y-4"
          >
            <FormFieldWithController
              name="rows"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Rows</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rows"
                        {...field}
                        type="number"
                        onChange={(event) => {
                          field.onChange(Number.parseInt(event.target.value, 10))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormFieldWithController
              name="cols"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>cols</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="cols"
                        {...field}
                        type="number"
                        onChange={(event) => {
                          field.onChange(Number.parseInt(event.target.value, 10))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
