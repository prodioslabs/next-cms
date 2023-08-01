import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tiptap/react'
import { Table } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Form,
  FormControl,
  FormFieldWithController,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from 'ui'
import { z } from 'zod'

export const TABLE_SIZES = [
  {
    columns: 3,
    rows: 4,
  },
  {
    columns: 4,
    rows: 4,
  },
  {
    columns: 5,
    rows: 4,
  },
  {
    columns: 6,
    rows: 4,
  },
]

const validationSchema = z.object({
  rows: z.number().int().positive().min(1),
  columns: z.number().int().positive().min(1),
})

type TableButtonProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

export default function TableButton({ editor, className, style }: TableButtonProps) {
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      rows: 1,
      columns: 1,
    },
  })

  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Menubar className="border-none p-0">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant="outline" size="icon" icon={<Table />} type="button" className={className} style={style} />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Insert Table</MenubarSubTrigger>
              <MenubarSubContent>
                {TABLE_SIZES.map((tableSize) => (
                  <MenubarItem
                    key={`${tableSize.rows}x${tableSize.columns}`}
                    onClick={() => {
                      editor.chain().focus().insertTable({ rows: tableSize.rows, cols: tableSize.columns }).run()
                    }}
                  >
                    {tableSize.rows} x {tableSize.columns}
                  </MenubarItem>
                ))}
                <MenubarSeparator />
                <DialogTrigger>
                  <MenubarItem>Custom Table Size</MenubarItem>
                </DialogTrigger>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Add Column Before</MenubarItem>
            <MenubarItem>Add Column After</MenubarItem>
            <MenubarItem>Delete Column</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Add Row Before</MenubarItem>
            <MenubarItem>Add Row After</MenubarItem>
            <MenubarItem>Delete Row</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Merge Cells</MenubarItem>
            <MenubarItem>Split Cell</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Delete Table</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create custom table</DialogTitle>
          <DialogDescription>Add rows and columns size</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.stopPropagation()
              form.handleSubmit(({ rows, columns }) => {
                editor.chain().focus().insertTable({ rows, cols: columns }).run()
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
              name="columns"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Columns</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Columns"
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
              <Button
                variant="ghost"
                onClick={() => {
                  setDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
