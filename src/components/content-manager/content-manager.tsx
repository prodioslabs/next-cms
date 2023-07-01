'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from 'react-query'
import { parseISO } from 'date-fns'
import Link from 'next/link'
import { FileWarning } from 'lucide-react'
import { Collection } from '~/core'
import { type ElementData } from '~/core/collection'
import { cn } from '~/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { getValidationSchemaForSingleton } from '~/core/collection-schema'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { ImageData, RichTextField, TextField } from '~/core/field'
import { updateContent } from './queries'
import { useToast } from '../ui/use-toast'
import { DatePicker } from '../ui/date-picker'
import { ToastAction } from '../ui/toast'
import ImageUploader from '../image-uploader'

type ContentManagerProps<C extends Collection> = {
  config: { type: 'collection'; elementIndex: number } | { type: 'singleton' }
  initialData: ElementData<C>
  schema: C
  id: string
  redirectToOnSave?: string
  className?: string
  style?: React.CSSProperties
}

export default function ContentManager<C extends Collection>({
  config,
  id,
  schema,
  initialData,
  redirectToOnSave = '/',
  className,
  style,
}: ContentManagerProps<C>) {
  // validationSchema is always computed assuming schema as a singleton because of even for the collection
  // each element of the collection would be having its own content manager
  const validationSchema = useMemo(() => getValidationSchemaForSingleton(schema), [schema])
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialData,
  })

  const values = useWatch({ control: form.control })
  const isDataChanged = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialData), [values, initialData])

  const { toast } = useToast()

  const mutation = useMutation(updateContent, {
    onSuccess: () => {
      toast({
        title: 'Content updated successfully',
        description: 'Refresh page to see the updated content',
        action: (
          <ToastAction asChild altText="View Page">
            <Link href={redirectToOnSave}>View Page</Link>
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
      if (config.type === 'collection') {
        mutation.mutate({ type: config.type, elementIndex: config.elementIndex, id, data: values })
      } else {
        mutation.mutate({ type: config.type, id, data: values })
      }
    },
    [config, id, mutation],
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
            {Object.entries(schema.fields).map(([fieldKey, fieldSchema]) => {
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
                                return (
                                  <ImageUploader
                                    uploadedImages={value as ImageData[]}
                                    onChange={(uploadedImages) => {
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
            {isDataChanged ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <FileWarning className="mr-1 h-5 w-5" />
                Unsaved Changes
              </div>
            ) : null}
            <div className="flex-1" />
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
