'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FileWarning } from 'lucide-react'
import slugify from 'slugify'
import { getValidationSchemaForSchema } from '../../../../core/validation'
import InputField from '../../input-field'
import { parseDate, stringifyDate } from '../../../../utils/date'
import { ContentManagerProps } from '../types'
import { CMSField } from '../../../../types/field'
import ImageUploader from '../../fields/image-uploader'
import SlugInput from '../../fields/slug-input/slug-input'
import IconSelector from '../../fields/icon-selector'
import VideoUploader from '../../fields/video-uploader'
import TiptapEditor from '../../fields/tiptap-editor'
import { useToast } from '../../../hooks/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form'
import { Input } from '../../../ui/input'
import { DatePicker } from '../../../ui/date-picker'
import { ColorPicker } from '../../../ui/color-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select'
import { cn } from '../../../lib/utils'
import { Button } from '../../../ui/button'

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
  /**
   * validationSchema is always computed assuming schema as a singleton because of even for the collection
   * each element of the collection would be having its own content manager
   */
  const validationSchema = useMemo(() => getValidationSchemaForSchema(schema) as z.ZodType, [schema])
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialData,
  })

  const { toast } = useToast()

  const renderForm = useCallback(
    (schema: Record<string, CMSField>, rootFieldKey?: string) => {
      return Object.entries(schema).map(([fieldKey, fieldSchema]) => {
        // do not render hidden fields
        if (fieldSchema.hidden) {
          return null
        }

        const pluginsToRender = plugins.filter((plugin) => {
          return plugin.enabledForFields.includes(fieldSchema.type)
        })

        const fieldName = rootFieldKey ? `${rootFieldKey}.${fieldKey}` : fieldKey

        return (
          <FormField key={fieldName} name={fieldName}>
            <FormItem>
              <FormLabel className="block">
                {fieldSchema.label}{' '}
                {fieldSchema.required ? <span className="text-xs text-muted-foreground">(required)</span> : null}
              </FormLabel>
              <FormControl>
                {(() => {
                  switch (fieldSchema.type) {
                    case 'text': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return (
                              <Input
                                value={value}
                                onChange={(event) => {
                                  onChange(event.target.value)
                                }}
                              />
                            )
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'rich-text': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={(props) => {
                            return <TiptapEditor {...props} />
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'slug': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return (
                              <SlugInput
                                value={value}
                                onChange={(event) => {
                                  onChange(event.target.value)
                                }}
                                onGenerateSlug={() => {
                                  // TODO: validate if the field is string or not
                                  const fromValue = form.getValues(fieldSchema.from)
                                  if (fromValue && typeof fromValue === 'string') {
                                    const slug = slugify(fromValue).toLowerCase()
                                    onChange(slug)
                                  } else {
                                    toast({
                                      title: "Couldn't generate slug",
                                      description:
                                        'The field to generate slug from is not a string. Please check your cms.config',
                                      variant: 'destructive',
                                    })
                                  }
                                }}
                              />
                            )
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'date': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return (
                              <DatePicker
                                date={parseDate(value)}
                                onChange={(dateSelected) => {
                                  onChange(dateSelected ? stringifyDate(dateSelected) : undefined)
                                }}
                              />
                            )
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'image': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return (
                              <ImageUploader
                                uploadedImage={value}
                                onChange={onChange}
                                required={fieldSchema.required ?? false}
                              />
                            )
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'video': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return <VideoUploader uploadedVideo={value} onChange={onChange} field={fieldSchema} />
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'icon': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return <IconSelector icon={value} onChange={onChange} />
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'color': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={(props) => {
                            return <ColorPicker {...props} />
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'select': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ value, onChange }) => {
                            return (
                              <Select
                                value={value?.value}
                                onValueChange={(valueSelected) => {
                                  onChange(fieldSchema.options.find((option) => option.value === valueSelected) as any)
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
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
                        />
                      )
                    }

                    case 'object': {
                      return (
                        <InputField
                          type={fieldSchema.multiple ? 'multiple' : 'single'}
                          fieldName={fieldName}
                          control={form.control}
                          renderInput={({ fieldName }) => {
                            return (
                              <div className="space-y-8 rounded-md border p-4">
                                {renderForm(fieldSchema.schema, fieldName)}
                              </div>
                            )
                          }}
                          cmsField={fieldSchema}
                          plugins={pluginsToRender}
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
          </FormField>
        )
      })
    },
    [form, plugins, toast],
  )

  return (
    <>
      <title>{`${form.formState.isDirty ? '🟡 ' : ''}Content Manager${title ? ` | ${title}` : ''}`}</title>
      <div className={cn('rounded-md border', className)} style={style}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={() => {
              form.reset()
            }}
          >
            <div className="space-y-8 p-4">{renderForm(schema)}</div>
            <div className="flex items-center justify-end space-x-4 border-t bg-muted px-4 py-2">
              {form.formState.isDirty ? (
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
