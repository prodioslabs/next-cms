'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'
import Image from 'next/image'
import { CMSPluginComponentProps } from '~/cms/types/plugin'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { searchImage } from './queries'

const validationSchema = z.object({
  query: z.string().min(1),
})

export default function UnsplashImageSelector({ fieldKey, form: contentManagerForm }: CMSPluginComponentProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      query: '',
    },
  })

  const mutation = useMutation(searchImage)

  return (
    <TooltipProvider>
      <Tooltip>
        <Sheet open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                type="button"
                icon={
                  <svg viewBox="0 0 24 24">
                    <title />
                    <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" className="fill-current" />
                  </svg>
                }
                size="icon"
              />
            </SheetTrigger>
          </TooltipTrigger>
          <SheetContent className="space-y-4 overflow-auto">
            <SheetHeader>
              <SheetTitle>Unsplash Image</SheetTitle>
              <SheetDescription>Select image from unsplash</SheetDescription>
            </SheetHeader>
            <Form {...form}>
              <form className="flex items-start space-x-2">
                <FormField
                  name="query"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Search high-resolution images..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    form.handleSubmit(() => {
                      mutation.mutate({ query: form.getValues().query })
                    })()
                  }}
                  loading={mutation.isLoading}
                >
                  Search
                </Button>
              </form>
            </Form>
            <div className="grid grid-cols-2 gap-4">
              {mutation.data?.photos?.results.map((photo) => {
                return (
                  <button
                    key={photo.id}
                    className="relative block aspect-square overflow-hidden rounded-md after:absolute after:inset-0 after:bg-primary/50 after:opacity-0 after:transition-opacity hover:after:opacity-100"
                    type="button"
                    onClick={() => {
                      contentManagerForm.setValue(fieldKey, [
                        {
                          url: photo.urls.full,
                          width: photo.width,
                          height: photo.height,
                        },
                      ])
                      setOpen(false)
                    }}
                  >
                    <Image
                      className="h-full w-full object-cover"
                      src={photo.urls.thumb}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.description ?? ''}
                    />
                  </button>
                )
              })}
            </div>
          </SheetContent>
          <TooltipContent side="left" sideOffset={20}>
            <p>Select image from Unsplash</p>
          </TooltipContent>
        </Sheet>
      </Tooltip>
    </TooltipProvider>
  )
}