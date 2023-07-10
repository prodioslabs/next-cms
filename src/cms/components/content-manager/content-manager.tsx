'use client'

/**
 * TODO:
 * 1. Remove all the ts-expect-error statements
 * 2. Break down the component into Form and Updator
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { createElement, useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from 'react-query'
import Link from 'next/link'
import { FileWarning } from 'lucide-react'
import { parseISO } from 'date-fns'
import slugify from 'slugify'
import { useRouter } from 'next/navigation'
import { cn } from '~/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { updateContent } from './queries'
import { useToast } from '~/components/ui/use-toast'
import { ToastAction } from '~/components/ui/toast'
import { DatePicker } from '~/components/ui/date-picker'
import ImageUploader from '../image-uploader'
import SlugInput from '../slug-input/slug-input'
import { CMSField, CMSRichTextField, CMSTextField, CMSImageData } from '~/cms/types/field'
import { getValidationSchemaForSchema } from '~/cms/core/validation'
import { CMSSchemaData } from '~/cms/types/schema'
import { CreateOrUpdateContentBodySchema } from '~/cms/api/schema'
import { CMSPlugin } from '~/cms/types/plugin'

type ContentManagerProps<Schema extends Record<string, CMSField>> = {
  config: CreateOrUpdateContentBodySchema
  schema: Schema
  initialData: CMSSchemaData<Schema>
  plugins?: CMSPlugin[]
  redirectToOnSave?: string
  className?: string
  style?: React.CSSProperties
}

export default function ContentManager<Schema extends Record<string, CMSField>>({
  config,
  schema,
  initialData,
  redirectToOnSave = '/',
  plugins = [],
  className,
  style,
}: ContentManagerProps<Schema>) {
  // validationSchema is always computed assuming schema as a singleton because of even for the collection
  // each element of the collection would be having its own content manager
  const validationSchema = useMemo(() => getValidationSchemaForSchema(schema), [schema])
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    // TODO: Remove ts-expect-error
    // @ts-expect-error
    defaultValues: initialData,
  })

  const values = useWatch({ control: form.control })
  const isDataChanged = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialData), [values, initialData])

  const { toast } = useToast()

  const router = useRouter()

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
      router.refresh()
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
      mutation.mutate({ ...config, data: values })
    },
    [config, mutation],
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
            {Object.entries(schema).map(([fieldKey, fieldSchema]) => {
              // do not render hidden fields
              if (fieldSchema.hidden) {
                return null
              }

              const pluginsToRender = plugins.filter((plugin) => {
                return plugin.enabledForFields.includes(fieldSchema.type)
              })

              return (
                <FormField
                  key={fieldKey}
                  control={form.control}
                  // @ts-expect-error
                  name={fieldKey}
                  render={({ field: { value, ...field } }) => {
                    return (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-4 truncate">
                          <span className="flex-1 truncate">{fieldSchema.label}</span>
                          {pluginsToRender.map((plugin) => {
                            return createElement(plugin.component, {
                              fieldKey,
                              field: fieldSchema,
                              form,
                              key: plugin.name,
                            })
                          })}
                        </FormLabel>
                        <FormControl>
                          {(() => {
                            switch (fieldSchema.type) {
                              case 'text': {
                                return <Input {...field} value={value as CMSTextField['type']} />
                              }

                              case 'rich-text': {
                                return <Textarea {...field} value={value as CMSRichTextField['type']} />
                              }

                              case 'slug': {
                                return (
                                  <SlugInput
                                    {...field}
                                    value={value as string}
                                    onGenerateSlug={() => {
                                      // TODO: validate if the field is string or not
                                      const fromValue = values[fieldSchema.from as string] as string
                                      if (fromValue) {
                                        const slug = slugify(fromValue)
                                        // @ts-expect-error
                                        field.onChange(slug)
                                      }
                                    }}
                                  />
                                )
                              }

                              case 'date': {
                                let dateValue: Date | undefined = parseISO(value as string)
                                dateValue = !isNaN(dateValue.getTime()) ? dateValue : undefined

                                return (
                                  <div>
                                    <DatePicker
                                      date={dateValue}
                                      onChange={(dateSelected) => {
                                        // @ts-expect-error
                                        field.onChange(dateSelected?.toISOString())
                                      }}
                                    />
                                  </div>
                                )
                              }

                              case 'image': {
                                return (
                                  <ImageUploader
                                    uploadedImages={value as CMSImageData[]}
                                    onChange={(uploadedImages) => {
                                      // @ts-expect-error
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
