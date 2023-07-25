'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { FileWarning } from 'lucide-react'
import { parseISO } from 'date-fns'
import slugify from 'slugify'
import dynamic from 'next/dynamic'
import { cn } from '~/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { DatePicker } from '~/components/ui/date-picker'
import { getValidationSchemaForSchema } from '~/cms/core/validation'
import { ColorPicker } from '~/components/ui/color-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Loader } from '~/components/ui/loader'

import ImageUploader from '../../fields/image-uploader'
import SlugInput from '../../fields/slug-input/slug-input'
import IconSelector from '../../fields/icon-selector'
import { ContentManagerProps } from '../types'
import InputField from '../../input-field'

// TODO: Move it to utils directory
function parseDate(dateStr: string) {
  const parsedDate = parseISO(dateStr)
  if (isNaN(parsedDate.getTime())) {
    return undefined
  }
  return parsedDate
}

// TODO: Move it to the utils directory
function stringifyDate(date: Date) {
  return date.toISOString()
}

const Editor = dynamic(() => import('../../fields/editor'), {
  ssr: false,
  loading: () => <Loader message="Loading Editor..." variant="outline" />,
})

export type BaseFormProps = Omit<ContentManagerProps, 'config' | 'onUpdate' | 'redirectToOnSave'> & {
  onSubmit: (data: any) => void
  submitting?: boolean
}

export default function BaseForm({
  schema,
  initialData,
  onSubmit,
  submitting,
  plugins = [],
  title,
  className,
  style,
}: BaseFormProps) {
  // validationSchema is always computed assuming schema as a singleton because of even for the collection
  // each element of the collection would be having its own content manager
  const validationSchema = useMemo(() => getValidationSchemaForSchema(schema) as z.ZodType, [schema])
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialData,
  })

  const values = useWatch({ control: form.control }) as Record<string, any>
  const isDataChanged = useMemo(() => JSON.stringify(values) !== JSON.stringify(initialData), [values, initialData])

  return (
    <>
      <title>{`${isDataChanged ? '🟡 ' : ''}Content Manager${title ? ` | ${title}` : ''}`}</title>
      <div className={cn('rounded-md border', className)} style={style}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={() => {
              form.reset()
            }}
          >
            <div className="space-y-8 p-4">
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
                    name={fieldKey}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <FormItem>
                          <FormLabel className="block">{fieldSchema.label}</FormLabel>
                          <FormControl>
                            {(() => {
                              switch (fieldSchema.type) {
                                case 'text': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      field={fieldSchema}
                                      plugins={pluginsToRender}
                                      value={value}
                                      onChange={onChange}
                                      renderField={({ value, onChange }) => {
                                        return (
                                          <Input
                                            value={value}
                                            onChange={(event) => {
                                              onChange(event.target.value)
                                            }}
                                          />
                                        )
                                      }}
                                    />
                                  )
                                }

                                case 'rich-text': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      plugins={pluginsToRender}
                                      field={fieldSchema}
                                      value={value}
                                      onChange={onChange}
                                      renderField={(props) => {
                                        return <Editor {...props} />
                                      }}
                                    />
                                  )
                                }

                                case 'slug': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      field={fieldSchema}
                                      value={value}
                                      onChange={onChange}
                                      plugins={pluginsToRender}
                                      renderField={({ value, onChange }) => {
                                        return (
                                          <SlugInput
                                            value={value}
                                            onChange={(event) => {
                                              onChange(event.target.value)
                                            }}
                                            onGenerateSlug={() => {
                                              // TODO: validate if the field is string or not
                                              const fromValue = values[fieldSchema.from as string] as string
                                              if (fromValue) {
                                                const slug = slugify(fromValue)
                                                onChange(slug)
                                              }
                                            }}
                                          />
                                        )
                                      }}
                                    />
                                  )
                                }

                                case 'date': {
                                  const dateValue = fieldSchema.multiple ? value.map(parseDate) : parseDate(value)

                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      field={fieldSchema}
                                      plugins={pluginsToRender}
                                      value={dateValue}
                                      onChange={(dateSelected: any) => {
                                        onChange(
                                          Array.isArray(dateSelected)
                                            ? dateSelected.map(stringifyDate)
                                            : stringifyDate(dateSelected),
                                        )
                                      }}
                                      renderField={({ value, onChange }) => {
                                        return <DatePicker date={value} onChange={onChange} />
                                      }}
                                    />
                                  )
                                }

                                case 'image': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      plugins={pluginsToRender}
                                      field={fieldSchema}
                                      value={value}
                                      onChange={(uploadedImages: any) => {
                                        onChange(uploadedImages)
                                      }}
                                      renderField={({ value, onChange }) => {
                                        return <ImageUploader uploadedImage={value} onChange={onChange} />
                                      }}
                                    />
                                  )
                                }

                                case 'icon': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      plugins={pluginsToRender}
                                      field={fieldSchema}
                                      value={value}
                                      onChange={(selectedIcon: any) => {
                                        onChange(selectedIcon)
                                      }}
                                      renderField={({ value, onChange }) => {
                                        return <IconSelector icon={value} onChange={onChange} />
                                      }}
                                    />
                                  )
                                }

                                case 'color': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      plugins={pluginsToRender}
                                      field={fieldSchema}
                                      value={value}
                                      onChange={(selectColor: any) => {
                                        onChange(selectColor)
                                      }}
                                      renderField={(props) => {
                                        return <ColorPicker {...props} />
                                      }}
                                    />
                                  )
                                }

                                case 'select': {
                                  return (
                                    <InputField
                                      type={fieldSchema.multiple ? 'multiple' : 'single'}
                                      plugins={pluginsToRender}
                                      field={fieldSchema}
                                      value={value?.value}
                                      onChange={(valueSelected: any) => {
                                        onChange(
                                          fieldSchema.options.find((option) => option.value === valueSelected) as any,
                                        )
                                      }}
                                      renderField={({ value, onChange }) => {
                                        return (
                                          <Select value={value} onValueChange={onChange}>
                                            <SelectTrigger>
                                              <SelectValue placeholder={`Select ${fieldSchema.label}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {fieldSchema.options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                  {option.label}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        )
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
              <Button type="submit" loading={submitting}>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
