'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { parseISO } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Collection } from '~/core'
import { type CollectionData } from '~/core/collection'
import { cn } from '~/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { getValidationSchemaForCollection, getValidationSchemaForSingleton } from '~/core/collection-schema'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { ImageData, RichTextField, TextField } from '~/core/field'
import { updateContent } from './queries'
import { useToast } from '../ui/use-toast'
import { DatePicker } from '../ui/date-picker'
import { ToastAction } from '../ui/toast'
import ImageUploader from '../image-uploader'

type ContentManagerProps<C extends Collection> = {
  type: 'collection' | 'singleton'
  initialData: CollectionData<C>
  collection: C
  collectionId: string
  className?: string
  style?: React.CSSProperties
}

export default function ContentManager<C extends Collection>({
  type,
  collectionId,
  collection,
  initialData,
  className,
  style,
}: ContentManagerProps<C>) {
  const validationSchema = useMemo(
    () =>
      type === 'singleton' ? getValidationSchemaForSingleton(collection) : getValidationSchemaForCollection(collection),
    [type, collection],
  )
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialData,
  })

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/'
  const { toast } = useToast()

  const mutation = useMutation(updateContent, {
    onSuccess: () => {
      toast({
        title: 'Content updated successfully',
        description: 'Refresh page to see the updated content',
        action: (
          <ToastAction asChild altText="View Page">
            <Link href={redirectTo}>View Page</Link>
          </ToastAction>
        ),
      })
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating content',
        description: error.message,
        variant: 'destructive',
      })
    },
  })
  const onSubmit = useCallback(
    (values: z.infer<typeof validationSchema>) => {
      mutation.mutate({ type, id: collectionId, data: values })
    },
    [type, collectionId, mutation],
  )

  return (
    <div className={cn('rounded-md border', className)} style={style}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={() => {
            form.reset()
          }}
        >
          <div className="space-y-4 px-4 pb-4 pt-2">
            {Object.entries(collection.fields).map(([fieldKey, fieldSchema]) => {
              // do not render hidden fields
              if (fieldSchema.hidden) {
                return null
              }

              return (
                <FormField
                  key={fieldKey}
                  control={form.control}
                  name={fieldKey}
                  render={({ field: { value, ...field } }) => {
                    return (
                      <FormItem>
                        <FormLabel>{fieldSchema.label}</FormLabel>
                        <FormControl>
                          {(() => {
                            switch (fieldSchema.type) {
                              case 'text': {
                                return <Input {...field} value={value as TextField['type']} />
                              }

                              case 'rich-text': {
                                return <Textarea {...field} value={value as RichTextField['type']} />
                              }

                              case 'date': {
                                let dateValue: Date | undefined = parseISO(value as string)
                                dateValue = !isNaN(dateValue.getTime()) ? dateValue : undefined

                                return (
                                  <div>
                                    <DatePicker
                                      date={dateValue}
                                      onChange={(dateSelected) => {
                                        field.onChange(dateSelected?.toISOString())
                                      }}
                                    />
                                  </div>
                                )
                              }

                              case 'image': {
                                console.log({ value })
                                return (
                                  <ImageUploader
                                    uploadedImages={value as ImageData[]}
                                    onChange={(uploadedImages) => {
                                      console.log({ uploadedImages })
                                      field.onChange(uploadedImages)
                                    }}
                                  />
                                )
                              }

                              default: {
                                return null
                              }
                            }
                          })()}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )
            })}
          </div>
          <div className="flex items-center justify-end space-x-4 border-t bg-muted px-4 py-2">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit" loading={mutation.isLoading}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
