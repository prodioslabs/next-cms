'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Sparkles, Trash } from 'lucide-react'
import type { CMSPluginComponentProps } from '@nextjs-cms/core'
import { generateContent } from './queries'
import { useToast } from '../../../../dashboard/hooks/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../ui/tooltip'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../../ui/sheet'
import { Button } from '../../../../ui/button'
import { Form, FormControl, FormFieldWithController, FormItem, FormLabel, FormMessage } from '../../../../ui/form'
import { Textarea } from '../../../../ui/textarea'

const validationSchema = z.object({
  message: z.string(),
})

export default function AIContent({ field, updateField }: CMSPluginComponentProps) {
  const fieldType = z.union([z.literal('text'), z.literal('rich-text')]).parse(field.type)

  const [open, setOpen] = useState(false)

  const [messages, setMessages] = useState<string[]>([])

  const { toast } = useToast()
  const mutation = useMutation(generateContent, {
    onSuccess: ({ content }) => {
      setMessages((prevState) => [...prevState, content])
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating content',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      message: '',
    },
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <Sheet open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button icon={<Sparkles />} variant="outline" size="icon" />
            </SheetTrigger>
          </TooltipTrigger>
          <SheetContent className="space-y-4 overflow-auto">
            <SheetHeader>
              <SheetTitle>AI Content Generator</SheetTitle>
              <SheetDescription>Generate content with GPT</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.stopPropagation()
                  return form.handleSubmit(() => {
                    mutation.mutate({ fieldType, message: form.getValues().message })
                  })(event)
                }}
              >
                <FormFieldWithController
                  name="message"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write a brief message..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <div className="flex items-center justify-end space-x-4">
                  <SheetClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        form.reset()
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                  <Button type="submit" loading={mutation.isLoading}>
                    Generate Content
                  </Button>
                </div>
              </form>
            </Form>
            {messages.length ? (
              <>
                <div className="border-b" />
                <div className="text-sm font-medium text-foreground">Generated Content</div>
                <div className="space-y-2">
                  {messages.map((message, index) => {
                    return (
                      <div key={`${message.slice(100)}-${index}`} className="space-y-4 rounded-md border p-4">
                        <div
                          className="prose prose-sm text-sm text-muted-foreground dark:prose-invert"
                          dangerouslySetInnerHTML={{ __html: message }}
                        />
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              updateField(message)
                              setOpen(false)
                            }}
                            type="button"
                          >
                            Use Content
                          </Button>
                          <Button
                            variant="ghost"
                            icon={<Trash />}
                            size="icon"
                            onClick={() => {
                              setMessages((prevState) => prevState.filter((_, i) => i !== index))
                            }}
                            type="button"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : null}
          </SheetContent>
        </Sheet>
        <TooltipContent side="left" sideOffset={20}>
          <p>Generate content with AI</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
