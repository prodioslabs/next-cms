'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FileEdit, Trash2 } from 'lucide-react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { CMSField } from '~/cms/types/field'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { Textarea } from '~/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { generateContent } from './queries'
import { useToast } from '~/components/ui/use-toast'

const validationSchema = z.object({
  message: z.string(),
})

type AIContentProps = {
  field: CMSField
  fieldKey: string
  form: UseFormReturn
}

export default function AIContent({ field, fieldKey, form: contentManagerForm }: AIContentProps) {
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

  const form = useForm({
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
              <Button icon={<FileEdit />} variant="outline" size="icon" />
            </SheetTrigger>
          </TooltipTrigger>
          <SheetContent className="space-y-4 overflow-auto">
            <SheetHeader>
              <SheetTitle>AI Content Generator</SheetTitle>
              <SheetDescription>Generate content with GPT</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <div className="space-y-4">
                <FormField
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
                  <Button
                    type="button"
                    onClick={() => {
                      form.handleSubmit(() => {
                        mutation.mutate({ fieldType, message: form.getValues().message })
                      })()
                    }}
                    loading={mutation.isLoading}
                  >
                    {messages.length ? 'Regenerate' : 'Generate Content'}
                  </Button>
                </div>
              </div>
            </Form>
            {messages.length ? (
              <>
                <div className="border-b" />
                <div className="text-sm font-medium text-foreground">Generated Content</div>
                <div className="space-y-2">
                  {messages.map((message, index) => {
                    return (
                      <div key={`${message.slice(100)}-${index}`} className="space-y-4 rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">{message}</div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              contentManagerForm.setValue(fieldKey, message)
                              setOpen(false)
                            }}
                          >
                            Use Content
                          </Button>
                          <Button
                            variant="ghost"
                            icon={<Trash2 />}
                            size="icon"
                            onClick={() => {
                              setMessages((prevState) => prevState.filter((_, i) => i !== index))
                            }}
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
