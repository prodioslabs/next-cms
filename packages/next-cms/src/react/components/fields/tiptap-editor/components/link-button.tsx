'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tiptap/react'
import { Check, Link, Unlink } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Form,
  FormControl,
  FormFieldWithController,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextjs-cms/ui'
import { z } from 'zod'

type LinkButtonProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

const validationSchema = z.object({
  link: z.string().url(),
})

export default function LinkButton({ editor, className, style }: LinkButtonProps) {
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      link: editor.isActive('link') ? editor.getAttributes('link').href : '',
    },
  })

  return (
    <Popover
      onOpenChange={(open) => {
        if (editor.isActive('link') && open) {
          form.setValue('link', editor.getAttributes('link').href)
        }
        if (!open && !editor.isActive('link')) {
          form.setValue('link', '')
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button className={className} style={style} icon={<Link />} size="icon" variant="ghost" type="button" />
      </PopoverTrigger>
      <PopoverContent sideOffset={12}>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.stopPropagation()
              form.handleSubmit(({ link }) => {
                editor.chain().focus().setLink({ href: link }).run()
              })(event)
            }}
            className="space-y-4"
          >
            <FormFieldWithController
              name="link"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <div className="flex items-center justify-end space-x-2">
              {editor.isActive('link') ? (
                <Button
                  type="button"
                  size="icon-sm"
                  variant="secondary"
                  icon={<Unlink />}
                  onClick={() => {
                    editor.chain().focus().unsetLink().run()
                  }}
                />
              ) : null}
              <Button size="icon-sm" type="submit" icon={<Check />} />
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
