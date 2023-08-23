'use client'

import { Plus, Trash } from 'lucide-react'
import { forwardRef } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { CMSField } from '../../../types/field'
import { CMSPlugin } from '../../../types/plugin'
import SortableList from '../sortable-list'
import SingleInputField from '../single-input-field'
import { generateDummyDataForField } from '../../../core/fix-data'
import { Button } from '../../ui/button'
import { cn } from '../../lib/utils'

export type MultiInputFieldProps = {
  fieldName: string
  control: Control
  renderInput: (args: { value: any; onChange: (value: any) => void; fieldName: string }) => React.ReactElement
  cmsField: CMSField
  plugins: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

function MultiInputField(
  { fieldName, control, renderInput, cmsField, plugins, className, style }: MultiInputFieldProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { fields, append, remove, move } = useFieldArray({ name: fieldName, control })
  return (
    <div className={cn('space-y-4', className)} ref={ref}>
      <SortableList
        className="space-y-4"
        style={style}
        items={fields.map((field) => ({ id: field.id, data: field }))}
        onDragEnd={({ active, over }) => {
          const fromIndex = fields?.findIndex((item) => item.id === active.id)
          const toIndex = fields?.findIndex((item) => item.id === over!.id)
          if (typeof fromIndex !== 'undefined' && typeof toIndex !== 'undefined') {
            move(fromIndex, toIndex)
          }
        }}
        renderItem={({ id }, index) => {
          return (
            <SortableList.Item key={id} id={id} className="flex items-start space-x-2">
              <SortableList.DragHandle />
              <SingleInputField
                className="flex-1"
                cmsField={cmsField}
                plugins={plugins}
                fieldName={`${fieldName}.${index}`}
                control={control}
                renderInput={renderInput}
              />
              <div className="h-10 border-r border-dashed" />
              <Button
                type="button"
                icon={<Trash />}
                variant="destructive-outline"
                size="icon"
                className="opacity-30 hover:opacity-100"
                onClick={() => {
                  remove(index)
                }}
              />
            </SortableList.Item>
          )
        }}
      />
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          icon={<Plus />}
          onClick={() => {
            append(generateDummyDataForField(cmsField))
          }}
        >
          Add Entry
        </Button>
      </div>
    </div>
  )
}

export default forwardRef(MultiInputField)
