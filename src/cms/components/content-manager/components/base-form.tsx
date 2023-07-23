'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createElement, useMemo, useState } from 'react'
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
import ImageUploader from '../../image-uploader'
import SlugInput from '../../slug-input/slug-input'
import { CMSField, CMSImageData, CMSIconData, CMSColorData, CMSSelectOption } from '~/cms/types/field'
import { getValidationSchemaForSchema } from '~/cms/core/validation'
import { CMSPlugin } from '~/cms/types/plugin'
import IconSelector from '../../icon-selector'
import { ColorPicker } from '~/components/ui/color-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Loader } from '~/components/ui/loader'

const Editor = dynamic(() => import('../../editor'), {
  ssr: false,
  loading: () => <Loader message="Loading Editor..." />,
})

export type BaseFormProps = {
  schema: Record<string, CMSField>
  initialData: any
  onSubmit: (data: any) => void
  submitting?: boolean
  plugins?: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

export default function BaseForm({
  schema,
  initialData,
  onSubmit,
  submitting,
  plugins = [],
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

  /**
   * resetEditorState is a state that is used to reset the Editor component
   * The Editor component is not a controlled component, so when the form is reset to the previous
   * state it won't be reflected automatically. So this state can be used as a key to the
   * Editor component and would be toggled when the form is updated, this would re-render the component
   * and the previous state would be automatically restored
   */
  const [resetEditorState, setResetEditorState] = useState(false)

  return (
    <div className={cn('rounded-md border', className)} style={style}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={() => {
            form.reset()
            setResetEditorState((prevState) => !prevState)
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
                              form: {
                                ...form,
                                resetEditorState: () => {
                                  setResetEditorState((prevState) => !prevState)
                                },
                              },
                              key: plugin.name,
                            })
                          })}
                        </FormLabel>
                        <FormControl>
                          {(() => {
                            switch (fieldSchema.type) {
                              case 'text': {
                                return <Input {...field} value={value as string} />
                              }

                              case 'rich-text': {
                                return (
                                  <Editor
                                    key={`${resetEditorState}`}
                                    value={value as string}
                                    onChange={(markdownContent) => {
                                      field.onChange(markdownContent as any)
                                    }}
                                  />
                                )
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
                                        field.onChange(slug as any)
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
                                        field.onChange(dateSelected?.toISOString() as any)
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
                                      field.onChange(uploadedImages as any)
                                    }}
                                  />
                                )
                              }

                              case 'icon': {
                                return (
                                  <IconSelector
                                    icon={value as CMSIconData}
                                    onChange={(selectedIcon) => {
                                      field.onChange(selectedIcon as any)
                                    }}
                                  />
                                )
                              }

                              case 'color': {
                                return (
                                  <ColorPicker
                                    value={value as CMSColorData}
                                    onChange={(selectColor) => {
                                      field.onChange(selectColor as any)
                                    }}
                                  />
                                )
                              }

                              case 'select': {
                                return (
                                  <Select
                                    value={(value as CMSSelectOption | undefined)?.value}
                                    onValueChange={(valueSelected) => {
                                      field.onChange(
                                        fieldSchema.options.find((option) => option.value === valueSelected) as any,
                                      )
                                    }}
                                  >
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
  )
}
