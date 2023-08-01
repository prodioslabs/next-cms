'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tiptap/react'
import { Check, Link } from 'lucide-react'
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
} from 'ui'
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
      link: '',
    },
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className} style={style} icon={<Link />} size="icon" variant="outline" type="button" />
      </PopoverTrigger>
      <PopoverContent>
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
            <div className="flex items-center justify-end">
              <Button size="icon-sm" type="submit" icon={<Check />} />
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
